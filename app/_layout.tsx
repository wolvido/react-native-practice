import CartContextProvider from '@/context/cart-context';
import { Stack } from 'expo-router';
import { Inventory } from '@/models/inventory';
import InventoryContextProvider from '@/context/inventory-context';

export default function RootLayout() {

    //dummy inventory database
    const item1 = {id: 1, name: 'Heinz Ketchup', description: "ketchup tomato"}
    const item2 = {id: 2, name: 'Parsely Dried', description: "spices something something"}
    const item3 = {id: 3, name: 'Item 3', description: "description3"}
    const dummyInventoryDb: Inventory[] = [
        {id: 1, item: item1, quantity: 10},
        {id: 2, item: item2, quantity: 20},
        {id: 3, item: item3, quantity: 30},
    ];

    return (
        <InventoryContextProvider initialDatabase={dummyInventoryDb}>
        <CartContextProvider initialValue={{ cartItems: [], id: 0 }}>
            
            <Stack
                screenOptions={{
                headerStyle: {
                    backgroundColor: 'green'
                },
                headerTintColor: '#fff',
                headerShown: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                }}>
                {/* <Stack.Screen name="(home)" options={{ title: "Home" }}/> */}
            </Stack>

        </CartContextProvider>
        </InventoryContextProvider>
    );
}
