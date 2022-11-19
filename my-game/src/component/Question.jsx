const Question = ({ ques }) => {
  return (
    <h1 style={{ height: "100px" }}>
      Question {ques.index}: {ques.content}
    </h1>
  );
};

export default Question;
