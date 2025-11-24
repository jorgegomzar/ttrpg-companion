import { useState } from 'react';
import Button from '../../../components/Button';

const CountSelector = ({ onStart }) => {
  const [count, setCount] = useState(1);
  
  return (
    <>
      <label className="block text-sm font-medium text-neutral-300">Número de Jugadores</label>
      <div className="flex items-center justify-center gap-4 mb-4">
        <button 
          onClick={() => setCount(Math.max(1, count - 1))} 
          className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-red-900 text-white flex items-center justify-center"
        >
          -
        </button>
        <span className="text-3xl font-bold text-white w-12">{count}</span>
        <button 
          onClick={() => setCount(Math.min(10, count + 1))} 
          className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-red-900 text-white flex items-center justify-center"
        >
          +
        </button>
      </div>
      <Button onClick={() => onStart(count)} className="w-full py-4 text-lg">
        Comenzar
      </Button>
    </>
  );
};

export default CountSelector;
