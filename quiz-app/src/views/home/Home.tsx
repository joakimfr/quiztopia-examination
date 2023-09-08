import Header from "../../components/header/Header"
import { useNavigate } from "react-router-dom"
import './Home.scss'

function Home() {

  const navigate = useNavigate();
  function handleNavigate (path: string) {
    navigate(path)
  }

  return (
    <div className="home">
      <Header />
      <section className="home__section">
        <h1 className="home__title">Välkommen till Quiztopia - Utforska städer genom frågor!</h1>
        <p className="home__describe">Upptäck en ny sätt att utforska städer med vår interaktiva app. Besvara frågor baserat på din plats och fånga kunskap med varje steg du tar. Börja din äventyrliga resa nu!</p>
      <div className="home__container">
        <div className="home__buttons" onClick={() => handleNavigate('/login')}>
          <p className="home__text">Logga in för att kunna skapa quiz</p>
          <button className="home__button">Logga in</button>
        </div>
        <div className="home__buttons">
          <p className="home__text">Skapa konto för att kunna logga in</p>
        <button className="home__button" onClick={() => handleNavigate('/register')}>Skapa Konto</button>
        </div>
        <div className="home__buttons">
          <p className="home__text">Spela quiz utan att logga in</p>
          <button className="home__button" onClick={() => handleNavigate('/quiz')}>Spela Quiz</button>
        </div>
      </div>
      </section>
      
    </div>
  )
}

export default Home