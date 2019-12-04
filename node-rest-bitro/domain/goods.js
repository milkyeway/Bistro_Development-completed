class Product {
    constructor(name, price) {
        this.prd_id = 0
        this.prd_name = name
        this.prd_price = price
    }

    addLoveSQL() {
        let sql = `INSERT INTO fm_goods_cart (fm_goods_cart_id, farmer_product, main_cart, quantity, status, creat_at)
         VALUES (NULL, '69', '1', '1', '收藏中', '2019-08-19 00:00:00')`
        return sql

        
    }

    updateTestByIdSQL(prd_id) {
        let sql = `UPDATE test SET name="${this.prd_name}" , price="${this.prd_price}" WHERE sid=${prd_id} `
        return sql
    }

    static getTestByIdSQL(prd_id) {
        let sql = `SELECT * FROM test WHERE sid = ${prd_id}`
        return sql
    }

    static deleteTestByIdSQL(prd_id) {
        let sql = `DELETE FROM test WHERE sid = ${prd_id}`
        return sql
    }

    static getAllTestSQL() {
        let sql = `SELECT * FROM test`
        return sql
    }


}

export default Product
