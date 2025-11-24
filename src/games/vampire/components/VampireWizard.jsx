import { ArrowLeft, MoveRight, Scroll, Feather, Save, User, Skull } from 'lucide-react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Input from './Input';
import TextArea from './TextArea';
import { generateId } from './utils';

const VampireWizard = ({ 
  playerIndex, 
  totalPlayers, 
  step, 
  setStep, 
  data, 
  setData, 
  onComplete, 
  onExit 
}) => {
  const updateData = (field, value) => setData({ ...data, [field]: value });
  const steps = [
    { title: "Identidad", desc: "Define quién eres y quién serás." },
    { title: "Vida Mortal", desc: "Tus habilidades y posesiones antes del cambio." },
    { title: "Lazos Mortales", desc: "Aquellos que importan en tu vida." },
    { title: "Profundidad", desc: "Recuerdos que definen tu historia." },
    { title: "La Transformación", desc: "El momento en que todo cambió." }
  ];

  const renderStep = () => {
    switch(step) {
      case 0: return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
          <Input label="Nombre del Jugador" value={data.playerName} onChange={e => updateData('playerName', e.target.value)} placeholder="Tu nombre real" />
          <Input label="Nombre del Vampiro" value={data.vampireName} onChange={e => updateData('vampireName', e.target.value)} placeholder="Nombre de tu personaje" />
        </div>
      );
      case 1: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div>
            <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><Scroll size={16}/> Primer Recuerdo Mortal</h4>
            <TextArea value={data.memories[0]?.experiences[0] || ''} onChange={e => {
                const newMems = [...data.memories];
                if(!newMems[0]) newMems[0] = { id: generateId(), experiences: [], isDiary: false };
                newMems[0].experiences[0] = e.target.value;
                updateData('memories', newMems);
              }} placeholder="Ej: Ayudé a mi padre en la forja..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-neutral-300 font-bold mb-2 flex items-center gap-2"><Feather size={16}/> 3 Talentos</h4>
              {Array(3).fill(null).map((_, i) => (
                <Input key={i} className="mb-2" placeholder={`Talento ${i+1}`} value={data.skills[i]?.name || ''} onChange={e => {
                    const newSkills = [...data.skills];
                    newSkills[i] = { id: newSkills[i]?.id || generateId(), name: e.target.value, isChecked: false, isLost: false };
                    updateData('skills', newSkills);
                  }} />
              ))}
            </div>
            <div>
              <h4 className="text-neutral-300 font-bold mb-2 flex items-center gap-2"><Save size={16}/> 3 Recursos</h4>
              {Array(3).fill(null).map((_, i) => (
                <Input key={i} className="mb-2" placeholder={`Recurso ${i+1}`} value={data.resources[i]?.name || ''} onChange={e => {
                    const newRes = [...data.resources];
                    newRes[i] = { id: newRes[i]?.id || generateId(), name: e.target.value, isLost: false };
                    updateData('resources', newRes);
                  }} />
              ))}
            </div>
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
           <h4 className="text-neutral-300 font-bold mb-2 flex items-center gap-2"><User size={16}/> 3 Personajes Mortales</h4>
           {Array(3).fill(null).map((_, i) => (
             <div key={i} className="bg-neutral-950 p-3 rounded border border-neutral-800">
                <Input className="mb-2" placeholder="Nombre" value={data.characters[i]?.name || ''} onChange={e => {
                    const newChars = [...data.characters];
                    if (!newChars[i]) newChars[i] = { id: generateId(), name: '', desc: '', isDead: false, isImmortal: false };
                    newChars[i].name = e.target.value;
                    // Ensure defaults
                    newChars[i].isImmortal = false;
                    newChars[i].isDead = false;
                    updateData('characters', newChars);
                  }} />
                <Input placeholder="Descripción" value={data.characters[i]?.desc || ''} onChange={e => {
                    const newChars = [...data.characters];
                    if (!newChars[i]) newChars[i] = { id: generateId(), name: '', desc: '', isDead: false, isImmortal: false };
                    newChars[i].desc = e.target.value;
                    updateData('characters', newChars);
                  }} />
             </div>
           ))}
        </div>
      );
      case 3: return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
          <p className="text-sm text-neutral-500">Añade 3 recuerdos más combinando rasgos.</p>
          {Array(3).fill(null).map((_, i) => (
            <div key={i}>
              <h4 className="text-red-400 font-bold mb-1">Recuerdo {i+2}</h4>
              <TextArea value={data.memories[i+1]?.experiences[0] || ''} onChange={e => {
                  const newMems = [...data.memories];
                  if(!newMems[i+1]) newMems[i+1] = { id: generateId(), experiences: [], isDiary: false };
                  newMems[i+1].experiences[0] = e.target.value;
                  updateData('memories', newMems);
                }} placeholder="Ej: Usé mi [Talento] para salvar a [Personaje]." />
            </div>
          ))}
        </div>
      );
      case 4: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="bg-neutral-950 p-3 rounded border border-red-900/30">
             <h4 className="text-red-500 font-bold mb-2">Tu Creador (Inmortal)</h4>
             <Input className="mb-2" placeholder="Nombre" value={data.characters[3]?.name || ''} onChange={e => {
                  const newChars = [...data.characters];
                  if (!newChars[3]) newChars[3] = { id: generateId(), name: '', desc: '', isDead: false, isImmortal: true };
                  newChars[3].name = e.target.value;
                  // Ensure default for sire
                  newChars[3].isImmortal = true;
                  updateData('characters', newChars);
                }} />
              <Input placeholder="Descripción" value={data.characters[3]?.desc || ''} onChange={e => {
                  const newChars = [...data.characters];
                  if (!newChars[3]) newChars[3] = { id: generateId(), name: '', desc: '', isDead: false, isImmortal: true };
                  newChars[3].desc = e.target.value;
                  updateData('characters', newChars);
                }} />
           </div>
           <div>
              <h4 className="text-red-500 font-bold mb-2">Tu Marca</h4>
              <Input placeholder="Ej: Ojos totalmente negros..." value={data.mark} onChange={e => updateData('mark', e.target.value)} />
           </div>
           <div>
              <h4 className="text-red-500 font-bold mb-2">La Conversión (Recuerdo)</h4>
              <TextArea value={data.memories[4]?.experiences[0] || ''} onChange={e => {
                  const newMems = [...data.memories];
                  if(!newMems[4]) newMems[4] = { id: generateId(), experiences: [], isDiary: false };
                  newMems[4].experiences[0] = e.target.value;
                  updateData('memories', newMems);
                }} placeholder="¿Cómo te convertiste?" />
            </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-serif p-6">
      <button onClick={onExit} className="absolute top-4 left-4 flex items-center gap-2 text-neutral-500 hover:text-white"><ArrowLeft size={20}/> Volver al Hub</button>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Creando Jugador {playerIndex + 1}/{totalPlayers}</span>
            <h2 className="text-2xl text-white">{steps[step].title}</h2>
          </div>
          <div className="text-neutral-500 text-sm">{step + 1} / 5</div>
        </div>
        <Card className="mb-8 min-h-[400px]">
          <p className="mb-6 text-neutral-500 italic border-l-2 border-red-900 pl-4">{steps[step].desc}</p>
          {renderStep()}
        </Card>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={() => setStep(step - 1)} disabled={step === 0}>Atrás</Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>Siguiente <MoveRight className="w-4 h-4" /></Button>
          ) : (
            <Button variant="primary" onClick={onComplete}>Finalizar Ficha <Skull className="w-4 h-4" /></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VampireWizard;
