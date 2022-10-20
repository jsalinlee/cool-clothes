import {createContext, useReducer} from 'react';

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, itemToDecrease) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToDecrease.id);

    if (existingCartItem.quantity === 1) {
        return deleteCartItem(cartItems, itemToDecrease);
    }

    return cartItems.map((cartItem) => cartItem.id === itemToDecrease.id ? {...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
}

const deleteCartItem = (cartItems, itemToDelete) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    setCartItems: () => null,
    addItemToCart: () => {},
    decreaseCartItemQuantity: () => {},
    removeItemFromCart: () => {}
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartProvider = ({ children }) => {
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newCartTotal = newCartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity, 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        }));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (itemToDecrease) => {
        const newCartItems = removeCartItem(cartItems, itemToDecrease);
        updateCartItemsReducer(newCartItems);
    }

    const deleteItemFromCart = (itemToDelete) => {
        const newCartItems = deleteCartItem(cartItems, itemToDelete);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (isCartOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, cartCount, cartTotal, addItemToCart, removeItemFromCart, deleteItemFromCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}