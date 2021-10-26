import { FETCH_PRODUCTS } from '../actions/types';
import { ORDER_PRODUCTS_BY_PRICE } from '../actions/types';
import data from '../model/products.json';

// Products are fetched dynamically from products.json file
export const fetchProducts = () => (dispatch) => {
  return dispatch({ type: FETCH_PRODUCTS, payload: data });
}

export const orderProducts = (items, sort) => (dispatch) => {
  const products = items.slice();
  if (sort !== "") {
    products.sort((a, b) => (sort === "lowest") ? (a.unit_price_incl_vat > b.unit_price_incl_vat ? 1 : -1) : (a.unit_price_incl_vat < b.unit_price_incl_vat ? 1 : -1));
  }
  else {
    products.sort((a, b) => (a.unit_price_incl_vat > b.unit_price_incl_vat ? 1 : -1));
  }
  return dispatch({ type: ORDER_PRODUCTS_BY_PRICE, payload: { sort: sort, items: products } });
}
