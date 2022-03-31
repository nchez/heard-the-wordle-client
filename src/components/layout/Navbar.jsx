import { Link } from 'react-router-dom'

export default function Navbar({ handleLogout, currentUser }) {
  // if the user is logged in
  const loggedIn = (
    <>
      <li class="nav-item">
        {/* if the user is logged in..... */}

        <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>Profile</Link>
      </li>
      <li class="nav-item">
        <Link to="/search" style={{ textDecoration: 'none', color: 'white' }}>Search</Link>
      </li>
      <li class="nav-item">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          {/* todo: app function to logout */}
          <span onClick={handleLogout}>Log out</span>
        </Link>
      </li>
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
      <nav class="navbar navbar-expand-md" style={{ 'background-color': '#24CB4B' }}>
        <div class="container-fluid">
          <a class="navbar-brand">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarColor03">
            <ul class="navbar-nav me-auto">
              {currentUser ? loggedIn : ''}

            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}