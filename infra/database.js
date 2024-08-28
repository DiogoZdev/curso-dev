import { Client } from "pg";

async function query (queryObject) {
  let client;
  try {
    client = await getNewClient();
    const res = await client.query(queryObject);

    return res;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
  finally {
    await client.end();
  }
};

function getSSLValues() {
  const production = process.env.NODE_ENV === "production";
  const useSSL = process.env.USE_SSL === "true";
  const certificate = process.env.POSTGRES_CA;

  if (certificate) {
    return {
      ca: certificate,
    };
  }

  return production && useSSL ? true : false;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: getSSLValues()
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient
};
