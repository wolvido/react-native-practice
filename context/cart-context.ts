import { Cart } from '../models/cart';
import { Item } from '../models/item';

// CartContext.tsx (Manages Cart State)
import { createContext, useState, useContext } from 'react';

//cart functionality context
export const CartContext = createContext<Cart[]>([]);

export function useCart(initialValue: Cart[]) {
    const [cart, setCart] = useState(initialValue);

    const addItem = (item: Item) => {
        const newCart = [...cart, { id: cart.length + 1, item }];
        setCart(newCart);
    };

    const handleSubmit = async () => {
        console.log(cart);
    };

    const getItems = () => {
        //convert cart to list
        const cartList = cart.map((cartItem) => cartItem.item);
        return cartList;
    }

    return { cart, addItem, handleSubmit, getItems };
}

export default useCart;