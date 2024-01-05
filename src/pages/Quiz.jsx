import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "../components/QuizHeader/QuizHeader";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formartedTime = `${String(minutes).padStart(2, "0")}: ${String(
    remainingSeconds
  ).padStart(2, "0")}`;
  return formartedTime;
};
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timerIntervalId, setTimerIntervalId] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  //load data
  useEffect(() => {
    fetch("/quiz.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.log(error));

    const intervalId = setInterval(() => {
      setTimer((prevTim) => prevTim - 1);
    }, 300);
    setTimerIntervalId(intervalId);
    return () => {
      clearTimeout(intervalId);
      if (timer === 0) {
        alert("Time Out");
      }
    };
  }, [timer]);

  const handleAnswers = (questionId, option) => {
    const updatedAnswers = { ...answers, [questionId]: option };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearTimeout(timerIntervalId);

    setTimeout(() => {
      const quizScore = calculateScore(answers);
      setScore(quizScore);
      const percentage = (quizScore / questions.length) * 100;
      const newStatus = percentage >= 50 ? "Passed" : "Failed";
      setStatus(newStatus);
      setShowResult(true);
      setLoading(false);
    }, 5000);
  };

  const calculateScore = (userAnswer) => {
    const correctAnswer = questions.map((question) => question.answer);
    let score = 0;
    for (const questionId in userAnswer) {
      if (userAnswer[questionId] === correctAnswer[questionId - 1]) {
        score++;
      }
    }
    return score;
  };

  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setLoading(false);
    setTimer(60);
    navigate("/quiz");
  };

  return (
    <section>
      {/* <div>Quiz header</div> */}
      <QuizHeader timer={timer} />
      <div className='md:w-9/12 w-[90%] mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start'>
        <div className='md:w-[70%] w-full text-start'>
          {questions.map((question, index) => (
            <div
              key={question.id}
              className='m-3 py-3 px-4 shadow-sm border border-gray-200 rounded'
            >
              <p className='flex items-center text-xs'>
                <span className='h-8 w-8 bg-customGreen rounded-full flex items-center justify-center mr-3'>
                  {index + 1}
                </span>
                {question.question}{" "}
              </p>

              {/* options */}
              <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 mt-5'>
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center border border-gray-200 p-2 mb-1 rounded-full text-xs cursor-pointer ${
                      answers[question.id] === option ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleAnswers(question.id, option)}
                  >
                    <span className='text-[10px]h-5 w-5 bg-customGreen rounded flex items-center justify-center mr-3'>
                      {" "}
                      {index + 1}
                    </span>
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type='submit'
            className='flex bg-customGreen px-6  py-2 text-white rounded shadow-sm'
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </div>
        {/* show answers */}
        <div className='md:w-[30%] w-full p-4'>
          {showResult && (
            <div>
              <h2 className='text-2xl font-krona'>Your score</h2>
              <div className='h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]'>
                <h3
                  className={`text-xs ${
                    status === "Passed" ? "text-green-800" : "text-red-500"
                  }`}
                >
                  {status}
                </h3>
                <h1 className='text-3xl font-bold my-2'>
                  {score * 10}
                  <span className='text-slate-800'>/60</span>
                </h1>
                <p>
                  Total Time:{" "}
                  <span>
                    {formatTime(60 - timer)} <span>sec.</span>{" "}
                  </span>
                </p>
                <button
                  onClick={restartQuiz}
                  className='bg-customGreen px-6 py-2 text-white rounded mt-10 w-full'
                >
                  Restart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Quiz;
