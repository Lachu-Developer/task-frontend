import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"

const BASE_URL = "https://your-backend.onrender.com"

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")

  const getTasks = () => {
    setLoading(true)
    fetch(`${BASE_URL}/api/tasks`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getTasks()
  }, [])

  const addTask = () => {
    fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title })
    }).then(() => {
      setTitle("")
      getTasks()
    })
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        <input value={title} onChange={e => setTitle(e.target.value)} />
        <button onClick={addTask}>Add</button>

        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>

        {loading && <Loader />}

        {filteredTasks.map(task => (
          <div key={task._id} className="task">
            <span>{task.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
