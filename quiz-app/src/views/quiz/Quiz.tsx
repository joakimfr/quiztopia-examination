import { useState } from "react"
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
  const [selectedQuiz, setSelectedQuiz] = useState<ApiQuiz | null>(null)
  
  console.log(selectedQuiz)
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

  const handleSelectQuiz = (quiz: ApiQuiz) => {
    setSelectedQuiz(quiz);
  };



  return (
    <div>
      <Header />
      <QuizForm  />
      <MapBox selectedQuiz={selectedQuiz}/>
      <ShowQuiz quizzes={quizzes} handleGetQuiz={handleGetQuiz} handleSelectQuiz={handleSelectQuiz} />
    </div>
  )

}

export default Quiz