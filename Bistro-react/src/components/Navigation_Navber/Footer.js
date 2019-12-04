import React from 'react'
//樣式
import '../../style/Home.scss'
//分頁連結


class Footer extends React.Component {
    constructor() {
        super()
    } render() {
        return (
            <>
                <div className="Home_footer">
                    <img className="Home_footer_img" src={"../images/Wine_Accessories/footer.png"}></img>
                </div>
            </>
        )
    }
}
export default Footer