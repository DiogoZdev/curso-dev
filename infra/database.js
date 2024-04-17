import { Client } from "pg";

const query = async (queryObject) => {
  let client;
  try {
    client = await getNewClient();
    const res = await client.query(queryObject);

    return res;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

async function getNewClient() {
  const production = process.env.NODE_ENV === "production";
  const useSSL = process.env.USE_SSL === "true";

  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: production && useSSL ? true : false
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient
};
