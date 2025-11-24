import { ArrowLeft } from 'lucide-react';

const ReturnToHub = ({ children, onExit }) => (
  <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-indigo-500 selection:text-white">
    <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={onExit} className="absolute top-4 left-4 flex items-center gap-2 text-neutral-500 hover:text-white"><ArrowLeft size={20}/> Volver al Hub</button>
        </div>
        &nbsp;
      </div>
    </nav>
    {children}
  </div>
);

export default ReturnToHub;
