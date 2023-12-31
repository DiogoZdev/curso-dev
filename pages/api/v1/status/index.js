import database from "infra/database";

export default async function status(_, response) {
  const updatedAt = new Date(Date.now()).toISOString();
  const dbVersion = await database.query(`SHOW server_version;`);
  const connections = await database.query(
    `SELECT count(*)::int as connections FROM pg_stat_activity WHERE datname = '${process.env.DB_NAME}';`
  );
  const maxConnections = await database.query(`SHOW max_connections;`);

  const info = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: dbVersion.rows[0].server_version,
        used_connections: connections.rows[0].connections,
        max_connections: Number(maxConnections.rows[0].max_connections)
      }
    }
  };

  return response.status(200).json(info);
}
