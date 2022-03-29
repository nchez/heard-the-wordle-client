import { BsFillPlayCircleFill } from 'react-icons/bs'
import { BsFillPauseCircleFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import EndGame from '../EndGame'

export default function Game({ token, currentUser }) {
    const { id } = useParams()

    const [choices, setChoices] = useState([]) // tracks' name and song
    const [audio, setAudio] = useState({
        name: '',
        sound: null,
        isPlayed: false
    })
    const [btnChoice, setBtnChoice] = useState([]) //button choices max 4
    const [rounds, setRounds] = useState(1)
    const [score, setScore] = useState(0)

    useEffect(() => {
        // const something = async () => {
        (async () => {
            try {
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
                console.log(response.data.tracks[0].artists[0].name)
                for (let i = 0; i < response.data.tracks.length; i++) {
                    audioData.push({ name: response.data.tracks[i].name, song: response.data.tracks[i].preview_url })
                }
                //saving the tracks' data to a state
                setChoices(audioData) //tracks' name and url

                // console.log('trial', choices[0].song)

                // // saving the urls to an array
                // const trackUrl = audioData.map(element => {
                //     return element.song
                // })
                // setSound(trackUrl) // saving the urls in a state
                // console.log('after setting sound', sound)

            } catch (error) {
                console.log(error)
            }
        })()
        // }
    }, [])

    const loadAudio = () => {
        if (audio.sound != null) {
            if (audio.isPlayed) {
                audio.sound.pause()
                setAudio({ ...audio, sound: null, isPlayed: false, name: '' })
            } else
                setAudio({ ...audio, sound: null, isPlayed: false, name: '' })
        } else {

            const rand = Math.floor(Math.random() * choices.length)
            const prevSong = choices[rand].song
            const prevName = choices[rand].name
            console.log('tracks name', prevName)
            console.log('tracks name', prevSong)
            setAudio({ ...audio, name: prevName, sound: new Audio(prevSong) })//assigning a random song from the top 10 
            // setAudio({ ...audio, name: prevName })
            console.log('after setting audio', audio)
            // randomChoices()
        }
    }
    useEffect(() => {
        const btnChoices = []
        const rando = Math.floor(Math.random() * btnChoice.length)

        const correctAnswer = audio.name
        console.log('correct', audio.name)

        console.log('before while', btnChoices.length)
        // will create 4 randomized choices
        if (choices.length != 0) {
            while (btnChoices.length != 4) {
                const rand = Math.floor(Math.random() * choices.length)
                if (!btnChoices.includes(choices[rand].name)) {
                    btnChoices.push(choices[rand].name)
                }
            }
        }

        console.log('after while', btnChoices.length)
        console.log('current', audio.name)
        console.log('before', btnChoices)
        if (!btnChoices.includes(correctAnswer)) {
            btnChoices.splice(rando, 1, correctAnswer)
            console.log('after', btnChoices)
        }
        setBtnChoice(btnChoices)
        console.log('this is the inside of the audio state', audio)
    }, [audio.sound])


    // function randomChoices() { //creates random choices
    //     const btnChoices = []
    //     const rando = Math.floor(Math.random() * btnChoice.length)

    //     const correctAnswer = audio.name
    //     console.log('correct', audio.name)

    //     console.log('before while', btnChoices.length)
    //     // will create 4 randomized choices
    //     while (btnChoices.length != 4) {
    //         const rand = Math.floor(Math.random() * choices.length)
    //         if (!btnChoices.includes(choices[rand].name)) {
    //             btnChoices.push(choices[rand].name)
    //         }
    //     }
    //     console.log('after while', btnChoices.length)
    //     console.log('current', audio.name)
    //     console.log('before', btnChoices)
    //     if (!btnChoices.includes(audio.name)) {
    //         btnChoices.splice(rando, 1, audio.name)
    //         console.log('after', btnChoices)
    //     }
    //     setBtnChoice(btnChoices)
    // }

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

    const userChoice = btnChoice.map(name => {
        return (
            <>
                <li><button value={name} onClick={() => checkAnswer(name)}>{name}</button></li>
            </>
        )
    })

    const checkAnswer = (answer) => {
        // const prev = rounds
        if (answer === audio.name) {
            setRounds(rounds + 1)
            setScore(score + 1)
            console.log(true)
            loadAudio()
        }
        else {
            console.log(false)
            setRounds(rounds + 1)
            loadAudio()
        }
        // console.log(e.song)
        // console.log(audio.sound.src)
    }
    return (
        <div>
            {rounds > 5 ? <EndGame score={score} artistId={id} currentUser={currentUser}/> :
                <>
                    <h2>Game Page</h2>
                    <h3>Round {rounds} of 5</h3>
                    <h3>Score: {score}</h3>
                    <div className="audio-widget">
                        <button onClick={handleClick}>
                            {!audio.isPlayed ? <BsFillPlayCircleFill /> : <BsFillPauseCircleFill />}
                        </button>
                    </div>
                    {/* <h5>Timer: 30 seconds</h5> */}
                    <button onClick={loadAudio}>Load</button>
                    <h3>Listen to the track and choose your answer</h3>

                    <ul>
                        {audio.sound != null ? userChoice : ''}
                    </ul>
                </>
            }
        </div>
    )
}
