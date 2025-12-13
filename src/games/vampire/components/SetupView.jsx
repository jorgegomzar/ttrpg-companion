import { useState } from 'react';
import { Skull, ArrowLeft } from 'lucide-react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

const SetupView = ({ onStart, onContinue, hasSavedGame }) => {
  const [count, setCount] = useState(1);
  return (
    <div className="min-h-screen bg-black text-neutral-400 flex flex-col items-center justify-center p-6 font-serif bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-black">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <Skull className="w-16 h-16 mx-auto text-red-900 animate-pulse" />
          <h1 className="text-4xl text-red-500 font-bold tracking-tighter">Un Vampiro de Mil Años</h1>
          <p className="text-neutral-500 italic">Edición Multijugador</p>
        </div>
        <Card className="space-y-6">
          {hasSavedGame && (
            <Button onClick={onContinue} className="w-full py-4 text-lg bg-red-800 hover:bg-red-700">
              Continuar Partida
            </Button>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">Número de Jugadores</label>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setCount(Math.max(1, count - 1))} className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-red-900 text-white flex items-center justify-center transition-colors">-</button>
              <span className="text-3xl font-bold text-white w-12">{count}</span>
              <button onClick={() => setCount(Math.min(10, count + 1))} className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-red-900 text-white flex items-center justify-center transition-colors">+</button>
            </div>
          </div>
          <Button onClick={() => onStart(count)} className="w-full py-4 text-lg">Comenzar la Crónica</Button>
        </Card>
      </div>
    </div>
  );
};

export default SetupView;
