import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface ApiRegisterResponse {
  success: boolean;
  message?: string;
}

function RegisterForm () {

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')

async function handleCreateAccount () {
  const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'
  const settings = {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  }
  const response = await fetch(url, settings)
  const data: ApiRegisterResponse = await response.json()
  console.log(data)
  if (data.success) {
    navigate(`/quiz`)
  } else {
    setMessage('Kunde inte registrera')
  }
}

  return (
    <div>
      <section className='form'>
        <h2 className='form__title'>Skapa konto</h2>
          <input className='form__input' type="text" placeholder='Användarnamn' value={username} onChange={event => setUsername(event.target.value)} />
          <input className='form__input' type="text" placeholder='Lösenord' value={password} onChange={event => setPassword(event.target.value)} />
          <button className='form__button' onClick={handleCreateAccount}> Skapa konto </button>
          <p className='form__message'>{message}</p>
      </section>
    </div>
  )
}

export default RegisterForm