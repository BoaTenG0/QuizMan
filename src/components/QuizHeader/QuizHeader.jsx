const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formartedTime = `${String(minutes).padStart(2, "0")}: ${String(
    remainingSeconds
  ).padStart(2, "0")}`;
  return formartedTime;
};

const QuizHeader = ({ timer }) => {
  return (
    <div className='shadow-sm my-5 py-2 sticky top-0 bg-white z-10'>
      <div className='w-9/12 mx-auto flex flex-col md:flex-row justify-between items-center'>
        <div className='text-xs'>
          <p>Attention! You have 60 seconds to answer 6 questions.</p>
          <p>
            Please keep an eye on the timer and make sure to answer all
            questions before time runs out
          </p>
        </div>

        {/* timer */}
        <div>
          <h1 className='text-xl text-customGreen'>{formatTime(timer)}</h1>
          <p>Time Consumed</p>
        </div>
      </div>
    </div>
  );
};
export default QuizHeader;
