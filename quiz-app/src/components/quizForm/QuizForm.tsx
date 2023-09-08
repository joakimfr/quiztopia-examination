import './QuizForm.scss'
import { useState } from "react"
import { useAuth } from '../../hooks/useAuth';


interface LatAndLngProps {
  clickedLat: string;
  clickedLng: string;
  handleGetUserQuiz: () => void;
}

function QuizForm({clickedLat, clickedLng, handleGetUserQuiz}: LatAndLngProps) {
  
  const { isLoggedIn } = useAuth();
  const userToken = localStorage.getItem('userToken');
  const [quizName, setQuizName] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [quizCreated, setQuizCreated] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')
  
  if (!isLoggedIn) {
    return null; // Returnera null när ingen är inloggad för att inte rendera komponenten
  }

  async function handleCreateQuiz() {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz';
  
    const headers = {
      'Authorization': `Bearer ${userToken}`, 
      'Content-Type': 'application/json',
    };
  
    const requestBody = {
      name: quizName, 
    };
  
    const settings = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody), 
    };
  
    try {
      const response = await fetch(url, settings);
      const responseData = await response.json();
  
     if (responseData.success) {
        
          console.log('Quiz skapat:', responseData.quizId);
          setQuizCreated(true);
        } 
      } catch (error) {
          console.error('Något gick fel:', error);
      }};

 async function handleCreateQustion () {

  if (!quizCreated) {
    setMessage('Skapa först quiz');
    return;
  }

  if (!quizName || !question || !answer || !clickedLat || !clickedLng) {
    setMessage('Fyll i alla fält samt välj en position på kartan')
    return;
  }   

  const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question';

  const headers = {
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json',
  };

  const requestBody = {
    name: quizName,
    question: question,
    answer: answer,
    location: {
      longitude: clickedLng,
      latitude: clickedLat,
    }
  };

  const settings = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody),
  }

  const response = await fetch(url, settings);
  const responseData = await response.json();
  console.log(responseData)
  if (responseData) {
    setMessage('Fråga skapad')
    handleGetUserQuiz();
    setQuestion('')
    setAnswer('')
  }
}


  return (
    <div>
      <section className='quizform'>
        <h2 className='quizform__title'>Skapa Quiz</h2>
        <div className='quizform__quiz'>
          
          <input className='quizform__input' type="text" placeholder="Namn" value={quizName} onChange={event => setQuizName(event.target.value)} />
          <button className='quizform__button' onClick={handleCreateQuiz}>Skapa Quiz</button>
        </div>

        
        <div className='quizform__question'>
          <input className='quizform__input' type="text" placeholder="Fråga" value={question} onChange={event => setQuestion(event.target.value)} />
          <input className='quizform__input' type="text" placeholder="Svar" value={answer} onChange={event => setAnswer(event.target.value)} />
          <button className='quizform__button block' onClick={handleCreateQustion}> Skapa fråga </button>
          <p className='quizform__message'>{message}</p>
        </div>
     
      </section>
    </div>
  )
}

export default QuizForm