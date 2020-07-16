import React from "react";
import { Icon , Badge } from 'antd';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSubs } from "../../actions/getAction";
import { addSubs } from "../../actions/postAction";
import { updateSubSatus } from "../../actions/postAction";

// const sendmailApi = "http://localhost:3001/sendmail";


const sendmailApi = "http://119.23.244.156:39222/sendmail";

class Mailbox extends React.Component{
    constructor(props){
        super(props)
        this.input = React.createRef();
        this.state = {
            mask: "hide",
            isModalShow: false,
            isToModalShow: false,
            subs:[],
            mailStatus: "notsent",
            to: ""
        }
    }

    componentWillMount(){
        this.props.getSubs();
        let newSubs = this.props.subs.filter(item => {
            return !item["isRemoved"]
        })
        this.setState({
            subs: newSubs
        })
    }

    mailboxClickHandler = (e) => {
        e.preventDefault();
        const mask = document.querySelector("#mask");
        if(mask.className === "mask"){
            mask.setAttribute("class","mask showMask");
        }else if(mask.className === "mask showMask"){
            mask.setAttribute("class","mask hideMask");
        }else{
            mask.setAttribute("class","mask showMask");
        }
    }

    removeItemHandler = (id,title) => {
        let subs = this.state.subs;
        for(let i=0;i<subs.length;i++){
            if(subs[i]["title"] === title){
                subs[i]["isRemoved"] = true;
            }
        }
        let newSubs = this.props.subs.filter(item => {
            return !item["isRemoved"]
        })
        this.setState({
            subs: newSubs
        })
        this.props.updateSubSatus(subs);
        let el = document.querySelector("#modalitem"+id);
        // setTimeout(function(){
        //     el.parentNode.removeChild(el);
        // },250)
    }

    cancelHandler = (id) => {
        this.setState({
            isModalShow: false
        })
    }

    sendEmailHandler = () => {
        let to = this.state.to;
        if(this.props.subs.length === 0) return;
        this.setState({
            mailStatus: "sending"
        })
        let subsWillBeSent = this.props.subs.filter(item => {
            return !item["isRemoved"];
        });
        fetch(sendmailApi,{
            body: JSON.stringify([...subsWillBeSent,to]), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
              'user-agent': 'Mozilla/4.0 MDN Example',
              'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
        .then(res => {
            if(res.status === 200){
                console.log(res)
                this.setState({
                    mailStatus: "successful"
                })
            }else{
                this.setState({
                    mailStatus: "fail"
                })
            }
        })
    }

    editAndSendButtonHandler = () => {
        if(this.state.to.match(/^[\w\.\-]+@\w*[\.]?\w*/)){
            this.setState({
                isModalShow: true
            })
        }else{
            this.setState({
                isToModalShow: true
            })
        }
    }

    confirmButtonHandler = (event) => {
        let input = this.input.current.value;
        if(input.match(/^[\w\.\-]+@\w*[\.]?\w*/)){
            this.setState({
                to: input,
                isToModalShow: false,
                isModalShow: true
            })
        }else{
            this.setState({
                isToModalShow: false
            })
        }
    }

    render(){
        let list = this.props.subs.map(item => {
            return (
                <div className = "subsitem" style={{}} key={item.id}>
                    <div className = "subsitemTitle" style={{textAlign:"center"}}>
                    <Icon type="paper-clip" />
                        {item.title}
                    </div>
                    <div className = "subsitemButton" style={{textAlign:"center"}}></div>
                </div>
            )
        })
        let modalList = this.props.subs.map(item => {
            return (
                <div className = "subsitem modalitem" key={item.id} id = {"modalitem"+item.id}>
                    {item.title}
                    <div className = "modalButton minis" onClick = {this.removeItemHandler.bind(this,item.id,item.title)}>-</div>
                </div>
            )
        })

        let Button = setButton.bind(this)();

        function setButton(){
            if(this.state.mailStatus === "notsent"){
                return <button id="sendButton" onClick={this.sendEmailHandler}>✉️ click me!</button>;
            }else if(this.state.mailStatus === "sending"){
                return <button id="sendingText">✉️ sending...</button>;
            }else if(this.state.mailStatus === "successful"){
                return <button id="sentSuccess">✔️ success !</button>;
            }else if(this.state.mailStatus === "fail"){
                return <button id="sentFail">❌ try again later !</button>;
            }
        }

        return(
            <div className = "mailbox">
                <button id="editAndSendButton" onClick = {this.editAndSendButtonHandler}>Edit & Send</button>
                <a href="#" onClick = {this.mailboxClickHandler}>
                    <Badge count={this.props.subs.length} style={{backgroundColor:"orange"}}>
                        <Icon type="mail" theme="filled" style={{transform:"scale(2)"}}/>
                    </Badge>
                </a>
                <div className = "subscribes">
                    <div id="mask" className = "mask"></div>
                    {list}
                </div>
                <div style={{display:this.state.isToModalShow===true?"block":"none"}}>
                    <input id="modalInput" ref={this.input} type="text" placeholder="input email"></input>   
                    <button id="confirmButton" onClick={this.confirmButtonHandler}>done</button>
                </div>
                <div id = "modalHeader" className = "" style={{display:this.state.isModalShow===true?"block":"none"}}>
                    Subscribes {Button}
                    <button id="cancleButton" onClick={this.cancelHandler}>cancle</button>
                </div> 
                <div id = "modalMask" className = "" style={{display:this.state.isModalShow===true?"block":"none"}}>
                    {modalList}
                </div> 
            </div>
        )
    }
}

Mailbox.propTypes = {
    getSubs : PropTypes.func.isRequired,
    subs : PropTypes.array.isRequired 
}

const mapStateToProps = state => ({
    subs: state.posts.subs
})

export default connect(mapStateToProps, {getSubs,addSubs,updateSubSatus})(Mailbox);













