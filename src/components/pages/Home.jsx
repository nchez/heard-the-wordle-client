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
    <div className="home-description">
      <h2 style={{ paddingTop: '5rem' }}>Welcome to Rankify</h2>

      <div className='div-center'>
        <p>We're in the era where music is everywhere.</p>
        <p>While walking to work, cleaning the house, or just simply lying in bed. </p>
        <p>But do you feel that sometimes you can do more than just listen? </p>
        <p>What if you can both enjoy and learn at the same time?</p>
        <p>What if you can test your knowledge (about music) with other people and compete with them? </p>
        <p>We present to you..... RANKIFY! </p>
        <p>An app that tests your knowledge on music based on your choice of artist(s).</p>
        <p>Given a short preview of a song, you will need to correctly guess the song. </p>
        <p>This app will bring out your listening abilities and your competitiveness all while vibing to jams.</p>

      </div>


      {currentUser ?
        <div>
          <Link to="/search"><button className="btn  btn-game-choices m-3 mx-5 btn-md btn-primary container-mini" >Start New Game</button></Link>

        </div>
        :
        <div>
          <h3>Sign In/Register</h3>

          <input onClick={handleClick} type="button" value="login" />
          <input onClick={handleClick} type="button" value="register" />

          {login === 'register' ?
            <Register currentUser={currentUser} setCurrentUser={setCurrentUser} />
            :
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        </div>
      }

    </div>
  )
}