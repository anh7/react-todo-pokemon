import { createSlice } from '@reduxjs/toolkit'

function createData(id, name, image) {
  return { id, name, image};
}

export const ToDoSlice = createSlice({
  name: 'toDo',
  initialState: {
    items: [
      createData(13, 'Weedle', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png'),
      createData(14, 'Pokemon 14', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png'),
      createData(15, 'Pokemon 15', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png'),
      createData(16, 'Pokemon 16', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png'),
      createData(17, 'Pokemon 17', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png'),
      createData(18, 'Pokemon 18', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png'),
    ],
  },
  reducers: {
    add: (state) => {
      // Should handle error if there is error with connection
      const newItem = createData(18, 'Pokemon 19', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png')
      state.items = [newItem, ...state.items]
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