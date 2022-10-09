import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ToDoListStatus from '../components/to-do-list/to-do-list.status';
import { createData, getRandomInt, titleCase, getItemById } from './to-do-slice.utils';

export const initThunk = createAsyncThunk('toDo/init', async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
  const json = await response.json();
  return json.count;
})

export const addThunk = createAsyncThunk('toDo/add', async (_ ,thunkAPI) => {
  const state = thunkAPI.getState().toDo;
  const randomPokemonOffset = getRandomInt(0, state.count - 1);
  const randomPokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${randomPokemonOffset}`);
  const randomPokemonResponseJson = await randomPokemonResponse.json();
  const response = await fetch(randomPokemonResponseJson.results[0].url);
  const json = await response.json();
  const newItem = createData(json.id, titleCase(json.name.replaceAll('-', ' ')), json.sprites.front_default);
  return newItem;
})

export const ToDoSlice = createSlice({
  name: 'toDo',
  initialState: {
    items: [],
    count: null,
    isAdding: false,
    status: ToDoListStatus.Loading
  },
  reducers: {
    add: (state, action) => {
      state.items = [action.payload, ...state.items]
    },
    edit: (state, action) => {
      state.items[state.items.findIndex(el => el.id === action.payload.id)] = action.payload;
    },
    toggleComplete: (state, action) => {
      var item = getItemById(state, action);
      item.isCompleted = !item.isCompleted;
    },
    remove: (state, action) => {
      // Should handle error if there is no item existing
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    changeName: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {...item, name: action.payload.newName}
        }
        return item;
      });
    },
    startEditing: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return {...item, isEditing: true}
        }
        return item;
      });
    },
    endEditing: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return {...item, isEditing: false}
        }
        return item;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initThunk.pending, (state) => {
        state.status = ToDoListStatus.Loading;
      })
      .addCase(initThunk.fulfilled, (state, action) => {
        state.status = ToDoListStatus.Initialized;
        // Add any fetched posts to the array
        state.count = action.payload;
      })
      .addCase(initThunk.rejected, (state) => {
        state.status = ToDoListStatus.HasErrors;
      })
      .addCase(addThunk.pending, (state) => {
        state.isAdding = false;
      })
      .addCase(addThunk.fulfilled, (state, action) => {
        // state.status = ToDoListStatus.Initialized;
        // Add any fetched posts to the array
        state.isAdding = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addThunk.rejected, (state) => {
        state.isAdding = false;
        // state.status = ToDoListStatus.HasErrors;
      })
  }
})

export const { add , edit, toggleComplete, remove, startEditing, endEditing, changeName } = ToDoSlice.actions

export default ToDoSlice.reducer