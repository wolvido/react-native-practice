import { createContext, useState } from 'react';
import { Inventory } from '../models/inventory';

//context definition
interface InventoryContextType {
    items: Inventory[];
    addInventoryItem: (inventory: Inventory) => void;
    addInvetoryByQuantity: (inventory: Inventory, quantity: number) => void;
    getAllInventory: () => Inventory[];
    reduceInventory: (id: number, quantity: number) => void;
};

//inventory context
export const InventoryContext = createContext<InventoryContextType>({
    items: [],
    addInventoryItem: (inventory: Inventory) => {},
    addInvetoryByQuantity: (inventory: Inventory, quantity: number) => {},
    getAllInventory: () => [],
    reduceInventory: (id: number, quantity: number) => {},
});

function InventoryContextProvider({children, initialDatabase}: {children: React.ReactNode, initialDatabase: Inventory[]}) {
    const [database, setDatabase] = useState<Inventory[]>(initialDatabase);

    const addInventoryItem = (inventory: Inventory) => {
        setDatabase([...database, inventory]);
    }

    const updateInventoryQuantity = (inventory: Inventory, quantity: number) => {
        const itemId = inventory.item.id;

        const updatedInventoryItems = database.map((inventory) => {
            if (inventory.item.id === itemId) {
                return { ...inventory, quantity: Number(inventory.quantity) + Number(quantity) };
            }
            return inventory;
        });

        return updatedInventoryItems; //returns Inventory with updated quantity
    }

    const addInvetoryByQuantity = (inventory: Inventory, quantity: number) => {
        const itemId = inventory.item.id;
        const databaseItems = database;
        const itemIds = databaseItems.map((inventory) => inventory.item.id);
        const itemIndex = itemIds.indexOf(itemId);

        if (itemIndex !== -1) {
            const updatedInventoryQuantity = updateInventoryQuantity(inventory, quantity);

            setDatabase(updatedInventoryQuantity);
        } else {
            setDatabase([...database, { ...inventory, quantity: quantity }]);
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
        addInventoryItem: addInventoryItem,
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