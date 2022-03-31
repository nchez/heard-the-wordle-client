import { useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default function GameDetails({ gameDetail, spotifyToken, currentUser, deleteGame }) {
    // const [show, setShow] = useState(false)
    // state if apicall is still loading (false) or if it is completed (true)
    const [apiCall, setApiCall] = useState(false)
    // const [deleted, setDeleted] = useState(false)
    
    // change UTC timestamp from mongodb to js date obj
    const dateObj = new Date(gameDetail.date)

    // api call (not async due to timing issues) to grab artist name and add name to gameDetail obj
    axios.get(`https://api.spotify.com/v1/artists/${gameDetail.artistId}`, {
          headers: {
              Authorization: `Bearer ${spotifyToken}`
          }
    }).then(response => {gameDetail.artistName = response.data.name}).then(()=>{setApiCall(true)}).catch(e=> {
        console.log(e)
    })
    // // handle deleteGame button
    // const deleteGame = async () => {
    //     await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/game/${gameDetail.gameId}`)
    //     console.log('delete button clicked')
    //     // setDeleted(!deleted)
    // }
    
    return (
        <tr>
            <td>
            <p>{dateObj.toDateString()}</p>
            </td>
            <td>
            <p>{gameDetail.artistName}</p>
            </td>
            <td>
            <p>{gameDetail.score}</p>
            </td>
            <td>
            <p>Details</p>
            </td>
            <td>
            <Link to={`/game/${gameDetail.artistId}`}><input type="button" value={`Start ${apiCall ? gameDetail.artistName : 'Still Loading'} Game`} /></Link>
            </td>
            <td>
            <input type="button" value={`Delete this Game`} onClick={()=>deleteGame(gameDetail)}/>
            </td>
        </tr>
    )
}
