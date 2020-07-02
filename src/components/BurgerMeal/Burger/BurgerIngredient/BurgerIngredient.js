import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";

import styles from "./BurgerIngredient.module.css";
import images from "../../../../imageList";

const BurgerIngredient = (props) => {
  const imgRef = useRef(null);

  const getEl = useCallback(
    () => document.querySelector(".container-burger"),
    []
  );

  const isLoaded = () => {
    if (imgRef.current && imgRef.current.complete) {
      const el = getEl();
      if (el.scrollTop <= 100) {
        el.scroll({ top: 600 });
      }
    }
  };

  return (
    <div className={styles.BurgerIngredient} style={props.style}>
      <img
        src={images[props.type]}
        alt={props.type}
        onLoad={isLoaded}
        ref={imgRef}
      />
    </div>
  );
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
