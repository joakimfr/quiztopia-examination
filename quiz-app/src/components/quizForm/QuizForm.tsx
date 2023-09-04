import { useState } from "react"


function QuizForm() {

  const userToken = localStorage.getItem('userToken');

  

  const [quizName, setQuizName] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  
console.log(quizName)

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
  
      if (response.ok) {
        if (responseData.success) {
        
          console.log('Quiz skapat:', responseData.quizId);
        } 
         
      }
    } catch (error) {
     
      console.error('Något gick fel:', error);
    }
  }

 async function handleCreateQustion () {
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
      longitude: '57',
      latitude: '62'
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


  }


  return (
    <div>
      <section>
        <div>
          <h2>Skapa Quiz</h2>
          <input type="text" placeholder="Namn" value={quizName} onChange={event => setQuizName(event.target.value)} />
        
          <button onClick={handleCreateQuiz}>Skapa Quiz</button>
        </div>
        <input type="text" placeholder="Fråga" value={question} onChange={event => setQuestion(event.target.value)} />
        <input type="text" placeholder="Svar" value={answer} onChange={event => setAnswer(event.target.value)} />
        <button onClick={handleCreateQustion}> Skapa fråga </button>
      </section>
    </div>
  )
}

export default QuizForm