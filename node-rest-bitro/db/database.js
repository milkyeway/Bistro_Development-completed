import mysql from "mysql";

//在204教室時，要Milkye的電腦打開才能用這個db
//在自己家裡或想改自己的db伺服器時需要把host改成自己的
//但資料表要即時從共用php雲端更新最新資料表，避免出錯
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "bistro",
  debug: false
});

function executeQuery(sql, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err, null);
    } else {
      if (connection) {
        connection.query(sql, function(error, results, fields) {
          connection.release();
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    }
  });
}

function query(sql, callback) {
  executeQuery(sql, function(err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

module.exports = {
  query,
  pool
};
