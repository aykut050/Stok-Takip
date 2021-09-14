const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Qwe75",
    host: "localhost",
    port: 5432,
    database: "stok"
})

module.exports = pool;