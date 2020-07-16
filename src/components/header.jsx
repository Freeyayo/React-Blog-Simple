import React from "react";
import { Link } from "react-router-dom";
import { AutoComplete , Icon } from 'antd';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTitle } from "../actions/getAction";
import { withRouter } from 'react-router-dom';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : []
        }
    }

    componentWillMount(){
        this.props.getTitle(); 
    }

    handleSearch = value => {
        if(!value){
            this.setState({
                data : []
            })
        }else{
            this.setState({
                data : [...this.props.titles.map(item => item.title).filter((item) => {
                    return item.toLowerCase().indexOf(value) !== -1
                })]
            })
        }
    }

    handleSelect = value => {
        this.props.history.push(`/${value.replace(/ /ig,"").toLowerCase()}`)
    }
    
    render(){
        const { data } = this.state;  
        return(
            <div className = "header">
                <div className = "headerText">
                    "There is no blue without yellow and without orange."
                </div>
                <AutoComplete
                dataSource={ data }
                placeholder="input search text"
                onSearch={ this.handleSearch }
                onSelect={this.handleSelect}
                style={{ width: 200, height: 30, marginTop: 5}}
                /> 
                <div id="home">
                    <Link to = "/"><Icon type="home"/></Link>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    getTitle : PropTypes.func.isRequired,
    titles : PropTypes.array.isRequired 
}

const mapStateToProps = state => ({
    titles: state.gets.titles
})

export default connect(mapStateToProps, {getTitle})(withRouter(Header));