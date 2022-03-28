import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Search({ spotifyToken, setSpotifyToken }) {
    const CLIENT_ID = "9339daa0c0bd4724976bb425f44f9a2f"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [search, setSearch] = useState('')
    const [artists, setArtists] = useState([])
    const [artistId, setArtistId] = useState('')
    const [artistName, setArtistName] = useState('')

    const searchArtists = async (e) => {
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
    }

    const handleArtistClick = (id, name) => {
        console.log(`handle artist click for ${id}`)
        setArtistId(id)
        setArtistName(name)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id} onClick={()=>handleArtistClick(artist.id, artist.name)}>
                {/* {artist.images.length ? <img width={"20%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>} */}
                {artist.name}
            </div>
        ))
    }

    const spotifyLogout = () => {
        setSpotifyToken('')
        window.localStorage.removeItem("token")
    }

    return(
        <div>
            <h1>Search Page</h1>
            
            {spotifyToken ? 
                <div>
                    <form onSubmit={searchArtists}>
                        <label htmlFor="search">Search:</label>
                        <input 
                            type="text"
                            id="search"
                            placeholder="enter your search here"
                            onChange={e => setSearch(e.target.value)
                        }
                        />
                        <input type="submit" />
                    </form>
        
                    <h3>Search Results</h3>
                            
                    {renderArtists()}
                    
                    {artistName ?
                        <Link to={`/game/${artistId}`}><input type="button" value={`Start Game ${artistName}`} /></Link>
                        : ''
                    }
                </div>
            
            : <h1>You must be logged in to spotify</h1>
            
        }

        {!spotifyToken ?
        <button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
          to Spotify</a></button>
        : <button onClick={spotifyLogout}>Log out of Spotify</button>
        }

        </div>
    )
}
