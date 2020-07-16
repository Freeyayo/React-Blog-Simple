import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../actions/postAction";

class PostForm extends React.Component{
    fetchProfile = () => {
        this.props.createPost();
    }

    render(){
        const profile = this.props.posts;
        return(
            <div>
                <h2>Item</h2> 
                <button onClick = {this.fetchProfile}>
                    get info
                </button>
                <p>{profile.id}</p>
            </div>
        )
    }
}

// PostForm.PropTypes = {
//     createPost : PropTypes.func.isRequired,
//     posts : PropTypes.object.isRequired 
// }

const mapStateToProps = state => ({
    posts: state.posts.item
})

export default connect(mapStateToProps, { createPost })(PostForm);