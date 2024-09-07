const { exec } = require("node:child_process")

async function checkPostgres() {
  await exec("docker exec postgres-container pg_isready --host localhost", handleResponse);

  function handleResponse(error, stdout, stderr) {

    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");

      return checkPostgres();
    }

    console.log("\n🟢  Postgress disponível");
  }
}

console.log("🟡  Aguardando disponibilidade do Postgres");
checkPostgres();


