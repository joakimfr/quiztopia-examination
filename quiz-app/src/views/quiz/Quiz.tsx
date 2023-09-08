import { useState, useEffect } from "react"
import './Quiz.scss'
import Header from "../../components/header/Header"
import QuizForm from "../../components/quizForm/QuizForm"
import MapBox from "../../components/mapBox/MapBox"
import ShowQuiz from "../../components/showQuiz/ShowQuiz"

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

function Quiz () {

  const [quizzes, setQuizzes] = useState<ApiQuiz[]>([]);
  const [quizzesFromUser, setQuizzesFromUser] = useState<ApiQuiz[]>([])
  const [selectedQuiz, setSelectedQuiz] = useState<ApiQuiz | null>(null)
  const [clickedLat, setClickedLat] = useState<string>('')
  const [clickedLng, setClickedLng] = useState<string>('')

  const handleMapClick = (position: [number, number]) => {
    setClickedLat(position[1].toString())
    setClickedLng(position[0].toString())
  }

  useEffect(() => {
   async function handleGetQuiz() {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz';
  
    const response = await fetch(url);
    const data: ApiQuizResponse = await response.json();
  
    if (data.success) {
     
      const filteredQuizzes = data.quizzes.filter((quiz) =>
        quiz.questions.every((question) =>
          question.location &&
          !isNaN(parseFloat(question.location.latitude)) &&
          !isNaN(parseFloat(question.location.longitude))
        )
      );
      setQuizzes(filteredQuizzes);
    } else {
      console.log('Kunde inte hämta data');
    }
  }
  handleGetQuiz();
}, []);


  async function handleGetUserQuiz() {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz';

    const response = await fetch(url);
    const data: ApiQuizResponse = await response.json();

    if (data.success) {
      const username = localStorage.getItem('loggedInUsername'); 
      const userQuizzes = data.quizzes.filter((quiz) => quiz.username === username);

      const filteredUserQuizzes = userQuizzes.filter((quiz) =>
        quiz.questions.every((question) =>
          question.location &&
          !isNaN(parseFloat(question.location.latitude)) &&
          !isNaN(parseFloat(question.location.longitude))
        )
      );
      
      setQuizzesFromUser(filteredUserQuizzes);
    } else {
      console.log('Kunde inte hämta data');
    }
  }
  

  useEffect(() => {
    handleGetUserQuiz();
}, []);

async function handleDeleteQuiz(quizId: string) {
  try {
    const userToken = localStorage.getItem('userToken'); 
    const headers = {
      'Authorization': `Bearer ${userToken}`, 
      'Content-Type': 'application/json',
    };

    const url = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${quizId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers, 
    });

    if (response.ok) {
     
      const updatedQuizzesFromUser = quizzesFromUser.filter((quiz) => quiz.quizId !== quizId);
      setQuizzesFromUser(updatedQuizzesFromUser);
    } else {
      console.error('Kunde inte ta bort quizet.');
    }
  } catch (error) {
    console.error('Ett fel uppstod vid borttagning av quiz:', error);
  }
}  

const handleSelectQuiz = (quiz: ApiQuiz) => { //funktion som hämtar det klickade quizet från showquiz
    setSelectedQuiz(quiz);
  };

  return (
    <div className="quiz">
      <Header />
    <section className="quiz__container">
      <article className="quiz__left">
        <QuizForm 
        clickedLat={clickedLat} 
        clickedLng={clickedLng}
        handleGetUserQuiz={handleGetUserQuiz}
      />
        <MapBox 
          selectedQuiz={selectedQuiz} 
          handleMapClick={handleMapClick}/>
        </article>
        <article className="quiz__right">
          <ShowQuiz 
            quizzes={quizzes} 
            quizzesFromUser={quizzesFromUser} 
            handleSelectQuiz={handleSelectQuiz}
            handleDeleteQuiz={handleDeleteQuiz}
          />
        </article>
      </section>
    </div>
  )
}

export default Quiz