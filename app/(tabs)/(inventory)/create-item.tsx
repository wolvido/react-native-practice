import { View } from "react-native";
import commonStyles from '../../../style/common';
import { useForm, SubmitHandler } from "react-hook-form"
import { useContext } from "react";
import { InventoryContext } from "@/context/inventory-context";
import { Inventory } from "@/models/inventory";

export default function CreateItemScreen(){

    const inventoryContext = useContext(InventoryContext);

    //initialize react-hook-form using Inventory model
    const { register, handleSubmit } = useForm<Inventory>();

    //submit function
    const onSubmit: SubmitHandler<Inventory> = (inventory) => {
        const newInventory: Inventory = {
            id: Math.floor(Math.random() * 100000),
            item: inventory.item,
            quantity: 0
        }

        const quantity : number = 0;
        inventoryContext.addInvetoryByQuantity(newInventory);
    }

    return (
        <View style={commonStyles.main}>


        </View>
    );
}