import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './slices/formSlice';
import { localStorageListenerMiddleware } from './middleware/localStorage';
import { loadMockData } from '../app/form/mockData';

// Helper function to get preloaded state
const getPreloadedState = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedData = localStorage.getItem('formData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData && parsedData.length > 0) {
          return {
            form: {
              items: parsedData,
              editingId: null,
            }
          };
        }
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }
  
  // If no saved data, use mock data
  return {
    form: {
      items: loadMockData(),
      editingId: null,
    }
  };
};

// Store
export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(localStorageListenerMiddleware.middleware),
  preloadedState: getPreloadedState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;