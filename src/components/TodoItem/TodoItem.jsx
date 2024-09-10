import { useState } from "react";
import { useTodo } from "../../contexts/TodoContext";
import {
  MdEdit,
  MdClose,
  MdSave,
  MdOutlineCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";

const TodoItem = ({ todo }) => {
  const [isTodoCompleted, setIsTodoCompleted] = useState(todo.completed);
  const [isEditable, setIsEditable] = useState(true);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [priority, setPriority] = useState(todo.priority);
  const [isDisabled, setIsDisabled] = useState(todo.completed);

  const { updateTodo, changePriority, removeTodo, completedTodo } = useTodo();

  const completedTodoItem = () => {
    setIsTodoCompleted((prev) => !prev);
    completedTodo(todo.id);
    setIsDisabled((prev) => !prev);
  };

  const updateTodoItem = (e) => {
    const msg = e.target.value;
    if (!msg) return;
    setTodoMsg(msg);
    updateTodo(todo.id, msg);
  };

  const changeTodoPriority = () => {
    const newPriority =
      priority === "Low" ? "Medium" : priority === "Medium" ? "High" : "Low";

    setPriority(newPriority);
    changePriority(todo.id, newPriority);
  };

  return (
    <div className="flex items-center gap-1 bg-[#424874] px-4 sm:px-7 md:px-10 py-2 sm:py-4 md:py-6 rounded-lg mb-2">
      <button
        onClick={completedTodoItem}
        className="text-xl sm:text-2xl md:text-3xl text-[#F4EEFF] hover:text-[#DCD6F7]"
      >
        {isTodoCompleted ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
      </button>
      <input
        type="text"
        disabled={isEditable}
        value={todoMsg}
        onChange={updateTodoItem}
        className={`w-full min-w-20 px-4 py-2 rounded-md outline-none bg-[#424874] text-xs sm:text-base text-white font-medium ${
          isEditable ? "" : "bg-[#DCD6F7] text-[#424874]"
        }`}
      />
      <button
        onClick={() => setIsEditable((prev) => !prev)}
        disabled={isDisabled}
        className={`min-h-7 min-w-8 sm:min-h-9 sm:min-w-10 md:min-h-10 md:min-w-12 bg-[#A6B1E1] text-[#424874] rounded-md disabled:opacity-50 ${
          !isDisabled ? "hover:bg-[#DCD6F7]" : ""
        }`}
      >
        {isEditable ? (
          <MdEdit className="m-auto" />
        ) : (
          <MdSave className="m-auto" />
        )}
      </button>
      <button
        onClick={changeTodoPriority}
        disabled={isDisabled}
        className={`min-h-7 min-w-16 sm:min-h-9 sm:min-w-20 md:min-h-10 md:min-w-20 text-xs font-semibold sm:font-bold rounded-md disabled:opacity-50 ${
          priority === "High"
            ? "bg-red-300 hover:bg-red-400"
            : priority === "Medium"
            ? "bg-yellow-200 hover:bg-yellow-300"
            : "bg-green-300 hover:bg-green-400"
        }`}
      >
        {priority}
      </button>
      <button
        onClick={() => removeTodo(todo.id)}
        className="min-h-7 min-w-8 sm:min-h-9 sm:min-w-10 md:min-h-10 md:min-w-12 bg-[#A6B1E1] text-[#424874] hover:bg-red-400 hover:text-white rounded-md"
      >
        <MdClose className="m-auto" />
      </button>
    </div>
  );
};
export default TodoItem;
