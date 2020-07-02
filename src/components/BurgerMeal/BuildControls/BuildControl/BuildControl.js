import React from "react";

import Button from "react-bootstrap/Button";
import styles from "./BuildControl.module.css";
import "./BuildControl.css";

const BuildControl = (props) => {
  let leftButton = "−";
  let rightButton = "+";

  let leftId = "button-l";
  let rightId = "button-r";
  let disabled = props.number <= 0;
  let disabledSauce = null;

  if (props.bun) {
    leftButton = "<";
    rightButton = ">";
    leftId = "bread-l";
    rightId = "bread";
  } else if (props.sauce) {
    //if each has 1, disable more
    disabledSauce = props.number >= 1;
  }

  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <Button
        onClick={props.clickL}
        id={leftId}
        variant="success"
        disabled={disabled}
      >
        {leftButton}
      </Button>
      <div id="count">{props.number}</div>
      <Button
        onClick={props.clickR}
        id={rightId}
        variant="success"
        disabled={disabledSauce}
      >
        {rightButton}
      </Button>
    </div>
  );
};

export default BuildControl;
