import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Hub from './pages/Hub';
import ReturnToHub from './components/ReturnToHub';
import VampireGame from './games/vampire/VampireGame';

export default function App() {
  const [currentApp, setCurrentApp] = useState('hub');

  const handleNavigate = (app) => {
    setCurrentApp(app);
  };

  if (currentApp === 'hub') {
    return <Hub onNavigate={handleNavigate} />;
  }

  const onExit = () => setCurrentApp('hub')

  if (currentApp === 'vampire') {
    return (
      <ReturnToHub onExit={onExit} >
        <VampireGame/>
      </ReturnToHub>
    )
  }

  return null;
}
