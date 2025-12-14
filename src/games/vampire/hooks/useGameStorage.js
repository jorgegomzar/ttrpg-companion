import { useEffect } from 'react';

const STORAGE_KEY = 'vampire-game-state';

export const useGameStorage = (gameState) => {
  // Save game state to localStorage
  useEffect(() => {
    if (gameState.phase !== 'setup') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  // Validate game state has minimum required fields
  const validateGameState = (gameState) => {
    if (!gameState || !gameState.players) return false;
    return gameState.players.every(player =>
      player.playerName?.trim() &&
      player.vampireName?.trim() &&
      player.characters?.length >= 4 &&
      player.characters.slice(0, 3).every(char => char?.name?.trim() && char?.desc?.trim()) &&
      player.characters[3]?.name?.trim() && player.characters[3]?.desc?.trim() &&
      player.skills?.length >= 3 &&
      player.skills.slice(0, 3).every(skill => skill?.name?.trim()) &&
      player.resources?.length >= 3 &&
      player.resources.slice(0, 3).every(resource => resource?.name?.trim()) &&
      player.memories?.length >= 5 &&
      player.memories.every(memory => memory?.experiences?.[0]?.trim()) &&
      player.mark?.trim()
    );
  };

  // Load game state from localStorage
  const loadGame = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      const gameState = JSON.parse(saved);
      return validateGameState(gameState) ? gameState : null;
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
