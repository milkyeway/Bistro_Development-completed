import mysql from 'mysql2'

// 資料庫連結資訊
const connection = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bistro',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}

// 一般使用
const pool = mysql.createPool(connection)

// promise用
const promisePool = pool.promise()

export default {
    pool,
    promisePool,
}

// 純筆記,有錯告知 忞
// get  獲得資料
// post 新增資料
// put  更新單筆資料
// delete 刪除單筆資料
