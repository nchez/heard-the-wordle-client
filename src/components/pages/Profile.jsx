import { useState, useEffect } from 'react'
import GameDetails from './GameDetails'
import axios from 'axios'

export default function Profile({ spotifyToken, currentUser }) {

  const [msg, setMsg] = useState('') 
  const [gameHistory, setGameHistory] = useState([])

  // get artists name from Spotify API -- arrow function
  // map an array of promieses (promises.all()) and throw promises array into state inside a useEffect
  // from weston's snippet, put resolved array in state
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
          return {gameId: element._id, artistId: element.artistId, score: element.score, date: element.createdAt}
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

  const gameDetails =  gameHistory.map((element, index)=> {
    return <GameDetails key={`game-detail-index-${index}`} gameDetail={element} spotifyToken={spotifyToken} currentUser={currentUser} deleteGame={deleteGame}/>
  })
  // const artistNames = gameHistory.map((element,index) => {
  //    return <li key={`artist-list-id-${index}`}>{element.artistId}</li>
  //  })

  return (
    <div>
      <div>
      <h3>{currentUser.name}'s Profile</h3>

      <p>The artists you have played are:</p>
      <ul>
        {/* {artistNames} */}
      </ul>
      </div>
      
      <h6>{msg}</h6>

      <div>
        <h2>Game History</h2>

        <ul>
          {gameDetails}
        </ul>

      </div>
    </div>
  )
}
