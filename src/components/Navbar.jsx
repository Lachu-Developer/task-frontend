import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="nav">
      <h3>Task App</h3>
      <div>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar