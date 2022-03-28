import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Search({ spotifyToken }) {
    const [search, setSearch] = useState('')
    const [artists, setArtists] = useState([])
    const [artistId, setArtistId] = useState('')
    const [name, setName] = useState('')

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
        setName(name)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id} onClick={()=>handleArtistClick(artist.id, artist.name)}>
                {/* {artist.images.length ? <img width={"20%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>} */}
                {artist.name}
            </div>
        ))
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
        
                    <Link to={`/game/${artistId}`}><input type="button" value={`Start Game ${name}`} /></Link>
                </div>
            
            : <h1>You must be logged in to spotify</h1>}

        </div>
    )
}
