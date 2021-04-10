import React, {
  ChangeEvent,
  createContext,
  FC,
  useContext,
  useState,
} from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Task } from "./types";
import { createId } from "./utils/createId";

type TasksContextType = {
  handleUpdateTask: (id: string) => () => void;
  handleDeleteTask: (id: string) => () => void;
  handleNewTask: (evt: ChangeEvent<HTMLInputElement>) => void;
  handleAddTask: () => void;
  setTasks: (value: Task[]) => void;
  newTask: Task;
  tasks: Task[];
  completed: number;
};

const TasksContext = createContext<TasksContextType>({
  handleUpdateTask: (id: string) => () => {},
  handleDeleteTask: (id: string) => () => {},
  handleAddTask: () => {},
  handleNewTask: (evt: ChangeEvent<HTMLInputElement>) => {},
  setTasks: (value: Task[]) => {},
  newTask: { title: "", id: "", isDone: false },
  tasks: [],
  completed: 0,
});

export const TasksContextProvider: FC = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [completed, setCompleted] = useState(0);
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    isDone: false,
    id: "",
  });

  const handleAddTask = () => {
    if (!newTask.title) return;

    setTasks([...tasks, { ...newTask, id: createId() }]);
    setNewTask({ title: "", id: "", isDone: false });
  };

  const handleNewTask = (evt: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, title: evt.target.value });
  };

  const handleDeleteTask = (id: string) => () => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleUpdateTask = (id: string) => () => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(newTasks);
    setCompleted(tasks.filter((task) => task.isDone).length);
  };

  return (
    <TasksContext.Provider
      value={{
        handleUpdateTask,
        handleDeleteTask,
        handleAddTask,
        handleNewTask,
        setTasks,
        newTask,
        tasks,
        completed,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
