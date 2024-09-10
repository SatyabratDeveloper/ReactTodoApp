import { useState } from "react";
import { useTodo } from "../../contexts/TodoContext";

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [todoItem, setTodoItem] = useState("");

  const addTodoItem = (e) => {
    e.preventDefault();

    if (!todoItem) return;

    addTodo({ todo: todoItem, priority: "Low", completed: false });
    setTodoItem("");
  };

  return (
    <div className="w-11/12 sm:w-10/12 md:w-8/12 xl:w-7/12 2xl:w-6/12 text-center mt-10">
      <h1 className="text-3xl font-bold text-[#424874] py-10">Todo App</h1>
      <input
        type="text"
        value={todoItem}
        onChange={(e) => setTodoItem(e.target.value)}
        className="px-6 py-3 w-3/5 font-medium bg-[#DCD6F7] rounded-md outline-none mr-1"
      />
      <button
        onClick={addTodoItem}
        className="bg-[#424874] font-medium text-white px-7 py-3 rounded-md"
      >
        ADD
      </button>
    </div>
  );
};
export default TodoForm;
