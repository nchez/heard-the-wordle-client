import { BsFillPlayCircleFill } from 'react-icons/bs'
import { BsFillPauseCircleFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Game({ token }) {
    const { id } = useParams()

    const [choices, setChoices] = useState([]) // tracks' name and song
    const [sound, setSound] = useState([]) // tracks
    const [audio, setAudio] = useState({
        sound: null,
        isPlayed: false
    })
    const [btnChoice, setBtnChoice] = useState([])

    useEffect(() => {
        // const something = async () => {
        (async () => {
            console.log('outside try')
            try {
                console.log('inside try')
                // accessing the api to get the top-tracks of the artist(id)
                const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        market: 'US'
                    }
                })
                // array for storing the tracks' name and track_url
                const audioData = []
                console.log('before audio data gets populated', audioData)
                for (let i = 0; i < response.data.tracks.length; i++) {
                    audioData.push({ name: response.data.tracks[i].name, song: response.data.tracks[i].preview_url })
                }
                console.log('after audio data gets populated', audioData)
                //saving the tracks' data to a state
                setChoices(audioData) //tracks' name and url

                console.log('before setting sound', sound)
                // saving the urls to an array
                const trackUrl = audioData.map(element => {
                    return element.song
                })
                setSound({ ...sound, trackUrl }) // saving the urls in a state
                console.log('after setting sound', sound)

            } catch (error) {
                console.log(error)
            }

        })()
        // }
    }, [audio])

    const loadAudio = () => {
        const rand = Math.floor(Math.random() * sound.trackUrl.length)
        console.log('rand num', rand)
        console.log('before setting audio', audio)
        const prev = sound.trackUrl[rand]
        setAudio({ ...audio, sound: new Audio(prev) })//assigning a random song from the top 10 
        console.log('after setting audio', audio)
        randomChoices()
    }

    const handleClick = () => {
        console.log('click')
        const prev = audio.isPlayed
        if (audio.sound != null) {
            if (audio.isPlayed) {
                audio.sound.pause()
                setAudio({ ...audio, isPlayed: !prev })
            }
            else {
                audio.sound.play()
                setAudio({ ...audio, isPlayed: !prev })
            }
        }
    }

    function randomChoices() {
        const btnChoice = []
        const rando = Math.floor(Math.random() * btnChoice.length)
        const correctAnswer = choices[0]
        while (btnChoice.length != 4) {
            const rand = Math.floor(Math.random() * choices.length)
            if (!btnChoice.includes(choices[rand])) {
                btnChoice.push(choices[rand])
            }
        }
        console.log('before', btnChoice)
        if (!btnChoice.includes(correctAnswer)) {
            btnChoice.splice(rando, 1, correctAnswer)
            console.log('after', btnChoice)

        }
        setBtnChoice(btnChoice)
    }
    const userChoice = btnChoice.map(e => {
        return (
            <>
                <li><button value={e.name}>{e.name}</button></li>
            </>
        )
    })
    return (
        <div>
            <h2>Game Page</h2>
            <div className="audio-widget">
                <button onClick={handleClick}>
                    {!audio.isPlayed ? <BsFillPlayCircleFill /> : <BsFillPauseCircleFill />}
                </button>
            </div>
            {/* <h5>Timer: 30 seconds</h5> */}
            <button onClick={loadAudio}>Load</button>
            <h3>Listen to the track and choose your answer</h3>

            <ul>
                {userChoice}
            </ul>
        </div>
    )
}
