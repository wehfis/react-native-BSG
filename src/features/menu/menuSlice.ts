import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuUiState {
  selectedItemId: string | null;
}

const initialState: MenuUiState = {
  selectedItemId: null,
};

const menuSlice = createSlice({
  name: 'menuUi',
  initialState,
  reducers: {
    setSelectedItemId(state, action: PayloadAction<string | null>) {
      state.selectedItemId = action.payload;
    },
  },
});

export const { setSelectedItemId } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;