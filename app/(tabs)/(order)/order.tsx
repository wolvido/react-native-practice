import { View, Text, Button,StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../style/common'
import { useCart } from '../../../context/cart-context'; 

export default function OrderScreen() {

        //hook cart-context
        const { addItem } = useCart([]); //hook

        //dummy items
        const item1 = { id: 1, name: "Item 1", description: "Description for Item 1" };
        const item2 = { id: 2, name: "Item 2", description: "Description for Item 2" };
        const item3 = { id: 3, name: "Item 3", description: "Description for Item 3" };

        const items = [item1, item2, item3];

    return (
        <View style={styles.main}>   

            <Text>Cart Items</Text>

            <ul style={styles.list}>
                {items.map((item) => (
                    <li key={item.id} style={styles.item}>
                        <Text style={styles.item__name}>
                            {item.name}
                        </Text>
                        
                        <Button title="Add to Cart" onPress={() => addItem(item)} />

                    </li>
                ))}
            </ul>

            {/* <Button title="Submit Cart" onPress={handleSubmit} /> */}

            <Link href="/cart">Checkout</Link>

            {/* <TextInput
                style={styles.input}
                placeholder="Enter something..."
                value={inputValue}
                onChangeText={handleChange} // Use the handler from the hook
            /> */}


            
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
    button:{
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 5,
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


