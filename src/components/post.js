import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postAction";

class Posts extends React.Component{
    componentWillMount(){
        this.props.fetchPosts(); 
    }

    render(){
        const postItems = this.props.posts.map(post => {
            return (
                <div key = {post.id}>
                    <h3>{post.title}</h3>
                    <span>{post.item}</span>
                </div>
            ) 
        })
        return(
            <div>
                <h1>Posts</h1> 
                {postItems}
            </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts : PropTypes.func.isRequired,
    posts : PropTypes.array.isRequired 
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(Posts);