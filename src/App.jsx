import { useState, useEffect } from "react"

const BASE_URL = 'https://task-backend-jc5d.onrender.com'

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // 🎨 BUTTON STYLE
  const btn = {
    padding: "8px 12px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer"
  }

  const dangerBtn = {
    ...btn,
    backgroundColor: "#ffffff"
  }

  const secondaryBtn = {
    ...btn,
    backgroundColor: "#3498db"
  }

  // LOGIN
  const login = () => {
    if (!email || !password) return setError("Enter all fields")

    setLoading(true)
    setError("")

    fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false)

        if (data.token) {
          setToken(data.token)
          localStorage.setItem("token", data.token)
        } else {
          setError(data.error)
        }
      })
      .catch(() => {
        setLoading(false)
        setError("Server error")
      })
  }

  // SIGNUP
  const signup = () => {
    if (!email || !password) return setError("Enter all fields")

    setLoading(true)
    setError("")

    fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        setError(data.message || data.error)
      })
  }

  // GET TASKS
  const getTasks = () => {
    fetch(`${BASE_URL}/api/tasks`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setTasks)
  }

  useEffect(() => {
    if (token) getTasks()
  }, [token])

  // ADD TASK
  const addTask = () => {
    if (!title) return setError("Enter task")

    setLoading(true)

    fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title })
    }).then(() => {
      setLoading(false)
      setTitle("")
      getTasks()
    })
  }

  // DELETE
  const deleteTask = (id) => {
    fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    }).then(getTasks)
  }

  // TOGGLE
  const toggleTask = (id) => {
    fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token }
    }).then(getTasks)
  }

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
  }

  // 🔐 LOGIN UI
  if (!token) {
    return (
      <div style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2>🔐 Auth System</h2>

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          style={{ padding: "10px", width: "90%", marginBottom: "10px" }}
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={{ padding: "10px", width: "90%", marginBottom: "10px" }}
        />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button style={secondaryBtn} onClick={login}>Login</button>
        <button style={btn} onClick={signup}>Signup</button>
      </div>
    )
  }

  // 🚀 TASK UI
  return (
    <div style={{
      maxWidth: "500px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h2>🚀 Task Manager</h2>

      <button style={dangerBtn} onClick={logout}>Logout</button>

      <br /><br />

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "10px", width: "70%" }}
      />
      <button style={btn} onClick={addTask}>Add</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      {tasks.length === 0 && <p>No tasks yet 👀</p>}

      {tasks.map(task => (
        <div key={task._id} style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
          padding: "10px",
          border: "1px solid #eee",
          borderRadius: "5px"
        }}>
          <span style={{
            textDecoration: task.completed ? "line-through" : "none"
          }}>
            {task.title}
          </span>

          <div>
            <button style={secondaryBtn} onClick={() => toggleTask(task._id)}>✔</button>
            <button style={dangerBtn} onClick={() => deleteTask(task._id)}>❌</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App