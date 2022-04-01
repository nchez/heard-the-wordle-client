import { useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default function GameDetails({ gameDetail, spotifyToken, currentUser, deleteGame }) {
    const [showDetails, setShowDetails] = useState(false)

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