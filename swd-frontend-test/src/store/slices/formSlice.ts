import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Import mock data
import { FormData, loadMockData } from '../../app/form/mockData';

interface FormState {
  items: FormData[];
  editingId: string | null;
}

// Initial state - ไม่ต้อง load localStorage ที่นี่ เพราะจะใช้ preloadedState ใน store
const initialState: FormState = {
  items: [],
  editingId: null,
};

// Redux Slice
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    loadFromStorage: (state, action: PayloadAction<FormData[]>) => {
      state.items = action.payload;
    },
    loadMockData: (state) => {
      state.items = loadMockData();
    },
    addItem: (state, action: PayloadAction<FormData>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<FormData>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.editingId = null;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    deleteSelected: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(item => !action.payload.includes(item.id));
    },
    setEditingId: (state, action: PayloadAction<string | null>) => {
      state.editingId = action.payload;
    },
    clearAllData: (state) => {
      state.items = [];
      state.editingId = null;
    },
  },
});

export const { 
  addItem, 
  updateItem, 
  deleteItem, 
  deleteSelected, 
  setEditingId, 
  loadFromStorage, 
  loadMockData: loadMockDataAction,
  clearAllData 
} = formSlice.actions;