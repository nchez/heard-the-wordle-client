import axios from "axios"
import { useState } from "react"

export default function EndGame({score, artistId, currentUser}) {
    const [form, setForm] = useState({
        score: score,
        userId: currentUser.id
      })


    const submitScore = async () => {
        try {

            const addScore = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/game/${artistId}`, form)
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div>
            <h1>End Game</h1>
            {/* <form onSubmit={submitScore()}>                 */}
                <h3>score: {score}</h3>
                <h3>artist id: {artistId}</h3>
                <h3>current user id: {currentUser.id}</h3>

                {/* passing score and artist id to the backend */}
                {/* <input type="submit" value="Submit Your Score" />
            </form> */}

            <button onClick={submitScore}>Submit Your Scores</button>

        </div>
    )
}