import React from "react";

function Input({ label, value, handleChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        value={value}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  );
}

export default Input;
