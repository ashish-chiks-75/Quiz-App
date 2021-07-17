import axios from "axios";
import React, { useState, useContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState({ show: false, msg: "" });
  const [showModal, setShowModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    difficulty: "easy",
    category: "sports",
  });

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const response = await axios(url);
      const data = await response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError({ show: true, msg: "please recheck all the fields" });
      }
    } catch (error) {
      setWaiting(true);
      setError({ show: true, msg: "some network problem occured" });
    }
  };

  const nextQuestion = () => {
    const newIndex = index + 1;
    if (newIndex > questions.length - 1) {
      setShowModal(true);
      return;
    }
    setIndex(newIndex);
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((old) => old + 1);
    }
    nextQuestion();
  };

  const closeModal = () => {
    setWaiting(true);
    setShowModal(false);
    setIndex(0);
    setCorrect(0);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        showModal,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
