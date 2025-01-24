import { View, Text, Button,StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../style/common'
import { CartContext } from '../../../context/cart-context'; 
import { useContext } from 'react';
import { InventoryContext } from '@/context/inventory-context';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { CartItem } from '@/models/cart-item';

export default function OrderScreen() {

        //hook contexts
        const cartContext = useContext(CartContext);
        const inventoryContext = useContext(InventoryContext);

        //grab available items from inventory
        const inventoryItems = inventoryContext.getAllInventory();

        const { control, getValues } = useForm();

    return (
        <View style={styles.main}>   

            <Text style={commonStyles.title}>Cart Items</Text>

            <ul style={styles.list}>
                {inventoryItems.map((inventory) => (
                    <li key={`${inventory.id}-${Math.random()}`} style={styles.item}>
                        <Text style={styles.item__name}>
                            {inventory.item.name}
                        </Text>

                        <Text>
                            {inventory.item.description}
                        </Text>

                        <Controller
                            name={`quantity-${inventory.id}`}
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                                <input
                                    type="number"
                                    min="1"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        
                        <Button title="Add to Cart" onPress={() => {
                            const quantity = getValues(`quantity-${inventory.id}`);

                            const cartItem: CartItem = {
                                id: Math.random(),
                                item: inventory.item,
                                quantity: quantity
                            };

                            cartContext.addItemsByQuantity(cartItem);
                        }} />
                    </li>
                ))}
            </ul>

            {/* <Button title="Submit Cart" onPress={handleSubmit} /> */}

            <Link style={commonStyles.button} href="/cart">Checkout</Link>
            
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    list:{
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%'
    },
    item:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        borderStyle: 'solid',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopWidth: 0
    
    },
    item__name:{
        fontSize: 20,
    },
});


