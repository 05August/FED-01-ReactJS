const Answer = ({ answerOption, handleClickAnswer }) => {
  return (
    <div className={answerOption.content === "" ? "hide" : ""}>
      <div
        onClick={(e) => {
          handleClickAnswer(answerOption.option, e);
        }}
      >
        {answerOption.option}){answerOption.content}
      </div>
    </div>
  );
};

export default Answer;
