import { Link } from "react-router-dom"

export default function Navbar({ handleLogout, currentUser }) {
    // if user is logged in
    const loggedIn = (
      <>
      <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
                // style = {{ 'background-color': '#24CB4B' }}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarColor01"

            >
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                      {/* if the user is logged in..... */}

                      <Link
                          to="/profile"
                          style={{ textDecoration: "none", color: "white" }}
                      >
                          Profile
                      </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to="/search"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            Search
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            {/* todo: app function to logout */}
                            <span onClick={handleLogout}>Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>
      </>
    )

    return (
        <>
    <nav className="navbar navbar-expand-lg navbar-dark" style = {{ 'background-color': '#24CB4B' }}
>
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
                Rankify
            </a>

            {currentUser ? loggedIn : ''}

        </div>
    </nav>
        </>
    )
}
