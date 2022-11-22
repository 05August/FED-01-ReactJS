import "./App.css";
import React, { useState, useContext, useEffect } from "react";
import Question from "./component/Question.jsx";
import Help from "./component/Help.jsx";
import Answer from "./component/Answer";
import { correctAnswer } from "./constant/constant";
import FeatureContext from "./context/FeatureContext";
import clientServer from "./server/clientServer";
import Modal from "./component/Modal.jsx";
import { getRandomInt } from "./function/getRandomInt";

function App() {
  const [answer, setAnswer] = useState();
  const [isLost, setIsLost] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [userName, setUserName] = useState("");
  const [usedQuestionList, setUsedQuestionList] = useState([]);
  const [isSelectSkip, setIsSelectSkip] = useState(false);
  const [isSelectHide, setIsSelectHide] = useState(false);
  const [listQuestion, setListQuestion] = useState([
    {
      content: "",
      answer: [],
    },
  ]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    clientServer
      .get("listQuestion")
      .then((res) => {
        const listItem = res.data;
        setListQuestion(listItem);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  }, []);

  const alert = useContext(FeatureContext);
  const handleClickButtonSkip = () => {
    alert.success("bạn đã sử dụng quyền trợ giúp skip");
    setIsSelectSkip(true);
    if (usedQuestionList.length === 8) {
      setIsSelectHide(true);
    }
    do {
      var randomIndexQuestion = getRandomInt(9);
    } while (usedQuestionList.includes(randomIndexQuestion));
    setIndexQuestion(randomIndexQuestion);
    setUsedQuestionList([...usedQuestionList, randomIndexQuestion]);
    setIndex(index + 1);
  };
  const handleClickButtonRemove = () => {
    alert.success("bạn đã sử dụng quyền trợ giúp hide");
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
        if (usedQuestionList.length === 9) {
          alert.success(`xin chúc mừng bạn ${userName} đã chiến thắng trò chơi.`);
          return setIsLost(true);
        }
        if (usedQuestionList.length === 8) {
          setIsSelectSkip(true);
          setIsSelectHide(true);
        }
        alert.success(`xin chúc mừng bạn ${userName} đã trả lời đúng`);
        do {
          var randomIndexQuestion = getRandomInt(9);
        } while (usedQuestionList.includes(randomIndexQuestion));
        setIndexQuestion(randomIndexQuestion);
        setUsedQuestionList([...usedQuestionList, randomIndexQuestion]);
        setIndex(index + 1);
        setAnswer();
        document.querySelector(".answer-select").classList.remove("answer-select");
      } else {
        alert.success(
          `Rất tiếc bạn ${userName} đã trả lời sai và dừng lại ở vị trí ${indexQuestion} câu trả lời đúng, vui lòng allin sổ đỏ và F5 để đặt cược.`
        );
        setIsLost(true);
      }
    } else {
      alert.success("vui lòng chọn đáp án đê");
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

  const handleSubmitModal = (userNameInput) => {
    const regex = /^([a-z]{5,10})*$/g;
    if (regex.test(userNameInput)) {
      setUserName(userNameInput);
      setIsPlay(true);
      alert.success(`Chào mùng bạn ${userNameInput} đến với ai là triệu phú.`);
    } else {
      alert.error("Tên bạn nhập chưa phù hợp,vui lòng nhập lại");
    }
  };

  return (
    <div className="App">
      {isPlay ? (
        <>
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
            ques={{
              index: index,
              content: listQuestion[indexQuestion].content,
            }}
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
        </>
      ) : (
        <Modal handleSubmit={handleSubmitModal} />
      )}
    </div>
  );
}

export default App;
