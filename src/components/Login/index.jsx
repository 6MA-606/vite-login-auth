import { useState } from 'react'
import PropTypes from 'prop-types'

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await loginUser({
      username,
      password,
    })
    setToken(token)
  }

  return (
    <div className='min-h-screen h-auto flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-semibold my-5'>Please Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div className='input username flex flex-col'>
          <label htmlFor='username' className='text-xs font-semibold mb-1'>
            Username
          </label>
          <input
            className='rounded border-2 p-2'
            type='text'
            placeholder='Username'
            id='username'
            onInput={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input password flex flex-col'>
          <label htmlFor='password' className='text-xs font-semibold mb-1'>
            Password
          </label>
          <input
            className='rounded border-2 p-2'
            type='password'
            placeholder='Password'
            id='password'
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className='border-2 py-1 px-4 rounded font-semibold my-2'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}
