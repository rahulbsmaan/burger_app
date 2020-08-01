import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice : 4,
        purchaseable : false,
        purchasing : false
    }

    updatePurchaseable(ingredients) {
        
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el;
        },0);

        this.setState({
            purchaseable : sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldValue = this.state.ingredients[type];
        
        const newValue = oldValue + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newValue;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice : newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldValue = this.state.ingredients[type];
        if(oldValue <=0 ){
            return null
        };
        const newValue = oldValue - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newValue;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice : newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
       
    }
    
    purhaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert('You continue')
    };

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0

        };

        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purhaseCancelHandler}>
                    <OrderSummary ingredients = {this.state.ingredients}
                    purchaseCancelled = {this.purhaseCancelHandler}
                    purchaseContinue = {this.purchaseContinueHandler}
                    price = {this.state.totalPrice}/>
                    </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchaseable = {this.state.purchaseable}
                ordered = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;