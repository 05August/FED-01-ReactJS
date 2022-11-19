const Answer = ({ answerOption, handleClickAnswer }) => {
  return (
    <div
      onClick={(e) => {
        handleClickAnswer(answerOption.option, e);
      }}
    >
      {answerOption.option}){answerOption.content}
    </div>
  );
};

export default Answer;
