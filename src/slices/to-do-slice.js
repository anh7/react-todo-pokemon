import { createSlice } from '@reduxjs/toolkit'

export const ToDoSlice = createSlice({
  name: 'toDo',
  initialState: {
    items: [],
  },
  reducers: {
    add: (state, action) => {
      // Should handle error if there is error with connection
      state.items = [...state.items, action.payload]
    },
    edit: (state, action) => {
      state.items[state.items.findIndex(el => el.id === action.payload.id)] = action.payload;
    },
    remove: (state, action) => {
      // Should handle error if there is no item existing
      state.items = state.items.filter(item => item === action.payload)
    },
  },
})

export const { add, edit, remove } = ToDoSlice.actions

export default ToDoSlice.reducer