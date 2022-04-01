import { useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default function GameDetails({ gameDetail, spotifyToken, currentUser, deleteGame }) {
    const [showDetails, setShowDetails] = useState(false)
    // state if apicall is still loading (false) or if it is completed (true)
    // const [deleted, setDeleted] = useState(false)

    // to prevent duplicate API calls on artistIds, pass game history and check for previous artistIds? But then how is the artist name grabbed?

    // api call (not async due to timing issues) to grab artist name and add name to gameDetail obj
    // axios.get(`https://api.spotify.com/v1/artists/${gameDetail.artistId}`, {
    //       headers: {
    //           Authorization: `Bearer ${spotifyToken}`
    //       }
    // }).then(response => {gameDetail.artistName = response.data.name}).then(()=>{setApiCall(true)}).catch(e=> {
    //     console.log(e)
    // })
    // // handle deleteGame button
    // const deleteGame = async () => {
    //     await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/game/${gameDetail.gameId}`)
    //     console.log('delete button clicked')
    //     // setDeleted(!deleted)
    // }

    const songsPlayed = gameDetail.songs.map((element, index) => {
        return <tr key={`songDetail-index-${index}`}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <li> <a href={`${element.songUrl}`} style={{ color: 'white' }}>{element.songName}</a> </li>
            </td>
            <td>
                {element.answer === false ? 'Wrong' : 'Correct'}
            </td>
        </tr>
    })
    const tableHeaders = (

        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
                Song Name
            </th>
            <th>
                Answer
            </th>
        </tr>
    )
    const handleGameDetailClick = (array) => {
        setShowDetails(!showDetails)
    }

    return (
        <>
            <tr>
                <td style={{ paddingRight: '20px' }}>
                    {gameDetail.date.toDateString()}
                </td>
                <td>
                    {gameDetail.artistName}
                </td>
                <td>
                    {gameDetail.score}
                </td>
                <td>
                    {gameDetail.difficulty.toUpperCase()}
                </td>
                <td>
                    <input type="button" className='btn  btn-game-choices m-3 btn-sm btn-primary container-mini' value={showDetails ? 'Hide Game Details' : 'Show Game Details'} onClick={() => handleGameDetailClick()} />
                </td>
                <td>
                    <Link to={`/game/${gameDetail.artistId}`}><input type="button" className='btn  btn-game-choices m-3 btn-sm btn-primary container-mini' value={`Start ${gameDetail.artistName} Game`} /></Link>
                </td>
                <td>
                    <input type="button" className='btn  btn-game-choices m-3 btn-sm btn-primary container-mini' value={`Delete this Game`} onClick={() => deleteGame(gameDetail)} />
                </td>
            </tr>
            {showDetails ? tableHeaders : null}
            {showDetails ? songsPlayed : null}
        </>
    )
}