import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Search({ spotifyToken, setSpotifyToken }) {
    const CLIENT_ID = "9339daa0c0bd4724976bb425f44f9a2f"
    const REDIRECT_URI = "http://localhost:3000/search"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [search, setSearch] = useState('')
    const [artists, setArtists] = useState([])
    const [artistId, setArtistId] = useState('')
    const [artistName, setArtistName] = useState('')
    const [expired, setExpired] = useState(false)

    const searchArtists = async e => {
        try {
            e.preventDefault()
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${spotifyToken}`
                },
                params: {
                    q: search,
                    type: "artist"
                }
            })
            setArtists(data.artists.items)
            setExpired(false)
        }
        catch (err) {
            if (err.response.status === 401) {
                console.log(err.response.data)
                setExpired(true)
            }
        }
    }

    const handleArtistClick = (id, name) => {
        console.log(`handle artist click for ${id}`)
        setArtistId(id)
        setArtistName(name)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <>
                <div className="grid-item" key={artist.id} onClick={() => handleArtistClick(artist.id, artist.name)}>
                    {artist.images.length ? <img className="img-container" src={artist.images[0].url} alt="" /> : <div>No Image</div>}
                    <br />
                    {artist.name}
                </div>
            </>
        ))
    }

    const spotifyLogout = () => {
        setSpotifyToken('')
        window.localStorage.removeItem("token")
        setExpired(false)
    }

    return (
        <div>
            <h1>How To Play</h1>
            {/* <h1>Search Page</h1> */}
            <div>
                <p className="div-center" style={{ width: '50%' }}>The world is obsessed with the word guessing game Wordle, but if vocabulary is not your thing and music is more of your speed, may we suggest our game, "Rankify"!</p>
                <br />
                <img src="https://c.tenor.com/WOQ4NaiPiRwAAAAC/beats-art.gif" alt="search-page-pic" width="50%" height="200px" />
                <br />
                <br />
                <br />
                <div className="div-center" >

                    <p>You play by trying to guess a particular song with only snippets of the song.</p>
                    <p>Correct guesses will result in a point, but incorrect guesses will result in zero points.</p>
                    <p>If you trust your ears, search for an artist to get started!</p>
                </div>
            </div>

            {expired ?
                <div>
                    <p><em>Your spotify access token has expired, please <button onClick={spotifyLogout}>log out</button> and log back in for a new token</em></p>
                </div>
                :
                ''
            }

            {spotifyToken ?
                <div className="form-group">
                    <form onSubmit={searchArtists}>
                        <label className="col-form-label col-form-label-sm mt-4" htmlFor="search">Search: </label>
                        <input
                            type="text"
                            id="search"
                            placeholder="enter your search here"
                            onChange={e => setSearch(e.target.value)
                            }
                        />
                        <input className="btn btn-sm" type="submit" />
                    </form>
                    <br></br>

                    <h3>Search Results</h3>

                    {artistName ?
                        <Link to={`/game/${artistId}`}><input className="btn btn-sm btn:hover" type="button" value={`Start Game ${artistName}`} /></Link>
                        : ''
                    }

                    <div className="grid-container">
                        {renderArtists()
                        }
                    </div>

                </div>

                : <h1>You must be logged in to spotify</h1>
            }

            {!spotifyToken ?
                <button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                    to Spotify</a></button>
                : ''
            }

        </div>
    )
}
