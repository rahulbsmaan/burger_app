import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey => {
        return <li key = {igkey}><span style = {{textTransform: 'capitalize'}}>{igkey}</span> : {props.ingredients[igkey]}</li>
    });


    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Burger with below ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType = "Danger" changed = {props.purchaseCancelled}>CANCEL</Button>
            <Button btnType = "Success" changed = {props.purchaseContinue}>CONTINUE</Button>

        </Aux>
    )
}

export default orderSummary;