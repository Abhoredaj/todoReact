# TodoList React App

A simple TodoList app built with React and Redux.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [Dependencies](#dependencies)
- [Code Structure](#code-structure)
- [Redux State Management](#redux-state-management)
- [Styling](#styling)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Fetch and show todo items from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/todos).
- Add a new todo item (dummy request to API).
- Update a todo item (dummy request to API).
- Delete a todo item (dummy request to API).
- Toggle the completed status of a todo.

## Project Structure
```bash

|-- src
| |-- components
| | |-- TodoFormModal.js
| | |-- TodoList.js
| | |-- Loader.js
| |-- redux
| | |-- reducers
| | | |-- todoReducer.js
| | |-- middlewares
| |   |-- loggerMiddleware.js
| |-- App.js
| |-- index.js
| |-- store.js
|-- public
| |-- index.html
|-- README.md
|-- .gitignore
|-- package.json
|-- etc.


```

## How to Run

1. Clone the repository: `git clone https://github.com/Abhoredaj/todoReact.git`
2. Navigate to the project directory: `cd todoReact`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Dependencies

- React
- Redux
- @mui/material
- etc.

## Code Structure

### Redux State Management

The application uses Redux for state management. The main reducer is `todoReducer`, and actions related to fetching, adding, updating, and deleting todos are defined in this reducer.

### Styling

The app uses MUI (Material-UI) for styling. Styles are applied using the `styled` utility from the `@mui/system` package.

## Usage

- Navigate to [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos) to see the initial list of todos.
- Add new todos using the "Add Todo" button.
- Update and delete todos as needed.

## Contributing

Feel free to contribute to the project. Follow the standard GitHub flow:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Create a pull request.
