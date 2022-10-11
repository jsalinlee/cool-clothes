import {createContext, useState, useEffect} from 'react';

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity, 0)
        setCartTotalPrice(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (itemToDecrease) => {
        setCartItems(removeCartItem(cartItems, itemToDecrease));
    }

    const deleteItemFromCart = (itemToDelete) => {
        setCartItems(deleteCartItem(cartItems, itemToDelete));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, cartCount, cartTotalPrice, addItemToCart, removeItemFromCart, deleteItemFromCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}