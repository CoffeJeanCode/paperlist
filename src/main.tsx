import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "papercss/dist/paper.min.css";
import "./main.css";
import { TasksContextProvider } from "./store";

ReactDOM.render(
  <TasksContextProvider>
    <App />
  </TasksContextProvider>,
  document.getElementById("root")
);
