import "./App.css";
import React, { useState } from "react";
import Question from "./component/Question.jsx";
import Help from "./component/Help.jsx";
import Answer from "./component/Answer";
import { listQuestion, correctAnswer } from "./constant";

function App() {
  const [answer, setAnswer] = useState();
  const [isLost, setIsLost] = useState(false);
  const [isSelectSkip, setIsSelectSkip] = useState(false);
  const [isSelectHide, setIsSelectHide] = useState(false);

  const [indexQuestion, setIndexQuestion] = useState(0);

  const handleClickButtonSkip = () => {
    alert("bạn đã sử dụng quyền trợ giúp skip");
    setIsSelectSkip(true);
    setIndexQuestion(indexQuestion + 1);
  };
  const handleClickButtonRemove = () => {
    alert("bạn đã sử dụng quyền trợ giúp hide");
    const listOptionWrong = ["A", "B", "C", "D"].filter(
      (value) => value !== correctAnswer[indexQuestion]
    );
    listQuestion[indexQuestion].answer = listQuestion[indexQuestion].answer.map(
      (item) => {
        if (item.option === listOptionWrong[0] || item.option === listOptionWrong[2]) {
          item.content = "";
        }
        return { option: item.option, content: item.content };
      }
    );
    setIsSelectHide(true);
  };
  const handleClickAnswer = (answerUserSelect, e) => {
    const active = document.querySelector(".answer-select");
    if (active) {
      active.classList.remove("answer-select");
    }

    setAnswer(answerUserSelect);
    e.target.classList.add("answer-select");
  };
  const handleSubmit = () => {
    if (answer) {
      if (answer === correctAnswer[indexQuestion]) {
        if (indexQuestion === 9) {
          alert("xin chúc mừng bạn đã chiến thắng trò chơi.");
          return setIsLost(true);
        }
        alert("xin chúc mừng bạn đã trả lời đúng");
        setIndexQuestion(indexQuestion + 1);
        setAnswer();
        document.querySelector(".answer-select").classList.remove("answer-select");
        if (indexQuestion === 9) {
          setIsSelectSkip(true);
          setIsSelectHide(true);
        }
      } else {
        alert("Rất tiếc bạn đã trả lời sai, vui lòng allin sổ đỏ và F5 để đặt cược.");
        setIsLost(true);
      }
    } else {
      alert("vui lòng chọn đáp án đê");
    }
  };

  const renderAnswer = () => {
    let index = -1;
    return listQuestion[indexQuestion].answer.map((answer) => {
      index++;
      return (
        <Answer
          key={answer.option}
          handleClickAnswer={handleClickAnswer}
          answerOption={listQuestion[indexQuestion].answer[index]}
        />
      );
    });
  };

  return (
    <div className="App">
      <h1>Who is a Millionaire</h1>
      <div className="help-container">
        <Help
          handleClick={handleClickButtonSkip}
          content="Skip the question"
          isSelect={isSelectSkip}
        ></Help>
        <Help
          handleClick={handleClickButtonRemove}
          content="Hide 2 wrong answers"
          isSelect={isSelectHide}
        ></Help>
      </div>
      <Question
        ques={{ index: indexQuestion + 1, content: listQuestion[indexQuestion].content }}
      />
      <div className="answer-container">{renderAnswer()}</div>

      <div className="button-submit">
        <div
          onClick={isLost ? () => {} : handleSubmit}
          style={{ cursor: isLost ? "not-allowed" : "pointer" }}
        >
          CHECK
        </div>
      </div>
    </div>
  );
}

export default App;
