import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Register({ currentUser, setCurrentUser, setShowForm }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    passwordConfirmation: ''
  })
  const [msg, setMsg] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (form.password === form.passwordConfirmation) {
        // remove unneeded data in the form pre-request
        delete form.passwordConfirmation
        // do the axios since the passwords match
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, form)
        // get the token from the response
        const { token } = response.data
        // set the token in local storage
        localStorage.setItem('jwt', token)
        // decode the token
        const decoded = jwt_decode(token)
        // log the user in 
        setCurrentUser(decoded)
        setShowForm(false)
      } else {
        setMsg('the two passwords you entered do not match 🥴')
      }
    } catch (err) {
      if (err.response.status === 409) {
        setMsg(err.response.data.msg)
      } else {
        console.log(err)
      }
    }
  }

  return (
    <div>

      <p>{msg}</p>

      <form className='center' onSubmit={handleSubmit}>
        <br />
        <h4 style={{ color: 'white' }}>Register a new account</h4>
        <br />
        <div className="form-group" style={{ paddingBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder='enter your email...'
            className="form-control center"
            style={{ width: '300px' }}
          />

        </div>

        <div class="form-group" style={{ paddingBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder='enter your name...'
            className="form-control center"
            style={{ width: '300px' }}
          />

        </div>

        <div class="form-group" style={{ paddingBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder='enter your password...'
            className="form-control center"
            style={{ width: '300px' }}
          />

        </div>
        <div class="form-group" style={{ paddingBottom: '10px' }}>
          <label htmlFor="passwordConfirmation">Confirm Your Password:</label>
          <input
            type="password"
            id="passwordConfirmation"
            value={form.passwordConfirmation}
            onChange={e => setForm({ ...form, passwordConfirmation: e.target.value })}
            placeholder='re-enter your password...'
            className="form-control center"
            style={{ width: '300px' }}
          />

        </div>

        <input className="btn  btn-game-choices m-3 mx-5 btn-md btn-primary container-mini" style={{ padding: '5px 10px' }} type="submit" />
      </form>
    </div>
  )
}