import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: ''
};

const sandwitchSlice = createSlice({
  name: 'sandwitch',
  initialState,
  reducers: {}
});

export default sandwitchSlice.reducer;
export const {} = sandwitchSlice.actions;
