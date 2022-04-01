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
            <br />
            <h1>End Game</h1>
            <br />
            <h3>Final Score: {score}</h3>
            <br />
            {score === 1 ?
                <img src="https://c.tenor.com/JhIdzlzIPCoAAAAM/oprah-you.gif" alt="end-game-gif" />
                :
                score === 2 ?
                    <img src="https://i.gifer.com/Bax.gif" alt="end-game-gif" />
                    :
                    score === 3 ?
                        <img src="https://i.gifer.com/LrS.gif" alt="end-game-gif" />
                        :
                        score === 4 ?
                            <img src="https://c.tenor.com/e-0xn3dsDd4AAAAM/will-smith.gif" alt="end-game-gif" />
                            :
                            score === 5 ?
                                <img src="https://blog.hubspot.com/hubfs/Smiling%20Leo%20Perfect%20GIF.gif" alt="end-game-gif" />
                                :
                                <img src="https://c.tenor.com/ebMtOFGv1uYAAAAC/none-you-get-zero-none.gif" alt="end-game-gif" />
            }
            <br />
            {!scoreSubmit ?
                <button className="btn btn-game-choices m-3 mx-2 btn-md btn-primary container-mini" onClick={submitScore}>Submit Your Score</button>
                :
                <>
                    <button className="btn btn-game-choices m-3 mx-2 btn-md btn-primary container-mini" ><Link to="/search" style={{ textDecoration: 'none', color: 'white' }}>Play Again: New Artist</Link></button>
                    {/* <button className="btn btn-game-choices m-3 mx-2 btn-md btn-primary container-mini" ><Link to={`/game/${artistId}`} style={{ textDecoration: 'none', color: 'white' }}>Play Again: {artistName}</Link></button> */}
                </>
            }

        </div >
    )
}