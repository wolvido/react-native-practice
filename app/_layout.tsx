import CartContextProvider from '@/context/cart-context';
import { Stack } from 'expo-router';
import { Item } from '@/models/item';

export default function RootLayout() {
    return (
        <CartContextProvider initialValue={{ items: [], id: 0 }}>
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
    );
}
