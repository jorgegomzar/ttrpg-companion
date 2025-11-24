import { useState } from 'react';
import Hub from './pages/Hub';
import VampireGame from './games/vampire/VampireGame';

export default function App() {
  const [currentApp, setCurrentApp] = useState('hub');

  const handleNavigate = (app) => {
    setCurrentApp(app);
  };

  if (currentApp === 'hub') {
    return <Hub onNavigate={handleNavigate} />;
  }

  if (currentApp === 'vampire') {
    return <VampireGame onExit={() => setCurrentApp('hub')} />;
  }

  return null;
}
