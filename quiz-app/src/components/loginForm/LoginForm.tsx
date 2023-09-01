import { useState } from 'react'
import './Form.scss'

function LoginForm () {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function handleLogin () {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login'
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    const response = await fetch(url, settings)
    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <section className='registerForm'>
        <h2 className='registerForm__hl'>Skapa konto</h2>
        <input type="text" placeholder='Lösenord' value={password} onChange={event => setPassword(event.target.value)} />
        <input type="text" placeholder='Användarnamn' value={username} onChange={event => setUsername(event.target.value)} />
        <button onClick={handleLogin}> Skapa konto </button>
      </section>
    </div>
  )
}

export default LoginForm