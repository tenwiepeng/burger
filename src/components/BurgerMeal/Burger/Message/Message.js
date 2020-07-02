import React from "react";

const Message = (props) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: "#444443",
  };
  return (
    <div style={style}>
      <h5>{props.message}</h5>
    </div>
  );
};
export default Message;
