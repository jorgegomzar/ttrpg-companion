import { useState } from 'react';

import { Skull, Save, Edit3, Book } from 'lucide-react';

const MemoryCard = ({ memory, onAddExp, onMoveToDiary, onDelete, updateText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newExp, setNewExp] = useState('');
  const handleAdd = () => { if(newExp) { onAddExp(newExp); setNewExp(''); setIsEditing(false); } };

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 shadow-lg relative group transition-all hover:border-red-900/50">
       <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onMoveToDiary} title="Mover al Diario" className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-blue-300"><Book size={16}/></button>
          <button onClick={onDelete} title="Olvidar" className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-red-500"><Skull size={16}/></button>
       </div>
       <div className="space-y-3 mt-2">
         {memory.experiences.map((exp, i) => (
           <div key={i} className="flex gap-2 items-start text-neutral-300">
             <span className="text-red-900 mt-1">•</span>
             <textarea className="bg-transparent w-full resize-none focus:outline-none focus:bg-neutral-950 rounded p-1" value={exp} onChange={(e) => updateText(i, e.target.value)} rows={Math.max(1, Math.ceil(exp.length / 60))} />
           </div>
         ))}
       </div>
       {memory.experiences.length < 3 ? (
         <div className="mt-4 pt-3 border-t border-neutral-800">
           {isEditing ? (
             <div className="flex gap-2">
               <input autoFocus className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-2 text-sm text-neutral-300 focus:outline-none focus:border-red-900" placeholder="[Evento]; [Reacción]" value={newExp} onChange={(e) => setNewExp(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
               <button onClick={handleAdd} className="text-red-400 hover:text-red-300"><Save size={16}/></button>
             </div>
           ) : (
             <button onClick={() => setIsEditing(true)} className="text-xs text-neutral-500 hover:text-red-400 flex items-center gap-1"><Edit3 size={12}/> Añadir vivencia</button>
           )}
         </div>
       ) : <div className="mt-2 text-xs text-red-900/50 text-right uppercase tracking-widest">Recuerdo Lleno</div>}
    </div>
  );
};
export default MemoryCard;
