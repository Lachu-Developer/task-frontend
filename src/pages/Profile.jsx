import Navbar from "../components/Navbar"

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>User Profile</h2>
        <p>Email: user@example.com</p>
      </div>
    </div>
  )
}

export default Profile