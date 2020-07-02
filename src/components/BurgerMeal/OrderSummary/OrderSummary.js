import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "react-bootstrap/Button";
import "./OrderSummary.css";

const OrderSummary = (props) => {
  let ingredientSummary = Object.keys(props.counts).map((igKey) => {
    let inputString = igKey;
    if (igKey === "pattyBeef" || igKey === "pattyPork") {
      inputString =
        inputString.slice(5).toLowerCase() +
        inputString.slice(0, 1).toUpperCase() +
        inputString.slice(1, 5);
    }
    let newString = inputString;

    for (var i = 0; i < inputString.length; i++) {
      if (inputString[i].match(/[A-Z]/) != null) {
        newString = inputString.slice(0, i) + " - " + inputString.slice(i);
        break;
      }
    }

    return props.counts[igKey] > 0 ? (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{newString}</span>:{" "}
        {props.counts[igKey]}
      </li>
    ) : null;
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total: ${props.price}</strong>
      </p>
      <p>Continute to Checkout?</p>
      <Button className="spaced" id="button-cancel" onClick={props.cancel}>
        <span>CANCEL</span>
      </Button>
      <Button className="spaced" id="button-confirm" onClick={props.confirm}>
        <span>CONFIRM</span>
      </Button>
    </Aux>
  );
};

export default OrderSummary;
