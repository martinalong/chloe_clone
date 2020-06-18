import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import inventory from '../data/InventoryData';

export default function CartComponent({name, enter, leave}) {
    const dispatch = useDispatch();
    let cart = useSelector(state => state.cart);
    let total = 0;
    let count = 0;
    let cartObj = [];
    for (let code in cart) {
        total += parseInt(inventory[code]['price'].replace(/,/g, "")) * cart[code];
        count += cart[code];
        cartObj.push(
            <div className="item" key={code}>
                <img className="cart-image" src={inventory[code]['images'][0]} alt=""/>
                <div>
                    <h3 className="cart-name">{inventory[code]['productName']}</h3>
                    <h4 className="quantity">Quantity: {cart[code]}</h4>
                    <h4 className="remove" onClick={() => dispatch({type: "CART_DELETE", item: code})}>Remove</h4>
                </div>
                <h4 className="cart-price">$ {inventory[code]['price']}</h4>
            </div>
        );
    }
    let wishlist = Array.from(useSelector(state => state.wishlist)).map((code) => (
        <div className="item" key={code}>
            <img className="cart-image" src={inventory[code]['images'][0]} alt=""/>
            <div>
                <h3 className="cart-name">{inventory[code]['productName']}</h3>
                <h4 className="remove" onClick={() => {
                    dispatch({type: "CART", item: code});
                    dispatch({type: "WISHLIST", item: code});
                    }}>Move to cart</h4>
            </div>
            <h4 className="cart-price">$ {inventory[code]['price']}</h4>
        </div>
        ));
    return (
        <div className={name}><div className="white-cart-background" onMouseEnter={enter} onMouseLeave={leave}>
            <div className="cart-content">
                <h2 className="cart-title">Shopping Cart ({count + " item"}{(count === 1) ? "" : "s"})</h2>
                <div className='cart-items'>{cartObj}</div>
                <div className='line'/>
                <h2 className="wishlist-title">Wishlist ({wishlist.length + " item"}{(wishlist.length === 1) ? "" : "s"})</h2>
                <div className='wishlist-items'>{wishlist}</div>
            </div>
            <div className="checkout">
                <div className="subtotal-container"><h3 className="subtotal">Subtotal</h3><h3 className="cart-price">$ {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3></div>
                <h2 className="cart-button">Proceed to Checkout</h2>
            </div>
        </div></div>
    )
}