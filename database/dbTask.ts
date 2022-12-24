// import { db } from ".";
import { create } from "domain";
import { db } from ".";

export const getListTask = async () => {
  try {
    const query = " select * from task order by id desc";

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

export const deleteTaskDB = async (id: string = "") => {
  const query = `delete from task where id = $1`;
  const value = [id];
  const rpt = await db.conn.query(query, value);
  return rpt.rows;
};

export const consultaPorId = async (id: string = "") => {
  const query = `select * from task where id = $1`;
  const value = [id];
  const rpt = await db.conn.query(query, value);
  return rpt.rows;
};

export const updateTaskDB = async (
  id: string,
  title: string,
  description: string
) => {
  const query = ` update task set title = $2, description = $3 where id = $1`;
  const value = [id, title, description];
  const rpt = await db.conn.query(query, value);
  return rpt.rows;
};
