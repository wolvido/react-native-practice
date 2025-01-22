import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
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

    );
}
