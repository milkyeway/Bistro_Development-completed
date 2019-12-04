import React from 'react'
import { withRouter } from 'react-router-dom'

const Logout = props =>
  props.isAuth ? (
   props.signout(() => props.history.push('/'))
  
  ) : (
    <p>目前不是登入的狀態</p>
  )

// withRouter是一個高階元件樣式，
// 可以讓你的元件存取到更新的match, location, history等等屬性(props)
// 這裡使用它是為了history方法
export default withRouter(Logout)
