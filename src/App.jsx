import { useState } from "react";
import "./styles.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
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
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          ></input>
        </div>
        <button className="btn">Add</button>
      </form>
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
