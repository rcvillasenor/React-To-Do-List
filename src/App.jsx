import { useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [...currentTodos, { id: crypto.randomUUID(), completed: false }];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todos) => {
        if (todos.id === id) {
          return { ...todos, completed };
        }

        return todos;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todos) => todos.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">To-do List</h1>
      <ul>
        {todos.length === 0 && "No Todos"}
        {todos.map((todos) => {
          return (
            <li key={todos.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todos.completed}
                  onChange={(e) => toggleTodo(todos.id, e.target.checked)}
                />
                {todos.title}
              </label>
              <button
                onClick={() => deleteTodo(todos.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
