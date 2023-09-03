import { useState } from "react"


function QuizForm() {

  const userToken = localStorage.getItem('userToken');

  console.log('Token: ',userToken)

  const [quiz, setQuiz] = useState<string>('')
  //const [question, setQuestion] = useState<string>('')
  //const [answer, setAnswer] = useState<string>('')
  
console.log(quiz)
  async function handleCreateQuiz() {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz';
  
    const headers = {
      'Authorization': `Bearer ${userToken}`, // Lägg till användartoken i förfrågningshuvudet, // måste vara userID??
      'Content-Type': 'application/json',
    };
  
    const requestBody = {
      name: quiz, 
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
          // Quiz skapat framgångsrikt, responseData.quizId innehåller det skapade quizets ID
          console.log('Quiz skapat:', responseData.quizId);
        } else {
          // Quiz-skapande misslyckades, hantera fel här om det behövs
          console.error('Quiz skapande misslyckades:', responseData.error);
        }
      } else {
        // Hantera fel här om det inte är en ok-status från servern
        console.error('Något gick fel:', response.status, responseData);
      }
    } catch (error) {
      // Hantera eventuella nätverks- eller andra fel här
      console.error('Något gick fel:', error);
    }
  }
  return (
    <div>
      <section>
        <div>
          <h2>Skapa Quiz</h2>
          <input type="text" placeholder="Namn" value={quiz} onChange={event => setQuiz(event.target.value)} />
        
          <button onClick={handleCreateQuiz}>Skapa Quiz</button>
        </div>
        <input type="text" placeholder="Fråga" />
        <input type="text" placeholder="Svar" />
        <button onClick={handleCreateQuiz}> Lägg till </button>
      </section>
    </div>
  )
}

export default QuizForm