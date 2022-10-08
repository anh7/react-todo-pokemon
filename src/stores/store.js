import { configureStore } from '@reduxjs/toolkit'
import toDoReducer from '../slices/to-do-slice'

export default configureStore({
  reducer: {
    toDo: toDoReducer,
  },
})