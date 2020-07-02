import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import BurgerMeal from "../../components/BurgerMeal/BurgerMeal";
import BuildControls from "../../components/BurgerMeal/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/BurgerMeal/OrderSummary/OrderSummary";
import Message from "../../components/BurgerMeal/Burger/Message/Message";

const INGREDIENT_PRICES = {
  extra: 0.1,
  cheese: 0.2,
  meat: 1,
  sauce: 0,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      seeds: true,
      extra: [],
      cheese: [],
      meat: [],
      sauce: [],
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    count: {
      pattyBeef: 0,
      pattyPork: 0,
      porkFried: 0,
      chickenFried: 0,
      chickenGrilled: 0,
      fishFillet: 0,
      fishFried: 0,
      egg: 0,
      ham: 0,
      cheeseAmerican: 0,
      cheeseCheddar: 0,
      cheeseProvolone: 0,
      cheeseSwiss: 0,
      sauceKetchup: 0,
      sauceMayo: 0,
      sauceMustard: 0,
      sauceRelish: 0,
      avocado: 0,
      spinach: 0,
      tomato: 0,
      cucumber: 0,
      lettuce: 0,
      mushroom: 0,
      onionRed: 0,
      onionWhite: 0,
      pepper: 0,
      pickle: 0,
    },
  };

  changeBunHandler = () => {
    let newIngredients = { ...this.state.ingredients };
    newIngredients["seeds"] = !newIngredients["seeds"];

    this.setState({ ingredients: newIngredients });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .slice(1)
      .map((typeKey) => {
        return ingredients[typeKey].length;
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type, item) => {
    const old = this.state.ingredients[type];
    const updatedCount = { ...this.state.count };
    updatedCount[item] += 1;
    if (item === "lettuce") {
      let lettuceArray = ["lettuce", "lettuceLight"];
      let randomIndex = Math.floor(Math.random() * lettuceArray.length);

      item = lettuceArray[randomIndex];
    }
    if (item === "pepper") {
      let pepperArray = ["pepperYellow", "pepperGreen", "pepperRed"];
      let randomIndex = Math.floor(Math.random() * pepperArray.length);
      item = pepperArray[randomIndex];
    }
    let updated = [item, ...old];
    if (type === "sauce") {
      const numSauce = this.state.ingredients.sauce.filter(function (x) {
        return x === item;
      }).length;

      if (numSauce > 0) {
        updated = [...old];
        updatedCount[item] = 1;
      }
    }

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updated;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - -INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice.toFixed(2),
      count: updatedCount,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type, item) => {
    const old = this.state.ingredients[type];
    const updatedIngredients = { ...this.state.ingredients };
    const oldPrice = this.state.totalPrice;
    let updated = old;
    let updatedCount = { ...this.state.count };

    let idx = updated.indexOf(item);
    if (item === "pepper") {
      idx = updated.indexOf("pepperYellow");
    }
    let newPrice = oldPrice - -0;
    if (idx > -1) {
      updated.splice(idx, 1);
      newPrice = oldPrice - INGREDIENT_PRICES[type];
      updatedCount[item] -= 1;
    } else {
      if (item === "lettuce") {
        idx = updated.indexOf("lettuceLight");
      }
      if (item === "pepper") {
        idx = updated.indexOf("pepperRed");
      }
      if (idx > -1) {
        updated.splice(idx, 1);
        newPrice = oldPrice - INGREDIENT_PRICES[type];
        updatedCount[item] -= 1;
      } else {
        if (item === "pepper") {
          idx = updated.indexOf("pepperGreen");
        }
        if (idx > -1) {
          updated.splice(idx, 1);
          newPrice = oldPrice - INGREDIENT_PRICES[type];
          updatedCount[item] -= 1;
        }
      }
    }

    updatedIngredients[type] = updated;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice.toFixed(2),
      count: updatedCount,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You continue");
  };

  render() {
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            counts={this.state.count}
            cancel={this.purchaseCancelHandler}
            confirm={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <BurgerMeal
          total={this.state.totalPrice}
          ingredients={this.state.ingredients}
          count={this.state.count}
        />
        {!(
          this.state.ingredients.extra.length |
          this.state.ingredients.cheese.length |
          this.state.ingredients.meat.length |
          this.state.ingredients.sauce.length
        ) ? (
          <Message message="Please start adding ingredients!" />
        ) : (
          <Message message={"Total: $" + this.state.totalPrice} />
        )}
        <BuildControls
          changedBun={this.changeBunHandler}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          itemCounts={this.state.count}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
