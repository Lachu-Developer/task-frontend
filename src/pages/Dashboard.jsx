import { useState, useEffect, useCallback } from "react"
import Navbar from "../components/Navbar"
import TaskItem from "../components/TaskItem"
import Loader from "../components/Loader"

const BASE_URL = "https://task-backend-jc5d.onrender.com"

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")

  const getTasks = useCallback(() => {
    setLoading(true)
    fetch(`${BASE_URL}/api/tasks`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data)
        setLoading(false)
      })
  }, [token])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTasks()
  }, [getTasks])

  const addTask = () => {
    fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title, dueDate })
    }).then(() => {
      setTitle("")
      setDueDate("")
      getTasks()
    })
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }, 3600000) // 1 hour

  return () => clearTimeout(timer)
}, [])

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task" />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <button onClick={addTask}>Add</button>

        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>

        {loading && <Loader />}

        {filteredTasks.map(task => (
          <TaskItem key={task._id} task={task} refresh={getTasks} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard