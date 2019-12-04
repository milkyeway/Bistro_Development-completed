import express from 'express'
import db from '../db/database'
import Product from '../domain/goods'

var bluebird = require('bluebird')
bluebird.promisifyAll(db)

const router = express.Router()

router.use((req, res, next) => { console.log('passed router.use at goods API ');next();})

router.get('/', (req, res, next) => {
    db.query(Product.getAllTestSQL(), (err, data) => {
      if (!err) {
        res.status(200).json(data)
      }
    })
  })
  
  router.get('/:testId', (req, res, next) => {
    let pid = req.params.testId
    db.query(Product.getTestByIdSQL(pid), (err, data) => {
      if (!err) {
        if (data && data.length > 0) {
          res.status(200).json({
            message: 'Test found.',
            test: data,
          })
        } else {
          res.status(200).json({
            message: 'Test Not found.',
          })
        }
      }
    })
  })
  
  router.post('/addlove', (req, res, next) => {
    //read product information from request
    console.log(req.body)
    let pid = req.body.goodsid
    let cid = req.body.customer_id
    // let product = new Product(req.body.prd_name, req.body.prd_price)
  
    // db.query(product.addLoveSQL(pid), (err, data) => {
    //   res.status(200).json({
    //     message: 'Test added.',
    //     testId: data,
    //   })
    // })
    const sql = `INSERT INTO fm_goods_cart (fm_goods_cart_id, farmer_product, main_cart, quantity, status, creat_at)
    VALUES (NULL, '${pid}', '${cid}', '1', '收藏中', '2019-08-19 00:00:00')`
    db.query(sql, (error, results, fields) => {
        console.log(error)
        res.json(results)
        console.log("有了啦")
    })
  })
  
  router.post('/addcart', (req, res, next) => {
    //read product information from request
    console.log(req.body)
    let pid = req.body.goodsid
    let cid = req.body.customer_id
    let num = (!req.body.num)?1:req.body.num
 
    const sql = `INSERT INTO fm_goods_cart (fm_goods_cart_id, farmer_product, main_cart, quantity, status, creat_at)
    VALUES (NULL, '${pid}', '${cid}', '${num}', '購物中',NOW())`
    db.query(sql, (error, results, fields) => {
        console.log(error)
        res.json(results)
        console.log("有了啦")
    })
  })



  router.put('/:testId', (req, res, next) => {
    let pid = req.params.testId
     let product = new Product(req.body.name, req.body.price)
     db.query(product.updateTestByIdSQL(pid), (err, data) => {
       if (!err) {
        if (data && data.length > 0) {
          res.status(200).json({
            message: 'Test found.',
            test: data,
          })
        } else {
          res.status(200).json({
            message: 'Test Not found.',
          })
        }
      }
    })
  })
  
  router.delete('/:testId', (req, res, next) => {
    let pid = req.params.testId
  
    db.query(Product.deleteTestByIdSQL(pid), (err, data) => {
      if (!err) {
        if (data && data.affectedRows > 0) {
          res.status(200).json({
            message: `Test deleted with id = ${pid}.`,
            affectedRows: data.affectedRows,
          })
        } else {
          res.status(200).json({
            message: 'Test Not found.',
          })
        }
      }
    })
  })

module.exports = router
