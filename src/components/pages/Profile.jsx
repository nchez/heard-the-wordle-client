import { useState, useEffect } from 'react'
import GameDetails from './GameDetails'
import axios from 'axios'


export default function Profile({ spotifyToken, currentUser }) {
  const [form, setForm] = useState({
    email: currentUser.email,
    password: ''
  })
  const [artistSort, setArtistSort] = useState(null)
  const [scoreSort, setScoreSort] = useState(null)
  const [dateSort, setDateSort] = useState(null)
  const [msg, setMsg] = useState(null)
  const [gameHistory, setGameHistory] = useState([])
  const [passwordForm, setPasswordForm] = useState(false)

  // get artists name from Spotify API -- arrow function
  // map an array of promieses (promises.all()) and throw promises array into state inside a useEffect
  // from weston's snippet, put resolved array in  state
  // const getArtistName = async (artistId) => {
  //   try{
  //   let apiResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
  //     headers: {
  //         Authorization: `Bearer ${spotifyToken}`
  //     }
  // })
  // return apiResponse.data.name} catch (err) {
  // console.log(err)
  //   }
  // }

  // // replace artistId with artists name
  // const addArtistNames = async (array) => {
  //   // let newArr = []
  //   for (const element of array) {
  //     element.artistName = await getArtistName(element.artistId)
  //     // let awaitArtist = await getArtistName(element.artist)
  //     // newArr.push(awaitArtist)
  //   }
  //   // console.log(newArr)
  //   // return newArr
  // }

  // use useEffect to get data from the back
  useEffect(()=> {(async () => {
      try {
        // get token for local storage
        const token = localStorage.getItem('jwt')
        // console.log('token', token)
        // make the auth headers
        const options = {
          headers: {
            'Authorization': token
          }
        }
        // hit the auth locked endpoint
        // axios.get(url, options)
        // axios.post(url, body, options) (same thing w put)
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile`, options)
        const gameArrayData = response.data.map(element => {
          return {gameId: element._id, artistName: element.artistName, score: element.score, difficulty: element.difficulty,songs: element.songsPlayed, date: new Date(element.createdAt)}
        })
        setGameHistory(gameArrayData)
        // const uniqueArtists = [...new Set(artistArray)]
        // setArtists(uniqueArtists)
      
        // set the data from the server in state
        // setMsg(response.data.msg)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])



      // handle deleteGame button
      const deleteGame = async (gameObj) => {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/game/${gameObj.gameId}`)
        console.log('delete button clicked')
        const indexOfDeletedGame = gameHistory.indexOf(gameHistory.find(element => element.gameId === gameObj.gameId))
        const updatedArray = gameHistory.slice()
        updatedArray.splice(indexOfDeletedGame, 1)
        setGameHistory(updatedArray)
        // setDeleted(!deleted)
    }

    const handleArtistSortClick = () => {
      
      setScoreSort(null)
      setDateSort(null)
      if (artistSort === null) {
        setArtistSort('⬆')
      }
      let sortedArray = gameHistory.slice()
      if (artistSort === '⬆') {
        sortedArray.sort((a,b)=> {
          const artistA = a.artistName.toUpperCase()
          const artistB = b.artistName.toUpperCase()
          return (artistA > artistB) ? -1: (artistA < artistB) ? 1: 0
        })
        setGameHistory(sortedArray)
        setArtistSort('⬇')
      } else if (artistSort === '⬇') {
        sortedArray.sort((a,b)=> {
          const artistA = a.artistName.toUpperCase()
          const artistB = b.artistName.toUpperCase()
          return (artistA < artistB) ? -1: (artistA > artistB) ? 1: 0
        })
        setGameHistory(sortedArray)
        setArtistSort('⬆')
      }
    }
    const handleDateSortClick = () => {
     if (dateSort === null) {
       setDateSort('⬆')

     }
        setArtistSort(null)
        setScoreSort(null)
      
      let sortedArray = gameHistory.slice()
      if (dateSort === '⬆') {
        sortedArray.sort((a,b)=> {
          return b.date - a.date
        })
        setGameHistory(sortedArray)
        setDateSort('⬇')
      } else if (dateSort === '⬇') {
        sortedArray.sort((a,b)=> {
          return a.date - b.date
        })
        setGameHistory(sortedArray)
        setDateSort('⬆')
      }
    }
    const handleScoreSortClick = () => {
      if (scoreSort === null) {
        
        setScoreSort('⬆')
      }
        setArtistSort(null)
        setDateSort(null)
    
      let sortedArray = gameHistory.slice()
      if (scoreSort === '⬆') {
        sortedArray.sort((a,b)=> {
          return b.score - a.score
        })
        setGameHistory(sortedArray)
        setScoreSort('⬇')
      } else if (scoreSort==="⬇") {
        sortedArray.sort((a,b)=> {
          return a.score - b.score
        })
        setGameHistory(sortedArray)
        setScoreSort('⬆')
      }
    }

    const handlePasswordForm = async () => {
      setPasswordForm(!false)
    }
    const handlePasswordChange = async (e) => {
      try {
      e.preventDefault()
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/changepassword`, form)
      setPasswordForm(!passwordForm)
      setMsg('Password successfully changed!')
      setTimeout(()=> {setMsg(null)}, 5000)
      } catch (err) {
        console.log(err.response.data)
      }
    }

    const changePasswordForm = (
      <>
      <p>Change Password</p>
            <form onSubmit={handlePasswordChange}>
  <label htmlFor="password">New Password</label>
  <input type="password" name="password" id="password" onChange={e=>setForm({...form, password: e.target.value})} value={form.password}/>

  <button type="submit" onClick={handlePasswordForm}>Submit</button>
</form>
      </>
    )

    const gameTableHeaders = (
        <tr>
          <th onClick={handleDateSortClick}>Date{dateSort ? dateSort: null}</th>
          <th onClick={handleArtistSortClick}>Artist{artistSort ? artistSort: null}</th>
          <th onClick={handleScoreSortClick}>Score{scoreSort ? scoreSort: null}</th>
          <th>Difficulty</th>
          <th>Details</th>
          <th>New Game</th>
          <th>Delete Game</th>
        </tr>        
    )

  const gameDetails =  gameHistory.map((element, index)=> {
    return <GameDetails key={`game-detail-index-${index}`} gameDetail={element} spotifyToken={spotifyToken} currentUser={currentUser} deleteGame={deleteGame} />
  })

  const summaryTableHeaders = (
    <tr>
      <th>Artist</th>
      <th>Games Played</th>
      <th>Avg Easy Score</th>
      <th>Avg Med Score</th>
      <th>Avg Hard Score</th>
      <th>Weighted Overall Score</th>
    </tr>
  ) 
  

  const summaryDetails = () => {
    let gameCount = 0
    let avgEasy = null
    let avgMed = null
    let avgHard = null
    let wghtdScore = null
    gameHistory.forEach((element, index)=> {
      console.log(element)
    }
  }
  // const artistNames = gameHistory.map((element,index) => {
  //    return <li key={`artist-list-id-${index}`}>{element.artistId}</li>
  //  })

  return (
    <div>
      <div>
      <h3>{currentUser.name}'s Profile</h3>
      {!passwordForm && !msg ? <button onClick={handlePasswordForm}>Change Password?</button>: msg}
      {passwordForm ? changePasswordForm : null}
      </div>
      <div>
        <h2>Summary</h2>
        <table>
          <tbody>
            {summaryTableHeaders}
            {summaryDetails}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Game History</h2>
        <div>
        <table>
          <tbody>
        {gameTableHeaders}
        {gameDetails}
        </tbody>
        </table>
        </div>

      </div>
    </div>
  )
}
