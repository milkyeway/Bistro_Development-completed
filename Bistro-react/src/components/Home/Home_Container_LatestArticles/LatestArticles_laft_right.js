import React from 'react'
import AOS from 'aos';
import { Link } from 'react-router-dom'

class LatestArticles_laft_right extends React.Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        AOS.init({
            duration: 1500
        })
    }

    render() {
        return (
            <>
                <div className="figure_Latest" data-aos='fade-left'>
                    <Link to={`/Blog_article/${this.props.sid}`} className="figure_Latest_a">
                        <p className="figure_Latest_p">{this.props.title}</p>
                        <img className="figure_Latest_img" src={`../images/Blog/${this.props.pic}.jpg`} />
                    </Link>
                </div>
            </>
        )
    }
}
export default LatestArticles_laft_right