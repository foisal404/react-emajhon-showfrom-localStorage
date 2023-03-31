import React from 'react';
import "./Cart.css"

const Cart = ({cart}) => {
    return (
        <div className='cart'>
            <h4 className='cart-title'>Order Summary</h4>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: $1140</p>
            <p>Total Shipping Charge: $5</p>
            <p>Tax: $114</p>
            <h5>Grand Total: $1559</h5>
        </div>
    );
};

export default Cart;