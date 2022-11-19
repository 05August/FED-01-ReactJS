const Help = ({ content, handleClick, isSelect }) => {
  return (
    <div
      style={{
        height: "30px",
        width: "200px",
        border: "2px solid",
        cursor: isSelect ? "not-allowed" : "pointer",
        display: isSelect ? "none" : "block",
      }}
      onClick={isSelect === false ? handleClick : () => {}}
    >
      {content}
    </div>
  );
};

export default Help;
