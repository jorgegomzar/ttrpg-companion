import { Gamepad2 } from 'lucide-react';
import  AppLogo from './AppLogo';

const Layout = ({ children, title = "TTRPG Arcade" }) => (
  <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-indigo-500 selection:text-white">
    <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AppLogo/>
          <span className="text-xl font-bold tracking-tight text-white">{title}</span>
        </div>
        <div className="text-sm text-neutral-500">v1.0.0</div>
      </div>
    </nav>
    {children}
  </div>
);

export default Layout;
