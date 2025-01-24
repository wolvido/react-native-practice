import { createContext, useState } from 'react';
import { Inventory } from '../models/inventory';

//context definition
interface InventoryContextType {
    items: Inventory[];
    addInvetoryByQuantity: (inventory: Inventory) => void;
    getAllInventory: () => Inventory[];
    reduceInventory: (id: number, quantity: number) => void;
};

//inventory context
export const InventoryContext = createContext<InventoryContextType>({
    items: [],
    addInvetoryByQuantity: (inventory: Inventory) => {},
    getAllInventory: () => [],
    reduceInventory: (id: number, quantity: number) => {},
});

function InventoryContextProvider({children, initialDatabase}: {children: React.ReactNode, initialDatabase: Inventory[]}) {
    const [database, setDatabase] = useState<Inventory[]>(initialDatabase);

    const updateInventoryQuantity = (inventory: Inventory, newQuantity: number) => {
        const itemId = inventory.item.id;

        const updatedInventoryItems = database.map((inventory) => {
            if (inventory.item.id === itemId) {
                return { ...inventory, quantity: Number(inventory.quantity) + Number(newQuantity)};
            }
            return inventory;
        });

        return updatedInventoryItems; //returns Inventory with updated quantity
    }

    const addInvetoryByQuantity = (inventory: Inventory) => {
        const itemId = inventory.item.id;
        const databaseItems = database;
        const itemIds = databaseItems.map((inventory) => inventory.item.id);
        const itemIndex = itemIds.indexOf(itemId);

        if (itemIndex !== -1) {
            const updatedInventoryQuantity = updateInventoryQuantity(database[itemIndex], inventory.quantity);

            setDatabase(updatedInventoryQuantity);
        } else {
            setDatabase([...database, { ...inventory}]);
        }
    }

    const getAllInventory = () => {
        return database;
    }

    const reduceInventory = (id: number, quantity: number) => {
        const item = database.find(item => item.id === id);
        if (item) {
            item.quantity -= quantity;
        }
    }

    const value = {
        items: database,
        addInvetoryByQuantity: addInvetoryByQuantity,
        getAllInventory: getAllInventory,
        reduceInventory: reduceInventory,
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
}

export default InventoryContextProvider;