import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const BASE_URL = "https://task-backend-jc5d.onrender.com"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const login = () => {
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
          localStorage.setItem("token", data.token)
          navigate("/dashboard")
        } else {
          setError(data.error)
        }
      })
  }

  return (
    <div className="center">
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      <button onClick={login}>Login</button>
      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")} style={{ color: "blue", cursor: "pointer" }}>
          Signup
        </span>
      </p>
    </div>
  )
}

export default Login