import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, css } from '@mui/system'
import { Dialog, DialogContent, DialogTitle, TextField, Button, IconButton } from '@mui/material';
import { DeleteOutline, Edit, CheckCircleOutline } from '@mui/icons-material';
import { deleteTodoThunk, updateTodoTitleThunk, toggleTodoCompleted } from '../redux/reducers/todoReducer';
import { todoSelector } from "../redux/reducers/todoReducer";
import Loader from "./loader";

// Styled components for styling
const DialogContainer = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `
);

const TitleInput = styled(TextField)(
  ({ theme }) => css`
    width: 100%;
  `
);

const TodoList = () => {
  const dispatch = useDispatch();
  // Selecting todos and loading state from Redux store
  const { todos, loading } = useSelector(todoSelector);
  const [editTodo, setEditTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // Toggle completion status of a todo
  const handleToggleTodo = (id) => {
    dispatch(toggleTodoCompleted(id));
  };

  // Start editing a todo
  const handleEditTodo = (todo) => {
    setEditTodo(todo.id);
  };

  // Save edited todo title
  const handleSaveEdit = (id, newTitle) => {
    dispatch(updateTodoTitleThunk({ id, title: newTitle }));
    setEditTodo(null);
  };

  // Cancel editing a todo
  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  // Delete a todo
  const handleDeleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodoThunk(id));
    }
  };

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <div>
            <ul>
              {/* Map through todos and render each todo */}
              {todos.map((todo) => (
                <li key={todo.id}>
                  {/* Display todo information and action buttons */}
                  <DialogContainer>
                    {/* Display todo title with custom font */}
                    <span style={{ marginRight: '8px', fontFamily: 'Pacifico, cursive' }}>{todo.title}</span>
                    <div>
                      {/* Toggle completion status button */}
                      <IconButton style={{ marginRight: '8px' }} onClick={() => handleToggleTodo(todo.id)}>
                        <CheckCircleOutline color={todo.completed ? 'primary' : 'action'} />
                      </IconButton>
                      {/* Edit todo button */}
                      <IconButton onClick={() => handleEditTodo(todo)}>
                        <Edit />
                      </IconButton>
                      {/* Delete todo button */}
                      <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                        <DeleteOutline />
                      </IconButton>
                    </div>
                  </DialogContainer>

                  {/* Edit Todo Dialog */}
                  <Dialog open={editTodo === todo.id} onClose={handleCancelEdit}>
                    <DialogTitle>Edit Todo</DialogTitle>
                    <DialogContent>
                      {/* Input field for editing todo title */}
                      <TextField
                        label="Todo Title"
                        defaultValue={todo.title}
                        variant="outlined"
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                      <div>
                        {/* Save edited todo title button */}
                        <Button onClick={() => handleSaveEdit(todo.id, newTitle)} variant="contained" color="primary">
                          Save
                        </Button>
                        {/* Cancel editing button */}
                        <Button onClick={handleCancelEdit} variant="outlined" color="secondary">
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default TodoList;

