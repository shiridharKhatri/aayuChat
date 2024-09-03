import React from "react";

export default function Buttonloader(props) {
  return (
    <div className="buttonLoader" style={{ "--clr": props.color }}>
      <div className="spinner">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
