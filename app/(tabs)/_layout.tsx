
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    //tab bar below and above
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}> 
        <Tabs.Screen
            name="(home)"
            options={{
                title: 'Home',
                href: '/(tabs)/(home)',
                headerStyle: { 
                backgroundColor: 'lightblue'
            },
            }}
        />

        <Tabs.Screen
            name="(details)"
            options={{
                title: 'Details',
                href: "/(tabs)/(details)/details",
                headerStyle: { 
                backgroundColor: 'lightgreen'
            },
        }}
        />

        <Tabs.Screen
            name="(inventory)"
            options={{
                title: 'Inventory',
                href: "/(tabs)/(inventory)/inventory",
                headerStyle: { 
                    backgroundColor: 'orange'
                    },
        }}
        />

        <Tabs.Screen    
            name="(order)"
            options={{
                title: 'Order',
                href: "/(tabs)/(order)/order",
                headerStyle: { 
                    backgroundColor: 'lightpink'
                    },
        }}
        />

    </Tabs>
  );
}
