import { Link } from 'react-router-dom'

export default function Navbar({ handleLogout, currentUser }) {
  // if the user is logged in
  const loggedIn = (
    <>
      <nav className="nav nav-tabs nav-item">
        {/* if the user is logged in..... */}

        <Link to="/profile">Profile</Link>
      </nav>
      <nav className="nav nav-tabs nav-item">
        <Link to="/search">Search</Link>
      </nav>
      <nav className="nav nav-tabs nav-item">
        <Link to="/">
          {/* todo: app function to logout */}
          <span onClick={handleLogout}>Log out</span>
        </Link>
      </nav>
    </>
  )

  // if the user is logged out
  // const loggedOut = (
  //   <>
  //     {/* if the user in logged out..... */}
  //     <Link to="/register">register</Link>

  //     <Link to="/login">login</Link>
  //   </>
  // )

  return (
    <>
      <nav className="nav nav-tabs nav-item">
        <Link to="/">Home</Link>
        {currentUser ? loggedIn : ''}
      </nav>
    </>
  )
}