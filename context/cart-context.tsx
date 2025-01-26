import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { InventoryContext } from './inventory-context';

//context type, its definition
interface CartContextType {
    //property contract
    cart: Cart; 

    //behaviour contract
    addItemsByQuantity: (item: CartItem) => void;
    handleSubmit: () => Promise<void>;
    getItems: () => CartItem[];
    setOrder: (order: Cart) => void;
}

//cart functionality context
export const CartContext = createContext<CartContextType>({
    cart: {cartItems: [], cashier:"", id: 0},
    addItemsByQuantity: (item: CartItem) => {},
    handleSubmit: async () => {},
    getItems: () => [],
    setOrder: (order: Cart) => {}
});



//handles cart context so that it can be used in the layout easily
function CartContextProvider({initialValue, children}: {initialValue: Cart, children: ReactNode}) {

    //coupled with inventory context, need to decoupe later when app gets larger
    const inventoryContext = useContext(InventoryContext);

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
        inventoryContext.reduceInventory(cart);

        //reset cart
        setCart({cartItems: [], cashier:"", id: 0});
    };

    const setOrder = (order: Cart) => {
        setCart(order);
    }

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
        getItems: getItems,
        setOrder: setOrder
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;