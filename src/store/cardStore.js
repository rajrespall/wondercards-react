import { create } from 'zustand';
import axios from 'axios';

const useCardStore = create((set) => ({
  // Game state
  gameData: null,
  loading: false,
  error: null,

  // Save game data
  saveGameData: async (data) => {
    set({ loading: true });
    try {
      const response = await axios.post('http://localhost:5000/api/card/save', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      set({ 
        gameData: response.data,
        loading: false,
        error: null 
      });
      return response.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Reset state
  resetGameData: () => {
    set({
      gameData: null,
      loading: false,
      error: null
    });
  }
}));

export default useCardStore;