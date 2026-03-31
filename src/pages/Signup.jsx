import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const BASE_URL = "https://task-backend-jc5d.onrender.com"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const signup = () => {
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

        if (data.message) {
          alert("Signup success")
          navigate("/")
        } else {
          setError(data.error)
        }
      })
  }

  return (
    <div className="center">
      <h2>Signup</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      <button onClick={signup}>Signup</button>
    </div>
  )
}

export default Signup