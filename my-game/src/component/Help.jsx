const Help = ({ content, handleClick, isSelect }) => {
  return (
    <div
      style={{ height: "30px", width: "200px", border: "2px solid" }}
      className={isSelect ? "hide" : ""}
    >
      <div
        style={{
          height: "30px",
          width: "200px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {content}
      </div>
    </div>
  );
};

export default Help;
