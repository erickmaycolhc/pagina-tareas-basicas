// import { db } from ".";
import { create } from "domain";
import { db } from ".";

export const getListTask = async () => {
  try {
    const query = "select * from task";

    const response = await db.conn.query(query);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};
export const saveTask = async (title: string, description: string) => {
  const query = `INSERT INTO task(title, description)
                          VALUES ($1, $2) `;

  const value = [title, description];

  const rpt = await db.conn.query(query, value);
  return rpt.rows;
};
