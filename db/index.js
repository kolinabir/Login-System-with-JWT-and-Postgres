import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jwtlogin",
  password: "1111",
  port: 5432,
});

export const query = (text, params) => pool.query(text, params);
