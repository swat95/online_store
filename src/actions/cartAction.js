import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./types";

// Product is added to cart by dispatch of ADD_TO_CART action
export const addToCart = (items, product) => (dispatch) => {
  const cartItems = items.slice();
  let productAlreadyIn = false;
  cartItems.forEach(item => {
    if (item.id === product.id) {
      productAlreadyIn = true;
      item.count++;
    }
  });
  if (!productAlreadyIn) {
    cartItems.push({ ...product, count: 1 });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  return dispatch(
    {
      type: ADD_TO_CART,
      payload: { cartItems: cartItems }
    }
  )
}

// Product is removed from the cart by dispatch of REMOVE_FROM_CART action
export const removeFromCart = (items, product) => (dispatch) => {
  const cartItems = items.slice().filter(element => element.id !== product.id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  return dispatch(
    {
      type: REMOVE_FROM_CART,
      payload: {
        cartItems
      }
    })
}

// Cart becomes empty after placing an order
export const clearCart = () => (dispatch) => {
  localStorage.clear();
  return dispatch({
    type: CLEAR_CART,
    payload: []
  })
}
