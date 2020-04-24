export default (state = new Set(), action) => {
    let wishlist = state;
    if (action.type === "WISHLIST") {
        if (wishlist.has(action.item)) {
            wishlist.delete(action.item);
        } else {
            wishlist.add(action.item);
        }
    }
    return wishlist;
}