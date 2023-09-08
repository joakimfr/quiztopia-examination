import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react'
import './ShowQuiz.scss'

interface ApiQuiz {
  questions: {
    question: string;
    answer: string;
    location: {
      longitude: string;
      latitude: string;
    };
  }[];
  username: string;
  quizId: string;
  userId: string;
}

interface ShowQuizProps {
  quizzes: ApiQuiz[];
  quizzesFromUser: ApiQuiz[]
  handleSelectQuiz: (quiz: ApiQuiz) => void; 
  handleDeleteQuiz: (quizId: string) => void;
}


function ShowQuiz ( {quizzes, quizzesFromUser, handleDeleteQuiz, handleSelectQuiz}: ShowQuizProps ) {

  const { isLoggedIn } = useAuth();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(isLoggedIn);

  useEffect(() => {
    setUserIsLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

return (
    <div className='showquiz'>
      {userIsLoggedIn && (
         <article className='showquiz__user'>
        <h2 className='showquiz__title'>Dina Quiz</h2>
        <div className='showquiz__content'>
      {quizzesFromUser.map((quiz, index) => (
          <div className='showquiz__info' key={index}>
            <h3 className='showquiz__text'>Skapat av: {quiz.username}</h3>
            <h4 className='showquiz__text'>Quizet heter: {quiz.quizId}</h4>
            <button className='showquiz__button' onClick={() => handleSelectQuiz(quiz)}>välj Quiz</button>
            <button onClick={() => handleDeleteQuiz(quiz.quizId)}>Ta bort</button>
            
          </div>
        ))}
        </div>
        </article>
      )}
      <article className='showquiz__allusers'>
        <h2 className='showquiz__title'>Användares Quiz</h2>
         <div className='showquiz__content'>
         {quizzes.map((quiz, index) => ( // Eventuellt byta ut index mot quizId för att kunna få infomration när det klickas
          <div className='showquiz__info' key={index}>
            <h3 className='showquiz__text'>Skapat av: {quiz.username}</h3>
            <h4 className='showquiz__text'>Quizet heter: {quiz.quizId}</h4>
            <button className='showquiz__button' onClick={() => handleSelectQuiz(quiz)}>Välj Quiz</button>
          </div>
        ))}
        </div>
      </article>
   
  
    </div>
  )
}

export default ShowQuiz