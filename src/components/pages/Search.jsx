import { useState } from "react"
import { Link } from "react-router-dom"

export default function Search() {
    const [search, setSearch] = useState('')

    return(
        <div>
            <h1>Search Page</h1>
            <label htmlFor="search">Search:</label>
            <input 
                type="text"
                id="search"
                placeholder="enter your search here"
                onChange={e => setSearch(e.target.value)
            }
            />

            <h3>Search Results</h3>
            <ul>
                <li>Drake</li>
                <li>Dua Lipa</li>
                <li>Wu-Tang Clan</li>
                <li>Parquet Courts</li>
            </ul>

            <Link to="/game"><input type="button" value="Start Game" /></Link>
        </div>
    )
}