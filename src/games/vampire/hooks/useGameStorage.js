import { useEffect } from 'react';

const STORAGE_KEY = 'vampire-game-state';

export const useGameStorage = (gameState) => {
  // Save game state to localStorage
  useEffect(() => {
    if (gameState.phase !== 'setup') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  // Load game state from localStorage
  const loadGame = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  // Clear saved game
  const clearSave = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return { loadGame, clearSave };
};
