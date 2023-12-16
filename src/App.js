import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './redux/reducers/todoReducer';
import TodoFormModal from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
        // Fetch initial todos when the component mounts
        dispatch(fetchTodos());
    }, []);
    // }, [dispatch]);


  return (
    <>
      {/* components */}
        <TodoFormModal />
        <TodoList />
    </>
  );
}

export default App;

