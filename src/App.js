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
  // state wi the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null)
  // useEffect that handles localstorage if the user navigates away fro mthe page/refreshes
  useEffect(() => { 
    const token = localStorage.getItem('jwt')
    // if a toekn is found, log the user in, otherwise make sure they are logged out
    if (token) {
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])
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
        <Routes>
          <Route 
            path='/'
            element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
          />


          {/* <Route 
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          /> */}
         {/* 
          <Route 
          path="/profile"
          element={<Profile />}
          /> 
        */}
          
          <Route 
            path="/profile"
            element={currentUser ? <Profile  currentUser={currentUser} /> : <Navigate to="/login" />}
          />

          < Route 
            path="/search"
            element ={<Search />}
          />
          
          < Route 
            path="/game"
            element ={<Game />}
          />

          {/* <Route 
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
