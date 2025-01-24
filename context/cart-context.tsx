import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

//context type, its definition
interface CartContextType {
    //property contract
    cart: Cart; 

    //behaviour contract
    addItemsByQuantity: (item: CartItem) => void;
    handleSubmit: () => Promise<void>;
    getItems: () => CartItem[];
}

//cart functionality context
export const CartContext = createContext<CartContextType>({
    cart: {cartItems: [], id: 0},
    addItemsByQuantity: (item: CartItem) => {},
    handleSubmit: async () => {},
    getItems: () => []
});

//handles cart context so that it can be used in the layout easily
function CartContextProvider({initialValue, children}: {initialValue: Cart, children: ReactNode}) {
    const [cart, setCart] = useState(initialValue);

    const updateCartQuantity = (cartItem: CartItem, newQuantity: number) => {
        const itemId = cartItem.item.id;

        const updatedCartItems = cart.cartItems.map((cartItem) => {
            if (cartItem.item.id === itemId) {
                return { ...cartItem, quantity: Number(cartItem.quantity) + Number(newQuantity) };
            }
            return cartItem;
        });

        return updatedCartItems;
    }

    const addItemsByQuantity = (cartItem: CartItem) => {
        const itemId = cartItem.item.id;
        const cartItems = cart.cartItems;
        const itemIds = cartItems.map((cartItem) => cartItem.item.id);
        const itemIndex = itemIds.indexOf(itemId);

        if (itemIndex !== -1) {
            const updatedCartItems = updateCartQuantity(cart.cartItems[itemIndex] , cartItem.quantity);
            setCart({ ...cart, cartItems: updatedCartItems });
        } else {
            //if the item is not in the cart, add the item to the cart
            setCart({ ...cart, cartItems: [...cart.cartItems, { ...cartItem }] });
        }
    }

    const handleSubmit = async () => {
        console.log(cart);
        setCart({cartItems: [], id: 0});
    };

    const getItems = () => {
        const itemList = cart.cartItems.map((cartItems) => {
            return cartItems;
        });
        return itemList;
    };

    const value = {
        cart: cart,
        addItemsByQuantity: addItemsByQuantity,
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