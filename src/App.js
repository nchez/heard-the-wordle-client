import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
// import Login from './components/Login'
import Home from './components/pages/Home'
// import Register from './components/Register'
import Profile from './components/pages/Profile'
import Search from './components/pages/Search';
import Game from './components/pages/Game';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'

function App() {
  const CLIENT_ID = "9339daa0c0bd4724976bb425f44f9a2f"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  // spotify token
  const [spotifyToken, setSpotifyToken] = useState('')
  // state wi the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null)
  // useEffect that handles localstorage if the user navigates away fro mthe page/refreshes

  // SPOTIFY - oauth
  useEffect(() => {
    const hash = window.location.hash
    let spotifyToken = window.localStorage.getItem("token")

    if (!spotifyToken && hash) {
        spotifyToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", spotifyToken)
    }
    setSpotifyToken(spotifyToken)
  }, [])

  // app user jwt
  useEffect(() => { 
    const token = localStorage.getItem('jwt')
    // if a toekn is found, log the user in, otherwise make sure they are logged out
    if (token) {
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])

  const spotifyLogout = () => {
    setSpotifyToken('')
    window.localStorage.removeItem("token")
  }

  // logout handleer function that deletes a token from localstorage
  const handleLogout = () => {
    // remove the token from local storage
    if (localStorage.getItem('jwt')) localStorage.removeItem('jwt')
    // set the user state to be null
    setCurrentUser(null)
  }

   return (
    <Router>
      <Navbar handleLogout={handleLogout} currentUser={currentUser}/>

      <div className="App">

        {!spotifyToken ?
          <button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a></button>
          : <button onClick={spotifyLogout}>Log out of Spotify</button>
        }

        <Routes>
          <Route 
            path='/'
            element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
          />
          
          <Route 
            path="/profile"
            element={currentUser ? <Profile  currentUser={currentUser} /> : <Navigate to="/login" />}
          />

          < Route 
            path="/search"
            element ={<Search spotifyToken={spotifyToken}/>}
          />
          
          < Route 
            path="/game/:id"
            element ={<Game />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
