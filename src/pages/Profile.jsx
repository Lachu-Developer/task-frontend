import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

const BASE_URL = "https://task-backend-jc5d.onrender.com"

function Profile() {
  const [user, setUser] = useState({})
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch(`${BASE_URL}/api/profile`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setUser)
  }, [token])

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Profile</h2>
        <p>Email: {user.email}</p>
      </div>
    </div>
  )
}

export default Profile