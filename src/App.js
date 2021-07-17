import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const { waiting, loading, questions, index, correct, nextQuestion, checkAnswer } =
    useGlobalContext();

  if (waiting) {
    return <SetupForm></SetupForm>;
  }

  if (loading) {
    return <Loading></Loading>;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers];
  const randomIndex = Math.floor(Math.random()*4)

  if (randomIndex === 3) {
    answers.push(correct_answer)
  }
  else {
    answers.push(answer[randomIndex])
    answers[randomIndex] = correct_answer
  }

  answers.
  return (
    <main>
      <Modal></Modal>
      <section className="quiz">
        <p className="correct-answers">
          Correct answers: {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className="btn-container">
            {answers.map((option, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: option }}
                  onClick={() => checkAnswer(option === correct_answer)}
                ></button>
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={() => nextQuestion()}>
          {index === questions.length - 1 ? "end quiz" : "next"}
        </button>
      </section>
    </main>
  );
}

export default App;
