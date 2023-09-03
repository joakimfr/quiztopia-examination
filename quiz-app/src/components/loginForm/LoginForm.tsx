import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Form.scss'

interface ApiLoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}
// interface ApiAccountResponse {
// 	success: boolean;
// 	message?: string;
// 	account?: Account;
// }




function LoginForm () {

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [token, setToken] = useState<string>('')


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
    console.log('hanleLogin; ', data)
    if( data.success ) {
      if ( data.token ) localStorage.setItem('userToken', data.token);
      if ( data.token ) setToken(data.token)
      navigate(`/quiz`); //Byta ut senare mot att skicka användaren till en annan sida
      
    } else {
      setMessage('Kunde inte logga in')
    }
  }

  // async function getUserInfo () {
  //   const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/account'
  //   const settings = {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }
  //   const response = await fetch(url, settings)
  //   const data: ApiAccountResponse = await response.json()
  //   console.log(data)
  // }

  return (
    <div>
      <section className='registerForm'>
        <h2 className='registerForm__hl'>Logga in</h2>
        <input type="text" placeholder='Lösenord' value={password} onChange={event => setPassword(event.target.value)} />
        <input type="text" placeholder='Användarnamn' value={username} onChange={event => setUsername(event.target.value)} />
        <button onClick={handleLogin}> Logga in </button>
        <p>{message}</p>
      </section>
    </div>
  )
}

export default LoginForm