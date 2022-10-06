import {createContext, useState } from 'react';

export const CartContext = createContext({
    setCartItems: () => null,
    cartItems: [],
    setCartDropdown: () => false,
    cartDropdown: false,
})

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartDropdown, setCartDropdown] = useState(false);
    const value = {cartItems, setCartItems, cartDropdown, setCartDropdown};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}