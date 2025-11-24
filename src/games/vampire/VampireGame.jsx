import { useState, useEffect } from 'react';
import { Skull, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CountSelector from './components/CountSelector';
import VampireWizard from './components/VampireWizard';
import Dashboard from './Dashboard';
import VampireEnded from './components/VampireEnded';
import SetupView from './components/SetupView';
import { generateId, calculateDiff } from './components/utils';

const VampireGame = () => {
  const [phase, setPhase] = useState('setup'); // setup, creation, game, ended
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [creationStep, setCreationStep] = useState(0);

  // Game Log State
  const [gameLog, setGameLog] = useState([]); // [{ turn: 1, player: "Name", events: [] }]
  const [turnCount, setTurnCount] = useState(1);
  const [turnSnapshot, setTurnSnapshot] = useState(null); // State of current player at start of turn
  const [turnPhase, setTurnPhase] = useState('rolling'); // 'rolling' | 'playing'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase, creationStep, turnPhase]);

  // Temporary state for creation
  const [tempChar, setTempChar] = useState({
    playerName: '',
    vampireName: '',
    memories: [], 
    skills: [], 
    resources: [], 
    characters: [], 
    mark: '',
  });

  const resetTempChar = () => setTempChar({ 
    playerName: '',
    vampireName: '',
    memories: [],
    skills: [],
    resources: [],
    characters: [],
    mark: '',
  });
  
  const startCreation = (numPlayers) => {
    const initialPlayers = Array(parseInt(numPlayers)).fill(null).map(() => null);
    setPlayers(initialPlayers);
    setPhase('creation');
    setCreationStep(0);
    setGameLog([]);
    resetTempChar();
  };

  const savePlayer = () => {
    const newPlayers = [...players];
    // Init with currentEvent = 1
    const newPlayer = { ...tempChar, id: generateId(), currentEvent: 1 };
    newPlayers[currentPlayerIndex] = newPlayer;
    setPlayers(newPlayers);

    // Initial log for creation
    setGameLog(prev => [...prev, { 
      turn: 0, 
      player: newPlayer.vampireName, 
      events: ["Vampiro creado.", `Marca: ${newPlayer.mark}`, `Comienza en Evento 1`] 
    }]);

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setCreationStep(0);
      resetTempChar();
    } else {
      setPhase('game');
      setCurrentPlayerIndex(0);
      setTurnCount(1);
      setTurnPhase('rolling');
      setTurnSnapshot(JSON.parse(JSON.stringify(newPlayers[0])));
    }
  };

  const endGame = () => {
    const currentPlayer = players[currentPlayerIndex];
    const diff = calculateDiff(turnSnapshot, currentPlayer);

    if (diff.length > 0 && turnPhase === 'playing') {
      setGameLog(prev => [...prev, { 
        turn: turnCount, 
        player: currentPlayer.vampireName, 
        events: diff 
      }]);
    }
    setPhase('ended');
  };

  // --- Views ---
  if (phase === 'setup') {
      return <SetupView onStart={startCreation}/>
  }

  // Creation View
  if (phase === 'creation') {
     return <VampireWizard 
        playerIndex={currentPlayerIndex} 
        totalPlayers={players.length} 
        step={creationStep} 
        setStep={setCreationStep} 
        data={tempChar} 
        setData={setTempChar} 
        onComplete={savePlayer}
     />
  }

  // Game View
  if (phase === 'game') {
     return <Dashboard 
        players={players} 
        setPlayers={setPlayers} 
        currentPlayerIndex={currentPlayerIndex} 
        setCurrentPlayerIndex={setCurrentPlayerIndex}
        turnSnapshot={turnSnapshot} 
        setTurnSnapshot={setTurnSnapshot}
        gameLog={gameLog} 
        setGameLog={setGameLog}
        turnCount={turnCount} 
        setTurnCount={setTurnCount}
        turnPhase={turnPhase} 
        setTurnPhase={setTurnPhase}
        onEndGame={endGame} 
     />
  }

  // Ended View
  if (phase === 'ended') {
    return <VampireEnded players={players} gameLog={gameLog} />
  }

  return null;
};

export default VampireGame;
