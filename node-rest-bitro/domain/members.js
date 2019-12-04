class Members {
    constructor(name, email, password, mobile, birthday, address, about_me, gender) {
        this.customer_id = 0
        this.customer_name = name
        this.customer_email = email
        this.customer_password = password
        this.customer_mobile = mobile
        this.customer_mobile = birthday
        this.customer_mobile = address
        this.customer_mobile = about_me
        this.customer_mobile = gender
    }

    addMemberSQL() {
        let sql = `INSERT INTO customer_information (name, price) \
                   VALUES('${this.prd_name}',${this.prd_price})`
        return sql
    }

    updateMemberByIdSQL(customer_id) {
        let sql = `UPDATE customer_information SET name="${this.customer_name}" , email="${this.customer_email}, password="${this.customer_password}" WHERE sid=${customer_id} `
        return sql
    }

    static getMemberByIdSQL(prd_id) {
        let sql = `SELECT * FROM customer_information WHERE sid = ${prd_id}`
        return sql
    }

    static deleteMemberByIdSQL(prd_id) {
        let sql = `DELETE FROM customer_information WHERE sid = ${prd_id}`
        return sql
    }

    static getAllMemberSQL() {
        let sql = `SELECT * FROM customer_information`
        return sql
    }


}

export default Members
