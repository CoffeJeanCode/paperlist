import React from "react";
import TasksList from "./components/TasksList";
import { useTasksContext } from "./store";
import { arrayMove } from "./utils/arrayMove";

function App() {
  const {
    tasks,
    completed,
    newTask,
    setTasks,
    handleAddTask,
    handleNewTask,
  } = useTasksContext();

  return (
    <main className="list__container container">
      <header className="header__container">
        <h1>Paper List</h1>
        <span className="task__count badge success">
          Completed Tasks: {completed}
        </span>
      </header>
      <form
        className="input__container"
        onSubmit={(evt) => {
          evt.preventDefault();
          evt.persist();

          handleAddTask();
        }}
      >
        <input
          type="text"
          placeholder="Write your tasks..."
          autoFocus={true}
          onChange={handleNewTask}
          value={newTask.title}
        />
        <button>Add Task</button>
      </form>
      <TasksList
        onSortEnd={({ oldIndex, newIndex }) => {
          setTasks(arrayMove(tasks, oldIndex, newIndex));
        }}
        useDragHandle
      />

      {/* <Timer /> */}
    </main>
  );
}

export default App;
