import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Cart } from '../models/cart';
import { Item } from '../models/item';

//cart context type
interface CartContextType {
    cart: Cart;
    addItem: (item: Item) => void;
    handleSubmit: () => Promise<void>;
    getItems: () => Item[];
}

//cart functionality context
export const CartContext = createContext<CartContextType>({
    cart: {items: [], id: 0},
    addItem: (item: Item) => {},
    handleSubmit: async () => {},
    getItems: () => []
});

function CartContextProvider({initialValue, children}: {initialValue: Cart, children: ReactNode}) {
    const [cart, setCart] = useState(initialValue);

    const addItem = (item: Item) => {
        setCart((cart) => ({
            ...cart,
            items: [...cart.items, item],
        }));
    };

    const handleSubmit = async () => {
        console.log(cart);
    };

    const getItems = () => {
        const itemList = cart.items.map((item) => {
            return item;
        });
        return itemList;
    };

    const value = {
        cart: cart,
        addItem: addItem,
        handleSubmit: handleSubmit,
        getItems: getItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;