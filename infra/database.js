import { Client } from "pg";

const query = async (queryObject) => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === "development" ? false : true
  });

  try {
    await client.connect();
    const res = await client.query(queryObject);
    await client.end();

    return res;
  } catch {
    await client.end();
  }
};

export default {
  query: query
};
