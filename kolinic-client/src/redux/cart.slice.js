import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const index = state.cart.findIndex(item => item.id === action.payload.id);
            if(index !== -1) {
                state.cart[index].quantity += action.payload.quantity;
            } else {
                state.cart.push(action.payload);
            }
            toast.success("Add item to cart successfully !", {
                position: "top-right"
            });
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.id === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.price;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find((item) => item.id === action.payload);

            item.quantity--;
            item.totalPrice = item.quantity * item.price;

            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart(state) {
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
    }
});

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

export const getCurrentQuantityById = (id) => (state) =>
    state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;

