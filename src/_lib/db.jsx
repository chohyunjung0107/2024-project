import { createPool } from "mysql2";

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

pool.getConnection((err, conn) => {
  if (err) console.log("db 연결 에러");
  else console.log("db 연결됨dbdb");
  conn.release();
});
const executeQuery = (query, arrParams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query("select * from test.test_table", arrParams, (err, data) => {
        if (err) {
          res.status(500).json({ error: err.message });
          reject(err);
        }
        console.log("------db.jsx------", data);
        resolve(data);
        // res.status(200).json({ data: data });
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default executeQuery;
