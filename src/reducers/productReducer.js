import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE } from "../actions/types";

const initialState = { items: [], filteredItems: [], cartItems: [] };
export default function product(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, items: action.payload, filteredItems: action.payload };
        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state, filteredItems: action.payload.items, sort: action.payload.sort
            };
        default:
            return state;
    }
}