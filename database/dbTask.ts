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
