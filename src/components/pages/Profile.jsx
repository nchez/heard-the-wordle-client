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
          return {gameId: element._id, artistId: element.artistId, score: element.score, songs: element.songsPlayed, date: new Date(element.createdAt)}
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
      let sortedArray = gameHistory.slice()
      if (dateSort !== null || scoreSort !== null) {
        setDateSort(null)
        setScoreSort(null)
      }
      if (artistSort === null) {
        sortedArray.sort((a,b)=> {
          return a.artistId - b.artistId
        })
        setGameHistory(sortedArray)
        setArtistSort('up')
      } else if (artistSort === 'up') {
        sortedArray.sort((a,b)=> {
          return a.artistId - b.artistId
        })
        setGameHistory(sortedArray)
        setArtistSort('down')
      } else if (artistSort === 'down') {
        sortedArray.sort((a,b)=> {
          return b.artistName - a.artistName
        })
        setGameHistory(sortedArray)
        setArtistSort('up')
      }
    }
    const handleDateSortClick = () => {
      if (artistSort !== null || scoreSort !== null) {
        setArtistSort(null)
        setScoreSort(null)
      }
      if (dateSort === null) {
        gameHistory.sort((a,b)=> {
          return b.date - a.date
        })
        setDateSort('up')
      } else if (dateSort === 'up') {
        gameHistory.sort((a,b)=> {
          return a.date - b.date
        })
        setDateSort('down')
      } else if (dateSort === 'down') {
        gameHistory.sort((a,b)=> {
          return b.date - a.date
        })
        setDateSort('up')
      }
    }
    const handleScoreSortClick = () => {
      if (artistSort !== null || dateSort !== null) {
        setArtistSort(null)
        setDateSort(null)
      }
      if (scoreSort === null) {
        gameHistory.sort((a,b)=> {
          return b.score - a.score
        })
        setScoreSort('up')
      } else if (scoreSort === 'up') {
        gameHistory.sort((a,b)=> {
          return a.score - b.score
        })
        setScoreSort('down')
      } else {
        gameHistory.sort((a,b)=> {
          return b.Score - a.score
        })
        setScoreSort('up')
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
          <th onClick={handleDateSortClick}>Date</th>
          <th onClick={handleArtistSortClick}>Artist</th>
          <th onClick={handleScoreSortClick}>Score</th>
          <th>Details</th>
          <th>New Game</th>
          <th>Delete Game</th>
        </tr>        
    )

  const gameDetails =  gameHistory.map((element, index)=> {
    return <GameDetails key={`game-detail-index-${index}`} gameDetail={element} spotifyToken={spotifyToken} currentUser={currentUser} deleteGame={deleteGame} />
  })
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
