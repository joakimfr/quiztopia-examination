import './ShowQuiz.scss'

function ShowQuiz () {

  async function handleGetQuiz () {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'


  }


  return (
    <div className='showQuiz'>
      <section className='showQuiz__container'>
        <h2 className='showQuiz__title'>Tillängliga Quiz</h2>
        <button onClick={handleGetQuiz}>Visa quiz</button>  
      </section>
    </div>
  )
}

export default ShowQuiz