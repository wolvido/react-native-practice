import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

//context type, its definition
interface CartContextType {
    //property contract
    cart: Cart; 

    //behaviour contract
    addItemsByQuantity: (item: CartItem, quantity: number) => void;
    handleSubmit: () => Promise<void>;
    getItems: () => CartItem[];
}

//cart functionality context
export const CartContext = createContext<CartContextType>({
    cart: {cartItems: [], id: 0},
    addItemsByQuantity: (item: CartItem, quantity: number) => {},
    handleSubmit: async () => {},
    getItems: () => []
});

//handles cart context so that it can be used in the layout easily
function CartContextProvider({initialValue, children}: {initialValue: Cart, children: ReactNode}) {
    const [cart, setCart] = useState(initialValue);

    const addItemsByQuantity = (cartItem: CartItem, quantity: number) => {
        //grab the item id from the item in the cart item
        const itemId = cartItem.item.id;
        console.log(itemId);

        const cartItems = cart.cartItems;

        //grab the item ids from the cart items
        const itemIds = cartItems.map((cartItem) => cartItem.item.id);

        //check if the item id is in the list of item ids
        const itemIndex = itemIds.indexOf(itemId);
        if (itemIndex !== -1) {
            //update the quantity of the item
            const updatedCartItems = cart.cartItems.map((cartItem) => {
                if (cartItem.item.id === itemId) {
                    return { ...cartItem, quantity: Number(cartItem.quantity) + Number(quantity) };
                }
                return cartItem;
            });

            //set the cart with the updated cart items
            setCart({ ...cart, cartItems: updatedCartItems });
        } else {
            //if the item is not in the cart, add the item to the cart
            setCart({ ...cart, cartItems: [...cart.cartItems, { ...cartItem, quantity: quantity }] });
        }
    }

    const handleSubmit = async () => {
        console.log(cart);
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