import Login from '../Login'
import Register from '../Register'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home({ currentUser, setCurrentUser }) {
  const [login, setLogin] = useState('register')

  const handleClick = e => {
    e.preventDefault()
    console.log('testing', e.target.value)
    setLogin(e.target.value)
  }

  console.log(currentUser)

  return (
    <div>
      <h2>Home Page: Welcome to Rankify</h2>

      <p>We're in the era where music is everywhere. While walking to work, cleaning the house, or just simply lying in bed. But do you feel that sometimes you can do more than just listen? What if you can both enjoy and learn at the same time? What if you can test your knowledge (about music) with other people and compete with them? We present to you..... RANKIFY! An app that tests your knowledge on music based on your choice of artist(s). Given a short preview of a song, you will need to correctly guess the song within 10 seconds (multiple choice). This app will bring out your listening abilities and your competitiveness all while vibing to jams.</p>


      {currentUser ? 
      <div>
        <Link to="/search"><button>Start New Game</button></Link>
        
      </div>
      :
          <div>
            <h3>Sign In/Register</h3>

            <input onClick={handleClick} type="button" value="login" />
            <input onClick={handleClick} type="button" value="register" />

            {login === 'register' ?
            <Register currentUser={currentUser} setCurrentUser={setCurrentUser}/> 
            :
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            }
          </div>
      }
      
    </div>
  )
}