import React, { useEffect, useState } from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";

const Burger = (props) => {
  // State Hooks
  // const [props.ingredients, setIngredients] = useState(props.props.ingredients || {});
  const [topBun, setTopBun] = useState({
    content: [],
    startOffset: 0,
    startZIndex: 1000,
    ingredientOffset: 180,
    prevOffset: 0,
  });
  // const [topBun, setTopBun] = useState({
  //   startOffset: 0,
  //   startZIndex: 1000,
  // });
  const [extra, setExtra] = useState({
    content: [],
    startOffset: 0,
    startZIndex: 1000,
    ingredientOffset: 120,
    avocadoOffset: 215,
    pickleOffset: 97,
    lettuceOffset: 210,
    spinachOffset: 232,
    mushroomOffset: 115,
  });
  const [cheese, setCheese] = useState({
    content: [],
    startOffset: 0,
    startZIndex: 1000,
    ingredientOffset: 210,
  });
  const [meat, setMeat] = useState({
    content: [],
    startOffset: 0,
    startZIndex: 1000,
    ingredientOffset: 200,
  });
  const [sauce, setSauce] = useState({
    content: [],
    startZIndex: 1000,
    ingredientOffset: 208,
  });

  // useEffect(() => {
  //   setIngredients(props.props.ingredients);
  // }, [props.props.ingredients]);

  useEffect(() => {
    if (topBun.prevOffset < topBun.startOffset) {
      const topBunStyle = {
        bottom: 0,
        visibility: "hidden",
      };
      const newTopBun = (
        <BurgerIngredient
          type={props.ingredients.seeds ? "bunSeed" : "bunPlain"}
          style={topBunStyle}
        />
      );
      setTopBun((prevTopBun) => ({
        ...prevTopBun,
        content: newTopBun,
      }));

      setTimeout(() => {
        TopBunProcessing();
      }, 300);
    } else TopBunProcessing();
  }, [props.ingredients.seeds, topBun.startOffset]);

  useEffect(() => {
    ExtraProcessing();
    setTopBun((prevTopBun) => ({
      ...prevTopBun,
      prevOffset: topBun.startOffset,
    }));
  }, [props.ingredients.extra.length, extra.startOffset]);

  useEffect(() => {
    CheeseProcessing();
  }, [props.ingredients.cheese.length, cheese.startOffset]);

  useEffect(() => {
    MeatProcessing();
  }, [props.ingredients.meat.length, meat.startOffset]);

  useEffect(() => {
    SauceProcessing();
  }, [props.ingredients.sauce.length]);

  const TopBunProcessing = () => {
    let newOffset = -topBun.ingredientOffset;
    let topBunStyle;
    if (topBun.startOffset !== 0) {
      newOffset += topBun.startOffset;
    }
    if (topBun.prevOffset < topBun.startOffset) {
      topBunStyle = {
        bottom: newOffset,
        zIndex: topBun.startZIndex + 1,
        transitionDuration: "0.1s",
      };
    } else
      topBunStyle = {
        bottom: newOffset,
        zIndex: topBun.startZIndex + 1,
        transitionDuration: "0.3s",
      };
    const newTopBun = (
      <BurgerIngredient
        type={props.ingredients.seeds ? "bunSeed" : "bunPlain"}
        style={topBunStyle}
      />
    );

    setTopBun((prevTopBun) => ({
      ...prevTopBun,
      content: newTopBun,
    }));
  };

  const ExtraProcessing = () => {
    const extraNumCount =
      props.count.tomato +
      props.count.cucumber +
      props.count.onionRed +
      props.count.onionWhite +
      props.count.pepper;

    let newOffset = -(
      extra.ingredientOffset * extraNumCount +
      extra.pickleOffset * props.count.pickle +
      extra.lettuceOffset * props.count.lettuce +
      extra.avocadoOffset * props.count.avocado +
      extra.spinachOffset * props.count.spinach +
      extra.mushroomOffset * props.count.mushroom
    );

    if (extra.startOffset !== 0) newOffset += extra.startOffset;

    let newZIndex = extra.startZIndex + props.ingredients.extra.length;

    const newExtra = props.ingredients.extra.map((igKey, idx) => {
      let style;
      let rand = Math.floor(Math.random() * 8) - 4;
      let rotate = "rotate(" + 2 * rand + "deg)";
      let translate = "translateX(" + rand * 14 + "px)";
      if (rand < -1 || rand > 1) {
        if (rand < 0) {
          rand *= -1;
        }
        translate += "translateY(" + -3 * rand + "px)";
      }

      if (igKey === "pickle") {
        style = {
          bottom: newOffset - 120,
          zIndex: newZIndex,

          transform: translate,
        };
        newOffset += extra.pickleOffset;
      } else if (igKey === "avocado") {
        style = {
          bottom: newOffset,
          zIndex: newZIndex,

          transform: translate,
        };
        newOffset += extra.avocadoOffset;
      } else if (igKey === "lettuce" || igKey === "lettuceLight") {
        style = {
          bottom: newOffset,
          zIndex: newZIndex,

          transform: rotate,
        };
        newOffset += extra.lettuceOffset;
      } else if (igKey === "spinach") {
        style = {
          bottom: newOffset,
          zIndex: newZIndex,

          transform: rotate,
        };
        newOffset += extra.spinachOffset;
      } else if (igKey === "mushroom") {
        style = {
          bottom: newOffset - 80,
          zIndex: newZIndex,

          transform: translate,
        };
        newOffset += extra.mushroomOffset;
      } else {
        style = {
          bottom: newOffset - 90,
          zIndex: newZIndex,

          transform: translate,
        };
        newOffset += extra.ingredientOffset;
      }

      newZIndex -= 1;
      return <BurgerIngredient style={style} type={igKey} key={igKey + idx} />;
    });

    setExtra((prevExtra) => ({
      ...prevExtra,
      content: newExtra,
    }));

    let newOffset2 = -(
      extra.ingredientOffset * extraNumCount +
      extra.pickleOffset * props.count.pickle +
      extra.lettuceOffset * props.count.lettuce +
      extra.avocadoOffset * props.count.avocado +
      extra.spinachOffset * props.count.spinach +
      extra.mushroomOffset * props.count.mushroom
    );

    if (extra.startOffset !== 0) newOffset2 += extra.startOffset;

    setTopBun((prevBun) => ({
      ...prevBun,
      startOffset: newOffset2,
      startZIndex: extra.startZIndex + props.ingredients.extra.length,
    }));

    // setTopBun(() => ({
    //   startOffset: newOffset2,
    //   startZIndex: extra.startZIndex + props.ingredients.extra.length,
    // }));
  };

  const CheeseProcessing = () => {
    let newOffset = -cheese.ingredientOffset * props.ingredients.cheese.length;
    if (cheese.startOffset !== 0) newOffset += cheese.startOffset;

    let newZIndex = cheese.startZIndex + props.ingredients.cheese.length;
    const newCheese = props.ingredients.cheese.map((igKey, idx) => {
      let rand = Math.floor(Math.random() * 18) - 9;
      let rotate = "rotate(" + rand + "deg)";
      const style = {
        bottom: newOffset,
        zIndex: newZIndex,

        transform: rotate,
      };
      newOffset += cheese.ingredientOffset;
      newZIndex -= 1;
      return <BurgerIngredient style={style} type={igKey} key={igKey + idx} />;
    });

    setCheese((prevCheese) => ({
      ...prevCheese,
      content: newCheese,
    }));

    let newOffset2 = -cheese.ingredientOffset * props.ingredients.cheese.length;
    if (cheese.startOffset !== 0) newOffset2 += cheese.startOffset;

    setExtra((prevExtra) => ({
      ...prevExtra,
      startOffset: newOffset2,
      startZIndex: cheese.startZIndex + props.ingredients.cheese.length,
    }));
  };

  const MeatProcessing = () => {
    let newOffset = -meat.ingredientOffset * props.ingredients.meat.length;
    if (meat.startOffset !== 0) newOffset += meat.startOffset;

    let newZIndex = meat.startZIndex + props.ingredients.meat.length;

    const newMeat = props.ingredients.meat.map((igKey, idx) => {
      const style = {
        bottom: newOffset,
        zIndex: newZIndex,
      };
      newOffset += meat.ingredientOffset;
      newZIndex -= 1;
      return <BurgerIngredient style={style} type={igKey} key={igKey + idx} />;
    });
    setMeat((prevMeat) => ({
      ...prevMeat,
      content: newMeat,
    }));

    let newOffset2 = -meat.ingredientOffset * props.ingredients.meat.length;
    if (meat.startOffset !== 0) newOffset2 += meat.startOffset;

    setCheese((prevCheese) => ({
      ...prevCheese,
      startOffset: newOffset2,
      startZIndex: meat.startZIndex + props.ingredients.meat.length,
    }));
  };

  const SauceProcessing = () => {
    let newOffset = -sauce.ingredientOffset * props.ingredients.sauce.length;
    let newZIndex = sauce.startZIndex + props.ingredients.sauce.length;
    const newSauce = props.ingredients.sauce.map((igKey, idx) => {
      const style = {
        bottom: newOffset,
        zIndex: newZIndex,
      };
      newOffset += sauce.ingredientOffset;
      newZIndex -= 1;
      return <BurgerIngredient style={style} type={igKey} key={igKey + idx} />;
    });

    // Update ingredient offset
    setSauce((prevSauce) => ({
      ...prevSauce,
      content: newSauce,
    }));

    setMeat((prevMeat) => ({
      ...prevMeat,
      startOffset: -sauce.ingredientOffset * props.ingredients.sauce.length,
      startZIndex: sauce.startZIndex + props.ingredients.sauce.length,
    }));
  };

  return (
    <div className="Burger">
      {topBun.content}
      {/* <BurgerTopBun
        seeds={props.ingredients.seeds}
        offset={topBun.startOffset}
        zIndex={topBun.startZIndex}
      /> */}
      {extra.content}
      {cheese.content}
      {meat.content}
      {sauce.content}
      <BurgerIngredient
        type="bunBottom"
        style={{
          bottom: 0,
          zIndex: 999,
        }}
      />
    </div>
  );
};

export default Burger;
