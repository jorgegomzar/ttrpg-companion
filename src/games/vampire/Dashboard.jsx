import { useState } from 'react';
import {
  Skull, ArrowLeft, Archive, Dices, Save, Edit3,
  User, Heart, Sword, RotateCcw, MoveRight, Download,
  Calculator, Infinity, Play, Scroll, Book, ShieldAlert, Feather,
} from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from './components/Input';
import MemoryCard from './components/MemoryCard.jsx';
import TextArea from './components/TextArea';
import { generateId, calculateDiff } from './components/utils';

const Dashboard = ({ 
  players, 
  setPlayers, 
  currentPlayerIndex, 
  setCurrentPlayerIndex, 
  turnSnapshot, 
  setTurnSnapshot,
  gameLog,
  setGameLog,
  turnPhase, 
  setTurnPhase, 
  turnCount, 
  setTurnCount, 
  onEndGame, 
  onExit 
}) => {
  const currentPlayer = players[currentPlayerIndex];
  
  // Rolling state
  const [manualRoll, setManualRoll] = useState({ d10: '', d6: '' });
  const [activeRoll, setActiveRoll] = useState(null); // { d10, d6, result, targetEvent }

  const updatePlayer = (newData) => {
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex] = newData;
    setPlayers(newPlayers);
  };

  // --- Logic for Rolls ---
  const applyRoll = (d10, d6) => {
    const result = d10 - d6;
    const currentEvent = currentPlayer.currentEvent || 1;
    let nextEvent = currentEvent + result;
    
    // Rule: "o se queda en el 1 en caso de <= 0"
    // Usually means prompts can't be <= 0. 
    // If nextEvent < 1, clamp to 1.
    if (nextEvent < 1) nextEvent = 1;

    setActiveRoll({ d10, d6, result, targetEvent: nextEvent });
  };

  const rollRandom = () => {
    const d10 = Math.floor(Math.random() * 10) + 1;
    const d6 = Math.floor(Math.random() * 6) + 1;
    applyRoll(d10, d6);
  };

  const submitManualRoll = () => {
    const d10 = parseInt(manualRoll.d10);
    const d6 = parseInt(manualRoll.d6);
    if (isNaN(d10) || isNaN(d6)) return alert("Introduce números válidos");
    applyRoll(d10, d6);
  };

  const confirmTurnStart = () => {
    if (!activeRoll) return;
    
    // Log the roll immediately
    const logEntry = {
      turn: turnCount,
      player: currentPlayer.vampireName,
      events: [`Tirada: [d10:${activeRoll.d10}] - [d6:${activeRoll.d6}] = ${activeRoll.result}`, `Evento: ${currentPlayer.currentEvent} -> ${activeRoll.targetEvent}`]
    };
    setGameLog(prev => [...prev, logEntry]);

    // Update Player Event
    updatePlayer({ ...currentPlayer, currentEvent: activeRoll.targetEvent });

    // Switch Phase
    setTurnPhase('playing');
    setActiveRoll(null);
    setManualRoll({ d10: '', d6: '' });
  };

  const finishTurn = () => {
    // 1. Calculate diffs of the 'playing' phase
    const diff = calculateDiff(turnSnapshot, currentPlayer);
    
    if (diff.length > 0) {
      // Append these diffs to the existing log entry for this turn/player if possible, or new entry
      // For simplicity, we add a new log entry segment
      setGameLog(prev => [...prev, { turn: turnCount, player: currentPlayer.vampireName, events: diff, isSubEntry: true }]);
    } else {
      // Log nothing or "sin cambios"
      if (!gameLog[gameLog.length-1].isSubEntry) {
         setGameLog(prev => [...prev, { turn: turnCount, player: currentPlayer.vampireName, events: ["(Sin cambios en la ficha)"], isSubEntry: true }]);
      }
    }

    // 2. Setup Next Player
    let nextIndex = currentPlayerIndex + 1;
    if (nextIndex >= players.length) {
      nextIndex = 0;
      setTurnCount(c => c + 1);
    }
    
    setCurrentPlayerIndex(nextIndex);
    setTurnPhase('rolling');
    // Snapshot will be taken after render, but effectively we take it now of the *next* player
    // Note: 'players' isn't updated with next player yet in this scope, but 'nextIndex' points to it.
    setTurnSnapshot(JSON.parse(JSON.stringify(players[nextIndex])));
  };


  // Trait Handlers (Same as before)
  const toggleSkill = (skillId) => {
    const skills = currentPlayer.skills.map(s => {
        if(s.id === skillId) { if(s.isLost) return s; return { ...s, isChecked: !s.isChecked }; }
        return s;
    });
    updatePlayer({ ...currentPlayer, skills });
  };
  const toggleLoseSkill = (skillId) => {
    const skills = currentPlayer.skills.map(s => s.id === skillId ? { ...s, isLost: !s.isLost } : s);
    updatePlayer({ ...currentPlayer, skills });
  };
  const addNewSkill = () => {
    const name = prompt("Nombre del nuevo talento:");
    if(name) {
        const skills = [...currentPlayer.skills, { id: generateId(), name, isChecked: false, isLost: false }];
        updatePlayer({ ...currentPlayer, skills });
    }
  };
  const toggleLoseResource = (resId) => {
    const resources = currentPlayer.resources.map(r => r.id === resId ? { ...r, isLost: !r.isLost } : r);
    updatePlayer({ ...currentPlayer, resources });
  };
  const addNewResource = () => {
    const name = prompt("Nombre del nuevo recurso:");
    if(name) {
        const resources = [...currentPlayer.resources, { id: generateId(), name, isLost: false }];
        updatePlayer({ ...currentPlayer, resources });
    }
  };
  const toggleKillCharacter = (charId) => {
    const characters = currentPlayer.characters.map(c => c.id === charId ? { ...c, isDead: !c.isDead } : c);
    updatePlayer({ ...currentPlayer, characters });
  };
  const toggleImmortalCharacter = (charId) => {
    const characters = currentPlayer.characters.map(c => c.id === charId ? { ...c, isImmortal: !c.isImmortal } : c);
    updatePlayer({ ...currentPlayer, characters });
  };
  const addNewCharacter = () => {
    const name = prompt("Nombre del personaje:");
    if(name) {
        const desc = prompt("Descripción breve:");
        const characters = [...currentPlayer.characters, { id: generateId(), name, desc, isDead: false, isImmortal: false }];
        updatePlayer({ ...currentPlayer, characters });
    }
  };
  const updateCharacterDesc = (id, newDesc) => {
    const characters = currentPlayer.characters.map(c => c.id === id ? { ...c, desc: newDesc } : c);
    updatePlayer({ ...currentPlayer, characters });
  };
  
  const addExperienceToMemory = (memoryId, text) => {
    if (!text.trim()) return;
    const memories = [...currentPlayer.memories];
    const memIndex = memories.findIndex(m => m.id === memoryId);
    if (memories[memIndex].experiences.length >= 3) return alert("Este recuerdo está lleno.");
    memories[memIndex].experiences.push(text);
    updatePlayer({ ...currentPlayer, memories });
  };
  const createNewMemory = () => {
    if (currentPlayer.memories.filter(m => !m.isDiary).length >= 5) {
      alert("Tienes demasiados recuerdos activos.");
      return;
    }
    const memories = [...currentPlayer.memories, { id: generateId(), experiences: ['Nueva vivencia...'], isDiary: false }];
    updatePlayer({ ...currentPlayer, memories });
  };
  const moveToDiary = (memoryId) => {
    if (currentPlayer.memories.filter(m => m.isDiary).length >= 4) {
      alert("El diario está lleno.");
      return;
    }
    const memories = currentPlayer.memories.map(m => m.id === memoryId ? { ...m, isDiary: true } : m);
    updatePlayer({ ...currentPlayer, memories });
  };
  const deleteMemory = (memoryId) => {
    if(!confirm("¿Estás seguro de olvidar esto para siempre?")) return;
    const memories = currentPlayer.memories.filter(m => m.id !== memoryId);
    updatePlayer({ ...currentPlayer, memories });
  };

  const activeMemories = currentPlayer.memories.filter(m => !m.isDiary);
  const diaryMemories = currentPlayer.memories.filter(m => m.isDiary);

  // --- RENDER ---

  // Roll Phase UI Overlay
  if (turnPhase === 'rolling') {
    return (
      <div className="min-h-screen bg-black text-neutral-300 font-serif flex items-center justify-center p-6 relative">
        {/* Background blurred dashboard preview */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden blur-sm">
             <div className="max-w-7xl mx-auto p-8"><h1 className="text-4xl text-white">Tablero de Juego</h1></div>
        </div>

        <Card className="max-w-lg w-full z-10 border-red-900/50 shadow-2xl shadow-red-900/20">
            <div className="text-center mb-6">
                <span className="text-red-500 uppercase tracking-widest text-xs font-bold">Turno {turnCount}</span>
                <h2 className="text-3xl text-white font-bold mt-2">{currentPlayer.vampireName}</h2>
                <p className="text-neutral-500">Jugador: {currentPlayer.playerName}</p>
                <div className="mt-4 inline-block bg-neutral-900 px-4 py-2 rounded border border-neutral-700">
                    Evento Actual: <span className="text-white font-bold text-xl">{currentPlayer.currentEvent}</span>
                </div>
            </div>

            {!activeRoll ? (
                <div className="space-y-6">
                    <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                        <h4 className="text-neutral-400 text-sm font-bold mb-3 flex items-center gap-2"><Dices size={16}/> Opción 1: Tirada Automática</h4>
                        <Button onClick={rollRandom} className="w-full">Tirar Dados</Button>
                    </div>
                    
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-neutral-800"></div>
                        <span className="flex-shrink-0 mx-4 text-neutral-600 text-xs">O INTRODUCIR MANUALMENTE</span>
                        <div className="flex-grow border-t border-neutral-800"></div>
                    </div>

                    <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                        <h4 className="text-neutral-400 text-sm font-bold mb-3 flex items-center gap-2"><Calculator size={16}/> Opción 2: Manual</h4>
                        <div className="flex gap-4 items-end">
                            <Input type="number" label="d10" value={manualRoll.d10} onChange={e => setManualRoll({...manualRoll, d10: e.target.value})} placeholder="1-10" />
                            <span className="mb-3 text-xl">-</span>
                            <Input type="number" label="d6" value={manualRoll.d6} onChange={e => setManualRoll({...manualRoll, d6: e.target.value})} placeholder="1-6" />
                            <Button variant="secondary" onClick={submitManualRoll}>Calcular</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 animate-in zoom-in duration-300">
                    <div className="bg-black p-6 rounded border border-red-900/30 text-center">
                         <div className="flex justify-center items-center gap-4 text-2xl font-bold mb-2">
                             <span className="text-neutral-400">d10: {activeRoll.d10}</span>
                             <span className="text-red-500">-</span>
                             <span className="text-neutral-400">d6: {activeRoll.d6}</span>
                             <span className="text-red-500">=</span>
                             <span className="text-white text-4xl">{activeRoll.result}</span>
                         </div>
                         <p className="text-neutral-500 text-sm">Salto de Eventos</p>
                    </div>
                    
                    <div className="text-center space-y-2">
                         <p className="text-neutral-400">Te mueves del evento <span className="text-neutral-200">{currentPlayer.currentEvent}</span> al...</p>
                         <div className="text-5xl font-bold text-red-500">{activeRoll.targetEvent}</div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setActiveRoll(null)} className="flex-1">Rehacer</Button>
                        <Button variant="primary" onClick={confirmTurnStart} className="flex-[2]">Interpretar Evento <Play size={16}/></Button>
                    </div>
                </div>
            )}
        </Card>
      </div>
    );
  }

  // Playing Phase Dashboard
  return (
    <div className="min-h-screen bg-black text-neutral-300 font-serif pb-20">
      <header className="bg-neutral-900 border-b border-red-900/50 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center border border-red-900">
                <Skull className="text-red-600" />
             </div>
             <div>
               <h1 className="text-2xl font-bold text-white leading-none">{currentPlayer.vampireName}</h1>
               <span className="text-xs uppercase tracking-widest text-neutral-500">Jugador: {currentPlayer.playerName} | Turno Global: {turnCount}</span>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-black border border-red-900/50 px-4 py-2 rounded">
                <span className="text-red-500 text-xs font-bold uppercase block text-center">Evento Actual</span>
                <span className="text-white text-2xl font-bold block text-center">{currentPlayer.currentEvent}</span>
             </div>
             
             <div className="h-8 w-px bg-neutral-800 mx-2"></div>

             <Button variant="primary" onClick={finishTurn} className="ml-2">Terminar Turno <MoveRight className="w-4 h-4"/></Button>
             <Button variant="danger" onClick={() => { if(confirm("¿Terminar partida y generar reportes?")) onEndGame(); }} className="ml-2" title="Terminar Partida"><Archive size={16}/></Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
           <div>
             <div className="flex justify-between items-end mb-4 border-b border-neutral-800 pb-2">
               <h2 className="text-2xl text-red-500 font-bold flex items-center gap-2"><Scroll/> Recuerdos ({activeMemories.length}/5)</h2>
               <Button variant="outline" className="text-xs py-1 h-8" onClick={createNewMemory}>+ Nuevo Recuerdo</Button>
             </div>
             <div className="space-y-4">
               {activeMemories.map(mem => (
                 <MemoryCard key={mem.id} memory={mem} onAddExp={(txt) => addExperienceToMemory(mem.id, txt)} onMoveToDiary={() => moveToDiary(mem.id)} onDelete={() => deleteMemory(mem.id)} updateText={(i, txt) => {
                      const newExps = [...mem.experiences]; newExps[i] = txt;
                      const newMems = currentPlayer.memories.map(m => m.id === mem.id ? {...m, experiences: newExps} : m);
                      updatePlayer({...currentPlayer, memories: newMems});
                   }} />
               ))}
               {activeMemories.length === 0 && <p className="text-neutral-600 italic text-center py-8">Tu mente está vacía...</p>}
             </div>
           </div>
           <div className="opacity-80 hover:opacity-100 transition-opacity">
             <div className="flex justify-between items-end mb-4 border-b border-neutral-800 pb-2">
               <h2 className="text-xl text-neutral-400 font-bold flex items-center gap-2"><Book/> El Diario ({diaryMemories.length}/4)</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {diaryMemories.map(mem => (
                 <div key={mem.id} className="bg-neutral-900 p-4 border border-neutral-800 rounded relative group">
                    <button onClick={() => deleteMemory(mem.id)} className="absolute top-2 right-2 text-neutral-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Skull size={14}/></button>
                    <ul className="list-disc pl-4 text-sm text-neutral-500 space-y-1">
                      {mem.experiences.map((exp, i) => <li key={i}>{exp}</li>)}
                    </ul>
                 </div>
               ))}
               {diaryMemories.length === 0 && <p className="text-neutral-700 italic text-sm col-span-2">No has escrito nada aún.</p>}
             </div>
           </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <Card title="Marca" icon={ShieldAlert} className="border-red-900/30">
            <textarea className="w-full bg-transparent resize-none text-red-200 focus:outline-none text-center italic" value={currentPlayer.mark} onChange={(e) => updatePlayer({...currentPlayer, mark: e.target.value})} />
          </Card>
          <Card title="Talentos" icon={Feather}>
            <div className="space-y-2">
              {currentPlayer.skills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                     <input type="checkbox" checked={skill.isChecked} onChange={() => toggleSkill(skill.id)} disabled={skill.isLost} className="accent-red-900 w-4 h-4 cursor-pointer" />
                     <span className={`transition-all ${skill.isLost ? 'line-through text-neutral-600' : 'text-neutral-300'} ${skill.isChecked ? 'font-bold text-red-300' : ''}`}>{skill.name}</span>
                  </div>
                  <button onClick={() => toggleLoseSkill(skill.id)} className="text-neutral-700 hover:text-red-500 text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">{skill.isLost ? 'Restaurar' : 'Perder'}</button>
                </div>
              ))}
              <button onClick={addNewSkill} className="text-xs text-neutral-500 hover:text-red-400 mt-2 block w-full text-left">+ Añadir Talento</button>
            </div>
          </Card>
          <Card title="Recursos" icon={Save}>
            <div className="space-y-2">
              {currentPlayer.resources.map(res => (
                <div key={res.id} className="flex items-center justify-between group">
                   <span className={`${res.isLost ? 'line-through text-neutral-600' : 'text-neutral-300'}`}>{res.name}</span>
                   <button onClick={() => toggleLoseResource(res.id)} className="text-neutral-700 hover:text-red-500 text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">{res.isLost ? 'Recuperar' : 'Perder'}</button>
                </div>
              ))}
              <button onClick={addNewResource} className="text-xs text-neutral-500 hover:text-red-400 mt-2 block w-full text-left">+ Añadir Recurso</button>
            </div>
          </Card>
          <Card title="Personajes" icon={User}>
            <div className="space-y-4">
              {currentPlayer.characters.map(char => (
                <div key={char.id} className={`p-2 rounded border border-neutral-800 ${char.isDead ? 'bg-neutral-950 opacity-50' : 'bg-neutral-900/50'}`}>
                   <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        {char.isImmortal ? <Infinity size={14} className="text-purple-400" title="Inmortal"/> : <User size={14} className="text-neutral-500" title="Mortal"/>}
                        <span className={`font-bold ${char.isDead ? 'line-through text-neutral-600' : 'text-neutral-200'}`}>{char.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <button onClick={() => toggleImmortalCharacter(char.id)} className={`text-xs hover:text-white ${char.isImmortal ? 'text-purple-500' : 'text-neutral-600'}`} title="Alternar Mortal/Inmortal">
                              <Infinity size={14}/>
                          </button>
                          <button onClick={() => toggleKillCharacter(char.id)} className="text-xs text-neutral-600 hover:text-red-500" title="Matar/Revivir">
                            {char.isDead ? <RotateCcw size={14}/> : <Skull size={14}/>}
                          </button>
                      </div>
                   </div>
                   <input className={`w-full bg-transparent text-sm focus:outline-none border-b border-transparent focus:border-neutral-700 ${char.isDead ? 'line-through text-neutral-700' : 'text-neutral-400'}`} value={char.desc} onChange={(e) => updateCharacterDesc(char.id, e.target.value)} />
                </div>
              ))}
              <button onClick={addNewCharacter} className="text-xs text-neutral-500 hover:text-red-400 mt-2 block w-full text-left">+ Añadir Personaje</button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
