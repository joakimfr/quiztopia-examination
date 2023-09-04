import { useState } from 'react';
import MapBox from '../mapBox/MapBox';
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
  handleGetQuiz: () => void; 
  handleSelectQuiz: (quiz: ApiQuiz) => void; 
}


function ShowQuiz ( {quizzes, handleGetQuiz, handleSelectQuiz}: ShowQuizProps ) {
//console.log(quizzes)
  


  return (
    <div className='showQuiz'>
      <section className='showQuiz__container'>
        <h2 className='showQuiz__title'>Tillängliga Quiz</h2>
        <button onClick={handleGetQuiz}>Visa quiz</button>  

              
               {quizzes.map((quiz, index) => ( // Eventuellt byta ut index mot quizId för att kunna få infomration när det klickas
          <div key={index}>
            <h3>Skapat av: {quiz.username}</h3>
            <h4>Quizet heter: {quiz.quizId}</h4>
            <button onClick={() => handleSelectQuiz(quiz)}>Välj Quiz</button>
          </div>
        ))}

      </section>
  
    </div>
  )
}

export default ShowQuiz