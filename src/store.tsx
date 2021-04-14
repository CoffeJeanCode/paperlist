import React, {
  ChangeEvent,
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Task } from "./types";
import { createId } from "./utils/createId";
import { getIds } from "./utils/getter";
import { toMap } from "./utils/toMap";

type TasksContextType = {
  handleUpdateTask: (id: string) => () => void;
  handleDeleteTask: (id: string) => () => void;
  handleNewTask: (evt: ChangeEvent<HTMLInputElement>) => void;
  handleAddTask: () => void;
  mappingTasks: (
    mapper: (task: Task, index: number) => JSX.Element
  ) => JSX.Element[];
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
  mappingTasks: (mapper) => [<></>],
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

  useEffect(() => {
    setCompleted(tasks.filter((task) => task.isDone).length);
  }, [tasks]);

  const handleAddTask = useCallback(() => {
    if (!newTask.title) return;

    setTasks([{ ...newTask, id: createId() }, ...tasks]);
    setNewTask({ title: "", id: "", isDone: false });
  }, [newTask]);

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
  };

  const mappingTasks = (mapper: (task: Task, index: number) => JSX.Element) => {
    const taskIds = getIds(tasks);
    const mapTasks = toMap(tasks, "id");
    return taskIds.map((id, index) => mapper(mapTasks.get(id), index));
  };

  return (
    <TasksContext.Provider
      value={{
        handleUpdateTask,
        handleDeleteTask,
        handleAddTask,
        handleNewTask,
        mappingTasks,
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
