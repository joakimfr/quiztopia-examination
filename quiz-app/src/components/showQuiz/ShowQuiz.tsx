import { useState } from 'react';
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

interface ApiQuizResponse {
  success: boolean;
  quizzes: ApiQuiz[];
}


function ShowQuiz () {

  const [quizzes, setQuizzes] = useState<ApiQuiz[]>([]);

console.log(quizzes)

  async function handleGetQuiz () {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'

    const response = await fetch(url)
    const data: ApiQuizResponse = await response.json();
    
    if ( data.success ) {
      setQuizzes(data.quizzes);

    } else {
      console.log('Kunde inte hämta data')
    }
  }




  return (
    <div className='showQuiz'>
      <section className='showQuiz__container'>
        <h2 className='showQuiz__title'>Tillängliga Quiz</h2>
        <button onClick={handleGetQuiz}>Visa quiz</button>  

              
               {quizzes.map((quiz, index) => ( // Eventuellt byta ut index mot quizId för att kunna få infomration när det klickas
          <div key={index}>
            <h3>Skapat av: {quiz.username}</h3>
            <h4>Quizet heter: {quiz.quizId}</h4>
          </div>
        ))}

      </section>
    </div>
  )
}

export default ShowQuiz