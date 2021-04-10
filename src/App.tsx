import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createId } from "./utils/createId";
import { useLocalStorage } from "./hooks/useLocalStorage";

type Task = {
  title: string;
  isDone: boolean;
  id: string;
};

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    isDone: false,
    id: "",
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      document.title =
        document.title === "Paper List"
          ? `${tasks.filter((task: Task) => task.isDone).length} tasks`
          : "Paper List";
    }, 5000);
    return () => {
      clearInterval(timeout);
    };
  }, []);

  const handleAddTasks = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    evt.persist();

    if (!newTask.title) return;

    setTasks([...tasks, { ...newTask, id: createId() }]);
    setNewTask({ title: "", id: "", isDone: false });
  };

  const handleNewTask = (evt: ChangeEvent<HTMLInputElement>) => {
    const task = { ...newTask, title: evt.target.value };

    setNewTask(task);
  };

  const handleDeleteTask = (id: string) => () => {
    const newTasks = tasks.filter((task: Task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleCompleteTask = (id: string) => () => {
    const newTasks = tasks.map((task: Task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );

    setTasks(newTasks);
  };

  return (
    <main className="list__container container">
      <header className="header__container">
        <h1>Paper List</h1>
        <span className="task__count badge success">
          Completed Tasks:{" "}
          {tasks ? tasks.filter((task: Task) => task.isDone).length : 0}
        </span>
      </header>
      <form className="input__container" onSubmit={handleAddTasks}>
        <input
          type="text"
          placeholder="Write your tasks..."
          onChange={handleNewTask}
          autoFocus={true}
          value={newTask.title}
        />
        <button>Add Task</button>
      </form>
      <ul className="tasks__container">
        {tasks.map((task: Task) => (
          <li className="task__item" key={task.id}>
            <label htmlFor={`task-${task.id}`} className="paper-check">
              <input
                type="checkbox"
                id={`task-${task.id}`}
                onChange={handleCompleteTask(task.id)}
                checked={task.isDone}
              />
              <span>{task.title}</span>
            </label>
            <button
              className="btn-small btn-danger-outline"
              onClick={handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
