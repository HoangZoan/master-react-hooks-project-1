import { useEffect, useReducer, useState } from "react";
import uiid from "uuid/v4";

const initialTasksState = {
  tasks: [],
  completedTasks: [],
};

const TYPES = {
  ADD_TASK: "ADD_TASK",
  COMPLETE_TASK: "COMPLETE_TASK",
  DELETE_TASK: "DELETE_TASK",
};

const TASKS_STORAGE_KEY = "TASKS_STORAGE_KEY";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case TYPES.COMPLETE_TASK:
      const { completedTask } = action;

      return {
        ...state,
        completedTasks: [...state.completedTasks, completedTask],
        tasks: state.tasks.filter((t) => t.id !== completedTask.id),
      };
    case TYPES.DELETE_TASK:
      return {
        ...state,
        completedTasks: state.completedTasks.filter(
          (t) => t.id !== action.task.id
        ),
      };
    default:
      return initialTasksState;
  }
};

const storeTasks = (taskMap) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskMap));
};

const readStoredTasks = () => {
  const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
  return taskMap || initialTasksState;
};

function Task() {
  const storedTasks = readStoredTasks();
  const [taskText, setTaskText] = useState("");
  const [state, dispatch] = useReducer(tasksReducer, storedTasks);

  useEffect(() => {
    storeTasks(state);
  }, [state]);

  const updateTaskText = (event) => {
    setTaskText(event.target.value);
  };

  const addTask = () => {
    dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uiid() } });
  };

  const completeTask = (completedTask) => {
    dispatch({ type: TYPES.COMPLETE_TASK, completedTask });
  };

  const deleteTask = (task) => {
    dispatch({ type: TYPES.DELETE_TASK, task });
  };

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input value={taskText} onChange={updateTaskText} />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {state.tasks.map((task) => (
          <div key={task.id} onClick={completeTask.bind(null, task)}>
            {task.taskText}
          </div>
        ))}
      </div>

      <div className="completed-list">
        {state.completedTasks.map((task) => {
          const { id, taskText } = task;

          return (
            <div key={id}>
              {taskText}{" "}
              <span
                onClick={deleteTask.bind(null, task)}
                className="delete-task"
              >
                x
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Task;
