import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function EndGame({ score, artistId, currentUser, songsPlayed, difficulty, artistName }) {
    const [scoreSubmit, setScoreSubmit] = useState(false)

    // filter out empty inputs in array - .shift() was removing more than just first index from array
    const filteredArr = songsPlayed.filter(el => {
        return el.songName !== ''
        console.log(el)
    })

    console.log('filtered array', filteredArr)

    const scoreObj = {
        difficulty: difficulty,
        artistName: artistName,
        score: score,
        userId: currentUser.id,
        songsPlayed: filteredArr
    }


    const submitScore = async () => {
        try {
            const addScore = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/game/${artistId}`, scoreObj)
            setScoreSubmit(true)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>End Game</h1>
            <h3>Score for this round: {score}</h3>

            {!scoreSubmit ?
                <button onClick={submitScore}>Submit Your Score</button>
                :
                <button><Link to="/search">Play Again</Link></button>
            }

        </div>
    )
}