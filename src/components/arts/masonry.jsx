import React from "react";
import { connect } from "react-redux";
import Mailbox from "../addons/mailbox";
//import { withRouter } from 'react-router-dom';
import { Divider } from 'antd';
import { addSubs } from "../../actions/postAction";

// import "node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';


class Masonry extends React.Component{
    constructor(props){
        super(props);
        this.canvas = React.createRef();
        this.state = {
            isDisabled: false,
            isAdded: false
        }
    }

    addToMail = () => {
        this.setState({
            isDisabled: true
        })
        for(let item of this.props.subs){
            if(item["title"]==="Masonry"&&item["isRemoved"]===false){
                this.setState({
                    isAdded: true
                })
                return;
            }
        }
        this.props.addSubs({
            title: "Masonry",
            id: 0,
            isRemoved: false
        });
    }
    
    render(){

        return(
            <div className = "article_content">
                 <h1>Masonry</h1>
                 <Divider orientation="right"><button disabled={this.state.isDisabled} className = "addButton" style={{fontFamily:"Open Sans Condensed",borderRadius:"22px"}} onClick={this.addToMail}>{this.state.isAdded===false?(this.state.isDisabled===false?"Add to Mailbox":"Adding..."):"Added"}</button></Divider>
                 <div className = "contentText">
                    <h2 id="0">Demonstration</h2>
                 </div>
                 <div id="masonryVideo">
                     <Player
                      playsInline
                      poster=""
                      src={process.env.PUBLIC_URL+"/assets/waterfall.mp4"}
                     />
                 </div>
                 <a id="masonryLink" href="http://119.23.244.156:39111/waterfall">open online</a>
                 <div className = "contentText" style={{marginTop: "60px"}}>
                    <p>
                        <span className = "paraStart">W</span>hat is Masonry?
                        <br/>
                        <br/>
                        Masonry is a JavaScript grid layout library.
                        It works by placing elements in optimal position based on available vertical space,
                        sort of like a mason fitting stones in a wall.
                        You’ve probably seen it in use all over the Internet.
                        <br/>
                        <br/>
                        A masonry layout is a great way to display your posts,
                        especially when you want to show off your beautiful photography.
                        In this article, we will share how to create a masonry layout in WordPress.
                        A masonry layout is a Pinterest like grid that displays your posts in vertical columns.
                    </p>
                 </div>
                 <Mailbox/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    subs: state.posts.subs
})

export default connect(mapStateToProps, { addSubs } )(Masonry);