import { sql } from "../database/database.js";

const addItemToList = async (listId, itemName) => {
    await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name, collected)
    VALUES (${Number(listId)}, ${itemName}, false)`;
  };
  
const findAllUncollectedItems = async (listId) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} AND collected = false ORDER BY name`;
};

const findAllcollectedItems = async (listId) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} AND collected = true ORDER BY name`;
    };


const markAsCollected = async (listId, itemId) => {
    await sql`UPDATE shopping_list_items
    SET collected = true WHERE shopping_list_id = ${listId} AND id = ${itemId}`;
};

const itemCount = async () => {
    const result = await sql`SELECT COUNT(*) as count FROM shopping_list_items`;
    return result[0].count;
};
    

export { addItemToList, findAllUncollectedItems, findAllcollectedItems, markAsCollected, itemCount };