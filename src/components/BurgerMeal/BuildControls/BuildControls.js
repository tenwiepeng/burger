import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";
import "./BuildControls.css";
import Button from "react-bootstrap/Button";

const meatControls = [
  { label: "Beef - Patty", item: "pattyBeef", type: "meat" },
  { label: "Pork - Patty", item: "pattyPork", type: "meat" },
  { label: "Pork - Fried", item: "porkFried", type: "meat" },
  { label: "Chicken - Fried", item: "chickenFried", type: "meat" },
  { label: "Chicken - Grilled", item: "chickenGrilled", type: "meat" },
  { label: "Fish - Fillet", item: "fishFillet", type: "meat" },
  { label: "Fish - Fried", item: "fishFried", type: "meat" },
  { label: "Egg", item: "egg", type: "meat" },
  { label: "Ham", item: "ham", type: "meat" },
];
const cheeseControls = [
  { label: "American", item: "cheeseAmerican", type: "cheese" },
  { label: "Cheddar", item: "cheeseCheddar", type: "cheese" },
  { label: "Provolone", item: "cheeseProvolone", type: "cheese" },
  { label: "Swiss", item: "cheeseSwiss", type: "cheese" },
];
const sauceControls = [
  { label: "Ketchup", item: "sauceKetchup", type: "sauce" },
  { label: "Mayo", item: "sauceMayo", type: "sauce" },
  { label: "Mustard", item: "sauceMustard", type: "sauce" },
  { label: "Relish", item: "sauceRelish", type: "sauce" },
];
const extraControls = [
  { label: "Avocado", item: "avocado", type: "extra" },
  { label: "Spinach", item: "spinach", type: "extra" },
  { label: "Tomato", item: "tomato", type: "extra" },
  { label: "Cucumber", item: "cucumber", type: "extra" },
  { label: "Lettuce", item: "lettuce", type: "extra" },
  { label: "Mushroom", item: "mushroom", type: "extra" },
  { label: "Onion - Red", item: "onionRed", type: "extra" },
  { label: "Onion - White", item: "onionWhite", type: "extra" },
  { label: "Pepper ", item: "pepper", type: "extra" },
  { label: "Pickle", item: "pickle", type: "extra" },
];

const BuildControls = (props) => {
  const [key, setKey] = useState("meat");

  return (
    <div className={styles.BuildControls}>
      <Tabs id="menu-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="bun" title="Bread">
          <BuildControl
            clickR={props.changedBun}
            clickL={props.changedBun}
            bun
            label="Bun"
          />
        </Tab>
        <Tab eventKey="meat" title="Meat">
          {meatControls.map((ctrl) => (
            <BuildControl
              clickR={() => props.ingredientAdded(ctrl.type, ctrl.item)}
              clickL={() => props.ingredientRemoved(ctrl.type, ctrl.item)}
              key={ctrl.label}
              label={ctrl.label}
              number={props.itemCounts[ctrl.item]}
            />
          ))}
        </Tab>
        <Tab eventKey="cheese" title="Cheese">
          {cheeseControls.map((ctrl) => (
            <BuildControl
              clickR={() => props.ingredientAdded(ctrl.type, ctrl.item)}
              clickL={() => props.ingredientRemoved(ctrl.type, ctrl.item)}
              key={ctrl.label}
              label={ctrl.label}
              number={props.itemCounts[ctrl.item]}
            />
          ))}
        </Tab>
        <Tab eventKey="sauce" title="Sauce">
          {sauceControls.map((ctrl) => (
            <BuildControl
              clickR={() => props.ingredientAdded(ctrl.type, ctrl.item)}
              clickL={() => props.ingredientRemoved(ctrl.type, ctrl.item)}
              key={ctrl.label}
              label={ctrl.label}
              number={props.itemCounts[ctrl.item]}
              sauce
            />
          ))}
        </Tab>
        <Tab eventKey="other" title="Other">
          {extraControls.map((ctrl) => (
            <BuildControl
              clickR={() => props.ingredientAdded(ctrl.type, ctrl.item)}
              clickL={() => props.ingredientRemoved(ctrl.type, ctrl.item)}
              key={ctrl.label}
              label={ctrl.label}
              number={props.itemCounts[ctrl.item]}
            />
          ))}
        </Tab>
      </Tabs>
      <Button
        onClick={props.ordered}
        disabled={!props.purchasable}
        variant="warning"
        id="orderButton"
      >
        ORDER NOW!
      </Button>
    </div>
  );
};

export default BuildControls;
