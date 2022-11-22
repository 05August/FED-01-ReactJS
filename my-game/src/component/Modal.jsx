import React, { useState } from "react";

const Modal = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  return (
    <div className="modal">
      <h3>Nhập vào tên của bạn</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button type="button" onClick={() => handleSubmit(value)}>
        Play
      </button>
    </div>
  );
};

export default Modal;
