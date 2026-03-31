function TaskItem({ task, refresh }) {
  const token = localStorage.getItem("token")
  const BASE_URL = "https://task-backend-jc5d.onrender.com"

  const toggle = () => {
    fetch(`${BASE_URL}/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token }
    }).then(refresh)
  }

  const remove = () => {
    fetch(`${BASE_URL}/api/tasks/${task._id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    }).then(refresh)
  }

  const edit = () => {
    const newTitle = prompt("Edit task", task.title)

    fetch(`${BASE_URL}/api/tasks/edit/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title: newTitle })
    }).then(refresh)
  }

  return (
    <div className="task">
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title} ({task.dueDate ? new Date(task.dueDate).toDateString() : ""})
      </span>

      <div>
        <button onClick={toggle}>✔</button>
        <button onClick={edit}>✏️</button>
        <button onClick={remove}>❌</button>
      </div>
    </div>
  )
}

export default TaskItem