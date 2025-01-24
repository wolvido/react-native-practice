import { View } from "react-native";
import commonStyles from '../../../style/common';
import { useForm, SubmitHandler } from "react-hook-form"
import { useContext } from "react";
import { InventoryContext } from "@/context/inventory-context";
import { Inventory } from "@/models/inventory";
import { Item } from "@/models/item";

export default function CreateItemScreen(){

    const inventoryContext = useContext(InventoryContext);

    //initialize react-hook-form using Inventory model
    const { register, handleSubmit } = useForm<Inventory>();

    //submit function
    const onSubmit: SubmitHandler<Inventory> = (inventory) => {

        const newItem: Item = {
            id: Math.floor(Math.random() * 100000),
            name: inventory.item.name,
            description: inventory.item.description,
        };

        const newInventory: Inventory = {
            id: Math.floor(Math.random() * 100000),
            item: newItem,
            quantity: inventory.quantity
        }

        inventoryContext.addInvetoryByQuantity(newInventory);
        console.log(inventoryContext.getAllInventory());
    }

    return (
        <View style={commonStyles.main}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Item Name:</label>
                <input {...register("item.name")} type="text" required/>
                <label>Item Description:</label>
                <input {...register("item.description")} type="text" required/>
                <label>Item Quantity:</label>
                <input {...register("quantity")} type="number" required/>
                <button type="submit">Submit</button>
            </form>
        </View>
    );
}