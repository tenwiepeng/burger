import React from "react";

import Burger from "./Burger/Burger";

import images from "../../imageList";
import styles from "./BurgerMeal.module.css";
import "./BurgerMeal.css";

const burgerMeal = (props) => {
  return (
    <div className={styles.MealContainer}>
      <div className="grid-auto">
        <div className="column">
          <div className={styles.Images}>
            <img className={styles.Fries} src={images.fries} alt="fries" />
          </div>
        </div>
        <div className="column">
          <div className="container-burger">
            <Burger
              className={styles.Burger}
              ingredients={props.ingredients}
              count={props.count}
            />
          </div>
        </div>
        <div className="column">
          <div className={styles.Images}>
            <img className={styles.Soda} src={images.soda} alt="soda" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default burgerMeal;
