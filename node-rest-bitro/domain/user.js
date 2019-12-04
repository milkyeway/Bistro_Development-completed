class User {
  constructor(
    email,
    password,
    name,
    id_card,
    birthday,
    mobile,
    address
    // created_at
  ) {
    this.member_sid = 0
    this.name = name
    this.password = password
    this.email = email
    this.id_card = id_card
    this.mobile = mobile
    this.birthday = birthday
    this.address = address
    // this.login = 0
  }

  addUserSQL() {
    //INSERT INTO `address_book` (`member_sid`, `m_level`, `login`, `name`,  `id_card`, `email`, `username`, `password`, `mobile`, `birthday`, `address`, `created_at`) VALUES
    //(150, 'member', 0, '謝忞儒', '男', 'B122150455', 'kiss_yin_520@yahoo.com.tw', 'ben', 'ben', '0933777086', '2019-08-21', '台北市中山區龍江路415巷25號3樓', '2019-09-25 15:07:48');

    let sql = `INSERT INTO address_book (
      email, 
      password, 
      name, 
      id_card, 
      birthday, 
      mobile, 
      address, 
      created_at
      )
      VALUES(
      '${this.email}',
      '${this.password}',
      '${this.name}',
      '${this.id_card}',
      '${this.birthday}',
      '${this.mobile}',
      '${this.address}',
      NOW()
      )`
    // let sql = `INSERT INTO address_book(username, password, email, login, created_at) \
    //                VALUES('${this.username}', '${this.password}', '${this.email}', 0, NOW())`
    console.log(sql)
    return sql
  }

  updateUserByIdSQL(member_sid) {
    let sql = `UPDATE address_book \
               SET 
               email ='${this.email}',
               password = '${this.password}',
               name = '${this.name}',
               id_card ='${this.id_card}',
               birthday = '${this.birthday}',
               mobile = '${this.mobile}',
               address = '${this.address}' \
               WHERE 
               member_sid =  ${member_sid}`
    console.log(sql)
    return sql
  }

  // static是與實例化無關
  static getUserByIdSQL(member_sid) {
    let sql = `SELECT * FROM address_book WHERE member_sid = ${member_sid}`
    return sql
  }

  // static是與實例化無關
  static getUserByQuerySQL(query) {
    const where = []

    if (query.name) where.push(`name = '${query.name}'`)
    if (query.email) where.push(`email = '${query.email}'`)
    if (query.id_card) where.push(`id_card = '${query.id_card}'`)

    let sql = ''

    if (where.length)
      sql = `SELECT * FROM address_book WHERE ` + where.join(' OR ')
    else sql = `SELECT * FROM address_book`

    //console.log(sql)
    return sql
  }

  static deleteUserByIdSQL(member_sid) {
    let sql = `DELETE FROM address_book WHERE member_sid = ${member_sid}`
    return sql
  }

  static getAllUserSQL() {
    let sql = `SELECT * FROM address_book`
    return sql
  }
}

export default User
