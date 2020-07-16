import React from "react";
import { Link } from "react-router-dom";
import { Divider } from 'antd';
import Body from "./body";

class Content extends React.Component{
    
    render(){
        return(
            <div>
                <Body/>
                <div className = "content">
                    <Divider><span role="img" aria-label="icon">🌙</span></Divider>
                    <p><Link to = "/articles"
                        style = {{color: '#788346'}}>ART</Link></p>
                    <p><Link to = "/bio"
                        style = {{color: '#788346'}}>BIO</Link></p>
                    <p><Link to = "/ots"
                        style = {{color: '#788346'}}>OTS</Link></p>
                </div>
            </div>
        )
    }
}

export default Content;