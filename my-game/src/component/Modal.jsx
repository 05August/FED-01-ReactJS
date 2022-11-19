import React, { useState } from "react";

const Modal = ({ handleClick }) => {
  const [value, setValue] = useState("");
  return (
    <div className="modal">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button type="button" onClick={() => handleClick(value)}>
        Play
      </button>
    </div>
  );
};

export default Modal;
