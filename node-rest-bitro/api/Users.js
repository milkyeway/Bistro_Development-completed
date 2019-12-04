import express from 'express'

import User from '../domain/user.js'

// mysql2 async-await用的
import dbMysql2 from '../db/database1.js'

const router = express.Router()

// 執行sql用的async-await的函式
// sql 執行用的sql
// res 回應
// method restful的方法，預設為get
// multirow 是否為多資料回傳，預設為  是
// instance 物件實體，預設為空物件
async function executeSQL(
  sql,
  res,
  method = 'get',
  multirows = true,
  instance = {}
) {
  try {
    const [rows, fields] = await dbMysql2.promisePool.query(sql)

    switch (method) {
      case 'post': {
        console.log(instance)
        // 仿照json-server的回傳
        const insertId = { id: rows.insertId }
        // 合併id值
        const result = { ...instance, ...insertId }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'put': {
        // 仿照json-server的回傳，有更新到會回傳單一值，沒找到會回到空的物件字串
        // console.log(rows.affectedRows)
        let result = {}
        if (rows.affectedRows) result = { ...instance }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'delete': {
        // 仿照json-server的回傳
        res.status(200).json({})
        break
      }
      case 'get':
      default:
        {
          //console.log(rows)

          if (multirows) {
            res.status(200).json(rows)
          } else {
            // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
            let result = {}
            if (rows.length) result = rows[0]
            res.status(200).json(result)
          }
        }
        break
    }
  } catch (error) {
    // 錯誤處理
    console.log(error)

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    })
  }
}

// get 處理獲取全部的資料列表
// AND查詢加入`?email=XXX&id_card=XXXX
router.get('/', (req, res, next) => {
  //console.log(req.query)

  if (!Object.keys(req.query).length) executeSQL(User.getAllUserSQL(), res)
  else executeSQL(User.getUserByQuerySQL(req.query), res)
})

// get 處理獲取單一筆的會員，使用id
router.get('/:userId', (req, res, next) => {
  executeSQL(User.getUserByIdSQL(req.params.userId), res, 'get', false)
})

// post 新增一筆會員資料
router.post('/', (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  console.log('POST new user')

  //從request json 資料建立新的物件
  let user = new User(
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.id_card,
    req.body.birthday,
    req.body.mobile,
    req.body.address,
    req.body.created_at
  )

  executeSQL(user.addUserSQL(), res, 'post', false, user)
})

//delete 刪除一筆資料
router.delete('/:userId', (req, res, next) => {
  executeSQL(User.deleteUserByIdSQL(req.params.userId), res, 'delete', false)
})

// put 更新一筆資料
router.put('/:userId', (req, res) => {
  let user = new User(
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.id_card,
    req.body.birthday,
    req.body.mobile,
    req.body.address
  )

  console.log(user)

  // id值為數字
  user.id = +req.params.userId

  executeSQL(user.updateUserByIdSQL(req.params.userId), res, 'put', false, user)
})

export default router
