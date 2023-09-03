import { useNavigate } from "react-router-dom"
import './Header.scss'

function Header () {
  const navigate = useNavigate();

  function handleNavigate (path: string) {
    navigate(path)
  }

  return (
    <div>
      <header className="header">
        <h2 className="header__hl">Quiztopia</h2>
        <nav className="header__nav">
          <ul className="header__ul">
            <li className="header__li" onClick={() => handleNavigate('/')}>Hem</li>
            <li className="header__li" onClick={() => handleNavigate('/login')}>Logga in</li>
            <li className="header__li" onClick={() => handleNavigate('/register')}>Registrera konto</li>
            <li className="header__li" onClick={() => handleNavigate('/quiz')}>Quiz</li>
          </ul>
        </nav>

      </header>
    </div>
  )
}

export default Header