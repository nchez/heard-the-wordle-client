import Login from '../Login'
import Register from '../Register'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home({ currentUser, setCurrentUser }) {
  const [login, setLogin] = useState('REGISTER')
  const [showForm, setShowForm] = useState(false)
 
  const handleClick = e => {
    e.preventDefault()
    console.log('testing', e.target.value)
    setLogin(e.target.value)
  }
  
  const handleForm = e => {
    e.preventDefault()
    console.log('testing', e.target.value)
    setShowForm(true)
  }

  console.log(currentUser)

  return (
    <div className="home-description">
      <h1 style={{ paddingTop: '2.5rem' }}>Welcome to Rankify</h1>
      <br />

      {!showForm ?
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

          {currentUser ?
            <div>
              <Link to="/search"><button className="btn btn-game-choices m-3 mx-5 btn-md btn-primary container-mini" >Start New Game</button></Link>
            </div>
            :
            <div> 
              <br />
              <input onClick={handleForm} className="btn  btn-game-choices m-3 mx-5 btn-md btn-primary container-mini" style={{ padding: '5px 10px' }} type="button" value="LOG IN / REGISTER" />
            </div>
          }

        <br />
        <p><img src="https://media1.giphy.com/media/3lxD1O74siiz5FvrJs/giphy.gif?cid=ecf05e4763f96e739rc8khkl9znm9e1eytze7zedzdn88z59&rid=giphy.gif&ct=g" /></p>

        </div>

        : 
        <div>
          <input onClick={handleClick} type="button" value="LOG IN" className="btn btn-game-choices m-3 mx-5 btn-md btn-primary container-mini" style={{ padding: '5px 10px' }} />
          <input onClick={handleClick} type="button" value="REGISTER" className="btn btn-game-choices m-3 mx-5 btn-md btn-primary container-mini" style={{ padding: '5px 10px' }}/>      

          {login === 'REGISTER' ?
            <Register currentUser={currentUser} setCurrentUser={setCurrentUser} setShowForm={setShowForm}/>
            :
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} setShowForm={setShowForm} />
          }
        </div>
      }

    </div>
  )
}