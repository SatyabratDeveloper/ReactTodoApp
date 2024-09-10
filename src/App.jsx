import { useEffect, useState } from "react";
import { TodoForm } from "./components";
import { TodoProvider } from "./contexts/TodoContext";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevItem) =>
        prevItem.id === id ? { ...prevItem, todo } : prevItem
      )
    );
  };

  const changePriority = (id, priority) => {
    setTodos((prev) =>
      prev.map((prevItem) =>
        prevItem.id === id ? { ...prevItem, priority } : prevItem
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((prevItem) => prevItem.id !== id));
  };

  const completedTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevItem) =>
        prevItem.id === id
          ? { ...prevItem, completed: !prevItem.completed }
          : prevItem
      )
    );
  };

  useEffect(() => {
    let todos = localStorage.getItem("todos");

    todos = JSON.parse(todos);

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoProvider
        value={{
          todos,
          addTodo,
          updateTodo,
          changePriority,
          removeTodo,
          completedTodo,
        }}
      >
        <div className="flex flex-col items-center min-h-screen bg-[#F4EEFF]">
          <TodoForm />
          <TodoList />
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
