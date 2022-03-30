import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function EndGame({score, artistId, currentUser}) {
    const [scoreSubmit, setScoreSubmit] = useState(false)

    const scoreObj = {
        score: score,
        userId: currentUser.id
    }

    const submitScore = async () => {
        try {
            const addScore = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/game/${artistId}`, scoreObj)
            setScoreSubmit(true)

        } catch(err) {
            console.log(err)
        }
    }

    return(
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