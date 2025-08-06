import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

// Import action creators from formSlice
import { 
  addItem, 
  updateItem, 
  deleteItem, 
  deleteSelected, 
  loadMockDataAction as loadMockData,
  clearAllData 
} from '../slices/formSlice';

// Import FormData type (หรือสร้างไฟล์ types แยก)
import { FormData } from '../../app/form/mockData';

// Define your root state interface
interface RootState {
  form: {
    items: FormData[];
    editingId: string | null;
  };
}

// Create listener middleware
export const localStorageListenerMiddleware = createListenerMiddleware<RootState>();

// Add listener for localStorage saving
localStorageListenerMiddleware.startListening({
  matcher: isAnyOf(
    addItem,
    updateItem,
    deleteItem,
    deleteSelected,
    loadMockData,
    clearAllData
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('formData', JSON.stringify(state.form.items));
        console.log(`Action ${action.type}: Saved ${state.form.items.length} items to localStorage`);
      } catch (error) {
        console.error('Error auto-saving to localStorage:', error);
      }
    }
  }
});