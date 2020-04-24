export default (state = {}, action) => {
    let cart = state;
    if (action.type === "CART") {
        if (cart.hasOwnProperty(action.item)) {
            cart[action.item] += 1;
        } else {
            cart[action.item] = 1;
        }
    } else if (action.type === "CART_DELETE") {
        delete cart[action.item];
    }
    return cart;
}