import React, { memo } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { useTasksContext } from "../store";
import { Task } from "../types";

const TasksList = SortableContainer(() => {
  const { tasks, mappingTasks } = useTasksContext();
  return (
    <ul className="tasks__container">
      {mappingTasks((task, index) => (
        <TaskItem key={task.id} index={index} task={task} />
      ))}
    </ul>
  );
});

type TaskItemProps = {
  task: Task;
};

const TaskItem = SortableElement(({ task }: TaskItemProps) => {
  const { handleUpdateTask, handleDeleteTask } = useTasksContext();

  return (
    <li className="task__item" key={task.id}>
      <DragHandler />
      <label htmlFor={`task-${task.id}`} className="paper-check">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          onChange={handleUpdateTask(task.id)}
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
  );
});

const DragHandler = SortableHandle(() => <span className="handler">: :</span>);

export default memo(TasksList);
