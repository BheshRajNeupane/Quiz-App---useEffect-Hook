import { useState } from 'react';
import quizCompletedImg  from '../assets/quiz-complete.png'
import QUESTIONS from '../question.js';
import QuestionTimer from './QuestionTimer.jsx'

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

if(quizIsComplete){
    return (
        <div id="summary">
    <img src={quizCompletedImg} alt="Trophy icon"  />
    <h2>Quiz Completed !</h2>
    </div>
    )
}

const shuffledAnswers = [ ...QUESTIONS[activeQuestionIndex].answers]
shuffledAnswers.sort(()=> Math.random() - 0.5);


  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  return (
    <div id="quiz">
      <div id="question">
        {/* if timeout -> skip QN-> set ans  NULL */}
        <QuestionTimer
        timeout={10000}
        onTimeout={()=>handleSelectAnswer(null) }
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {
          shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}                 