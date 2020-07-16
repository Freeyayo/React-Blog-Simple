import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTitle } from "../actions/getAction";
import Mailbox from "./addons/mailbox";


class Articles extends React.Component{

    componentWillMount(){
        this.props.getTitle(); 
    }

    render(){
        let artsList = this.props.titles.map((item) => {
            return <li key = {item.id}>
                        <Link to = {`/${item.path}`}
                              style = {{
                                color: "rgba(0,0,0,0.65)",
                                textShadow: "1px 1px 1px #aaa"
                                }}>
                            {item.title}
                        </Link>
                    </li>  
         });
        return (
            <div className = "articles">
                <Mailbox/>
                {artsList}
            </div>
        )
    }

}

Articles.propTypes = {
    getTitle : PropTypes.func.isRequired,
    titles : PropTypes.array.isRequired 
}

const mapStateToProps = state => ({
    titles: state.gets.titles
})

export default connect(mapStateToProps, {getTitle})(Articles);