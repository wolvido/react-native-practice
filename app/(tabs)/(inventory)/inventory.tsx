import { View, Text, StyleSheet } from 'react-native';

export default function InventoryScreen() {

    //dummy items
    const item1 = { id: 1, name: "Item 1", description: "Description for Item 1" };
    const item2 = { id: 2, name: "Item 2", description: "Description for Item 2" };
    const item3 = { id: 3, name: "Item 3", description: "Description for Item 3" };

    const items = [item1, item2, item3];

    return (
        <View style={styles.container}>
            <Text>Inventory</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});