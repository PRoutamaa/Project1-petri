import { sql } from "../database/database.js";

const createList = async (name) => {
 await sql`INSERT INTO shopping_lists (name, active) VALUES (${name}, true)`;
};

const findAllActiveLists = async () => {
 return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const findById = async (id) => {
 const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;

if (rows && rows.length > 0) {
    return rows[0];
}

 return { id: 0, name: "Unknown" };
};

const deactivateList = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
  };

const listCount = async () => {
    const result = await sql`SELECT COUNT(*) as count FROM shopping_lists`;
    return result[0].count;
};
    
export { createList, findAllActiveLists, findById, deactivateList, listCount };