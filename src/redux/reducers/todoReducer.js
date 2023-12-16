
// for creating slice and AsycnThunk
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the initial state for todos
const initialState = {
  todos: [],
  loading: false,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    thunkAPI.dispatch(setTodo(data));
    return data;
  } catch (error) {
    throw error;
  }
});

// Create an async thunk to add a todo to the API
export const addTodoThunk = createAsyncThunk(
  'todos/addTodo',
  async (newTodo, thunkAPI) => {
    try {
      // Generate a random userId between 1 and 10
      newTodo.userId = Math.floor(Math.random() * 10) + 1;

      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      const addedTodo = await response.json();

      // Dispatch the addTodo action to update the state
      thunkAPI.dispatch(addTodo(addedTodo));

      // Notification
      toast.success("Added the todo!!");

      return addedTodo;
    } catch (error) {
      toast.error(`Error in adding todo: ${error.message}`);
      throw error;
    }
  }
);

export const updateTodoTitleThunk = createAsyncThunk(
  'todos/updateTodoTitle',
  async ({ id, title }, thunkAPI) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      const updatedTodo = await response.json();

      // Dispatch the updateTodoTitle action to update the state
      thunkAPI.dispatch(updateTodoTitle({ id, title }));

      // Notification
      toast.success("Updated the todo title!!");

      return updatedTodo;
    } catch (error) {
      toast.error(`Error in updating todo title: ${error.message}`);
      throw error;
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id, thunkAPI) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      // Dispatch the deleteTodo action to update the state
      thunkAPI.dispatch(deleteTodo(id));

      // Notification
      toast.success("Deleted the todo!!");
    } catch (error) {
      toast.error(`Error in deleting todo: ${error.message}`);
      throw error;
    }
  }
);


const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todos = [...action.payload];
  },
  addTodo: (state, action) => {
    state.todos = [action.payload, ...state.todos];
  },
  updateTodoTitle: (state, action) => {
    const { id, title } = action.payload;
    // Find the todo with the specified id and update its title
    state.todos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );
  },
  deleteTodo: (state, action) => {
    const deletedTodoId = action.payload;
    // Filter out the todo with the specified id
    state.todos = state.todos.filter((todo) => todo.id !== deletedTodoId);
  },
  toggleTodoCompleted: (state, action) => {
    const toggledTodoId = action.payload;
    // Toggle the 'completed' key of the todo with the specified id
    state.todos = state.todos.map((todo) =>
      todo.id === toggledTodoId ? { ...todo, completed: !todo.completed } : todo
    );
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});

const todoReducer = todoSlice.reducer;

export  default todoReducer;

export const { setTodo, 
    addTodo, 
    updateTodoTitle, 
    deleteTodo, 
    toggleTodoCompleted } = todoSlice.actions;

// selector
export const todoSelector = (state)=>state.todoReducer;