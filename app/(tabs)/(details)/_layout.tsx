import { Stack } from 'expo-router';

export default function DetailsLayout() {
    
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    // backgroundColor: 'blue',
                },
                headerShown: false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>

            <Stack.Screen name="details"  options={{ title: "Details" }}/> 
        </Stack>
    );
}