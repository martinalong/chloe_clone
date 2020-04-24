import cartReducer from './CartReducer';
import wishlistReducer from './WishlistReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    cart: cartReducer,
    wishlist: wishlistReducer
})