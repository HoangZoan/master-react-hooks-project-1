import { useEffect, useState } from "react";
import uiid from "uuid/v4";

const TASKS_STORAGE_KEY = "TASKS_STORAGE_KEY";

const storeTasks = (taskMap) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskMap));
};

const readStoredTasks = () => {
  const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
  return taskMap || { tasks: [], completedTasks: [] };
};

function Task() {
  const storedTasks = readStoredTasks();
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(storedTasks.tasks);
  const [completedTasks, setCompletedTasks] = useState(
    storedTasks.completedTasks
  );

  useEffect(() => {
    storeTasks({ tasks, completedTasks });
  }, [tasks, completedTasks]);

  const updateTaskText = (event) => {
    setTaskText(event.target.value);
  };

  const addTask = () => {
    setTasks([...tasks, { taskText, id: uiid() }]);
  };

  const completeTask = (completedTask) => {
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter((task) => task.id !== completedTask.id));
  };

  const deleteTask = (task) => {
    setCompletedTasks(completedTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input value={taskText} onChange={updateTaskText} />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} onClick={completeTask.bind(null, task)}>
            {task.taskText}
          </div>
        ))}
      </div>

      <div className="completed-list">
        {completedTasks.map((task) => {
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
