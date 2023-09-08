import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './LoginForm.scss'

interface ApiLoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

function LoginForm () {

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
 
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
 

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
    const data: ApiLoginResponse = await response.json()
    if( data.success ) {
      if ( data.token ) localStorage.setItem('userToken', data.token);
      if ( data.token ) localStorage.setItem('loggedInUsername', username);
      setIsLoggedIn(true);
     navigate(`/quiz`); //Byta ut senare mot att skicka användaren till en annan sida
      
    } else {
      setMessage('Kunde inte logga in')
    }
  }

  return (
    <div>
      <section className='form'>
        <h2 className='form__title'>Logga in</h2>
        <input className='form__input' type="text" placeholder='Användarnamn' value={username} onChange={event => setUsername(event.target.value)} />
        <input className='form__input' type="text" placeholder='Lösenord' value={password} onChange={event => setPassword(event.target.value)} />
        <button className='form__button' onClick={handleLogin}> Logga in </button>
        <p className='form__message'>{message}</p>
      </section>
    </div>
  )
}

export default LoginForm