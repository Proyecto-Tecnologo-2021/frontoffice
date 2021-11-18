import * as actionTypes from '../Shopping/shopping-types'

export const addToCart = (product) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            product: product,
        },
    });

    localStorage.setItem("shop", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {

    // console.log("ID " + id)
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const adjustQty = (dispatch, itemID, value) => {

    dispatch({
        type: actionTypes.ADJUST_QTY,
        payload: {
            id: itemID,
            qty: value,
        },
    });

    // localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
