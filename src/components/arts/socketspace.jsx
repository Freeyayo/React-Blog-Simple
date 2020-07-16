import React from "react";
import { connect } from "react-redux";
import Mailbox from "../addons/mailbox";
import { Steps, Divider } from 'antd';
import { addSubs } from "../../actions/postAction";
  
const { Step } = Steps;
// const socket = require('socket.io-client')('http://localhost:3001');
const socket = require('socket.io-client')('http://119.23.244.156:39222');

let socketTimer;

let gender = "";
let btxt = "",gtxt = "";

const scale = .2;

let DirX = 0,DirY = 0;
let Speed = 5;
let lLeg = 25,rLeg = 0;
let mouse = 0;
let isrLegUp = true;
let isBoxShow = 0;

let gDirX = 0,gDirY = 0;
let glLeg = 25,grLeg = 0;
let gmouse = 0;
let gisrLegUp = true;
let gisBoxShow = 0;

class Socketspace extends React.Component{
    constructor(props){
        super(props);
        this.canvas = React.createRef();
        this.bbtn = React.createRef();
        this.gbtn = React.createRef();
        this.inputbox = React.createRef();
        this.inputvalue = React.createRef();
        this.state = {
            value: "",
            current: 0,
            isDisabled: false,
            isAdded: false
        }
    }

    onChange = current => {
        window.location = `/socketspace/#${current}`;
        this.setState({ current });
      };

    boySpeak = () => {
        isBoxShow = 1;
        if(mouseTimer)return;
        var mouseTimer = setInterval(() => {
            mouse = mouse===15?mouse=0:mouse=15;
        },100);
        setTimeout(() => {
            isBoxShow = 0;
            mouse = 0;
            clearTimeout(mouseTimer);
        },2000)
    }

    girlSpeak = () => {
        gisBoxShow = 1;
        if(gmouseTimer)return;
        var gmouseTimer = setInterval(() => {
            gmouse = gmouse===15?gmouse=0:gmouse=15;
        },100);
        setTimeout(() => {
            gisBoxShow = 0;
            gmouse = 0;
            clearTimeout(gmouseTimer);
        },2000)
    }

    createAnimation = () => {
        if(this.canvas.current === null){
            if(gender === "boy"){
                socket.emit("boy disconnected");
                window.removeEventListener("keydown",this.boyMovementHandler);
            }else{
                socket.emit("girl disconnected");
                window.removeEventListener("keydown",this.girlMovementHandler);
            }
            return;
        }
        let c = this.canvas.current.getContext("2d");
        requestAnimationFrame(this.createAnimation);
        c.fillStyle = `rgba(255,255,255,.3)`;
        c.clearRect(0,0,this.canvas.current.width,this.canvas.current.height);
        this.defaultBoy(DirX,DirY,Speed,btxt);
        this.defaultGirl(gDirX,gDirY,Speed,gtxt);
    }

    getInitialPosition = () => {
        socket.emit("chosen");
        socket.on("position", data => {
             DirX = data.boyData.x;DirY = data.boyData.y;
             gDirX = data.girlData.x;gDirY = data.girlData.y;
        });
        this.canvas.current.style.display = "block";
        this.inputbox.current.style.display = "none";
        this.bbtn.current.style.display = "none";
        this.gbtn.current.style.display = "none";
    }

    bbtnHandler = () => {
        socket.emit("boy")
        this.getInitialPosition();
        gender = "boy";
        this.inputbox.current.style.display = "block";
        this.addListeners();
        this.createAnimation();
    }

    gbtnHandler = () => {
        socket.emit("girl")
        this.getInitialPosition();
        gender = "girl";
        this.inputbox.current.style.display = "block";
        this.addListeners();
        this.createAnimation();
    }

    sendbtnHandler = () => {
        if(gender === "boy"){
            btxt = this.state.value;
            socket.emit("boy talking",btxt);
            this.boySpeak();
            this.inputvalue.current.value = "";
        }else if(gender === "girl"){
            gtxt = this.state.value;
            socket.emit("girl talking",gtxt);
            this.girlSpeak();
            this.inputvalue.current.value = "";
        }
    }

    handleInputChange = (e) => {
        this.setState({
            value : e.target.value
        })
    }

    componentDidMount(){
        const canvas = this.canvas.current;
        const bbtn = this.bbtn.current;
        const gbtn = this.gbtn.current;
        // const c = canvas.getContext("2d");
        canvas.width = 900;
        canvas.height = 500;

        // const scale = .2;

        socketTimer = setInterval(() => {
            socket.emit("tiktok");
        },1000)
        this.getInitialPosition();
        bbtn.style.display = "block" ;
        gbtn.style.display = "block";

        socket.on("boy message", message => {
            btxt = message;
            boySpeak();
        })

        socket.on("girl message", message => {
            gtxt = message;
            girlSpeak();
        })

        socket.on("createPerson",online => {
            console.log(online);
            for(let key in online){
                if(online[key]){
                    key === "boy" ? bbtn.style.display = "none" : gbtn.style.display = "none";
                }else{
                    key === "boy" ? bbtn.style.display = "block" : gbtn.style.display = "block";
                }
            }
        })

        socket.on("receivedBehavier", data => {
            if(data.gender === "boy"){
                DirX = data.x;
                DirY = data.y;
                lLeg = data.ll;
                rLeg = data.rl;
                mouse = data.m;
                isBoxShow = data.i;
                if(isBoxShow === 1){
                    boySpeak();
                }
            }else if(data.gender === "girl"){
                gDirX = data.x;
                gDirY = data.y;     
                glLeg = data.ll;
                grLeg = data.rl;
                gmouse = data.m;
                gisBoxShow = data.i;
                if(gisBoxShow === 1){
                    girlSpeak();
                }
            }
        })

        socket.on("user left", data => {
            data.gender === "boy" ? bbtn.style.display = "block" : gbtn.style.display = "block"
        })

        function boySpeak(){
            isBoxShow = 1;
            if(mouseTimer)return;
            var mouseTimer = setInterval(() => {
                mouse = mouse===15?mouse=0:mouse=15;
            },100);
            setTimeout(() => {
                isBoxShow = 0;
                mouse = 0;
                clearTimeout(mouseTimer);
            },2000)
        }

        function girlSpeak(){
            gisBoxShow = 1;
            if(gmouseTimer)return;
            var gmouseTimer = setInterval(() => {
                gmouse = gmouse===15?gmouse=0:gmouse=15;
            },100);
            setTimeout(() => {
                gisBoxShow = 0;
                gmouse = 0;
                clearTimeout(gmouseTimer);
            },2000)
        }
         

        window.addEventListener("scroll", this.scrollHandler);

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollHandler);
        clearInterval(socketTimer);
    }

    scrollHandler = (e) => {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // console.log(scrollTop);
        if(scrollTop>250&&scrollTop<590){
             if(this.state.current !== 0)
            this.setState({
                   current: 0
            })
        }else if(scrollTop>590&&scrollTop<890){
              if(this.state.current !== 1)
             this.setState({
                  current: 1
              })
        }else if(scrollTop>1650){
              if(this.state.current !== 2)
             this.setState({
                  current: 2
              })
        }
    }

    addListeners = () => {
        if(gender === "boy"){
            window.addEventListener("keydown", this.boyMovementHandler);

            window.addEventListener("keyup", () => {
                rLeg = 0;
                lLeg = 0;
                socket.emit("behavier", {gender:"boy",x:DirX,y:DirY,ll:lLeg,rl:rLeg,m:mouse,i:isBoxShow});
            },false)
        }else if(gender === "girl"){
            window.addEventListener("keydown", this.girlMovementHandler)

            window.addEventListener("keyup", () => {
                grLeg = 0;
                glLeg = 0;
                socket.emit("behavier", {gender:"girl",x:gDirX,y:gDirY,ll:glLeg,rl:grLeg,m:gmouse,i:gisBoxShow});
            },false)
        }
    }

    boyMovementHandler = event => {
        if(document.activeElement.id === "textarea"){
            return;
        }
        socket.emit("behavier", {gender:"boy",x:DirX,y:DirY,ll:lLeg,rl:rLeg,m:mouse,i:isBoxShow});
        let e = event || window.event;
        if(e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 ){
            isrLegUp = !isrLegUp;
        }
        if (isrLegUp) {
            lLeg = 25;
            rLeg = 0;
        }else{
            lLeg = 0;
            rLeg = 25;
        }

        switch (e.keyCode){
            case 87:     //up
                if(DirY <= 0){
                    DirY = 0;
                }else{
                    DirY += -1;
                }
                break;
            case 65:    //left
                if(DirX <= 0){
                    DirX = 0;
                }else{
                    DirX += -1;
                }
                break;
            case 83:    //down
                if(DirY >= 500 * .7 * .2){
                    DirY = 500 * .7 * .2;
                }else{
                    DirY += 1;
                }
                break;
            case 68:    //right
                if(DirX >= window.innerWidth * .5 *.2){
                    DirX = window.innerWidth * .5 *.2;
                }else{
                    DirX += 1;
                }
                break;
            default:
                return false;
        }
    }

    girlMovementHandler = event => {
        if(document.activeElement.id === "textarea"){
            return;
        }
        socket.emit("behavier", {gender:"girl",x:gDirX,y:gDirY,ll:glLeg,rl:grLeg,m:gmouse,i:gisBoxShow});
        let e = event || window.event;
        if(e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68 ){
            gisrLegUp = !gisrLegUp;
        }
        if (gisrLegUp) {
            glLeg = 25;
            grLeg = 0;
        }else{
            glLeg = 0;
            grLeg = 25;
        }

        switch (e.keyCode){
            case 87:     //up
                if(gDirY <= 0){
                    gDirY = 0;
                }else{
                    gDirY += -1;
                }
                break;
            case 65:    //left
                if(gDirX <= 0){
                    gDirX = 0;
                }else{
                    gDirX += -1;
                }
                break;
            case 83:    //down
                if(gDirY >= 500 * .7 * .2){
                    gDirY = 500 * .7 * .2;
                }else{
                    gDirY += 1;
                }
                break;
            case 68:    //right
                if(gDirX >= window.innerWidth * .5 *.2){
                    gDirX = window.innerWidth * .5 *.2;
                }else{
                    gDirX += 1;
                }
                break;
            default:
                return false;
        }
    }

    defaultBoy = (dirx,diry,speed,txt) => {
        let c = this.canvas.current.getContext("2d");
        c.fillStyle = "orange"; //face
        c.fillRect(200*scale+dirx*speed,200*scale+diry*speed,100*scale,100*scale);

        c.fillStyle = "brown";  //hair
        c.fillRect(200*scale+dirx*speed,170*scale+diry*speed,100*scale,30*scale);

        c.fillStyle = "black";  //brows
        c.fillRect(215*scale+dirx*speed,220*scale+diry*speed,20*scale,5*scale);
        c.fillRect(265*scale+dirx*speed,220*scale+diry*speed,20*scale,5*scale);
                                //eyes
        c.fillRect(220*scale+dirx*speed,230*scale+diry*speed,10*scale,10*scale);
        c.fillRect(270*scale+dirx*speed,230*scale+diry*speed,10*scale,10*scale);
                                //mouse
        c.fillRect(235*scale+dirx*speed,270*scale+diry*speed,30*scale,(5+mouse)*scale);
                                //body
        c.fillRect(200*scale+dirx*speed,300*scale+diry*speed,100*scale,100*scale);
                                //arms
        c.fillStyle = "orange"; 
        c.fillRect(180*scale+dirx*speed,300*scale+diry*speed,20*scale,100*scale);
        c.fillRect(300*scale+dirx*speed,300*scale+diry*speed,20*scale,100*scale);
                                //legs
        c.fillRect(210*scale+dirx*speed,400*scale+diry*speed,30*scale,(50-lLeg)*scale);
        c.fillRect(260*scale+dirx*speed,400*scale+diry*speed,30*scale,(50-rLeg)*scale);
                                //box
        //strokeRoundRect(c, 360*scale+dirx*speed, -100*scale+diry*speed, 600*scale, 150*scale, 30*scale);
                                //text
        let text = txt;
        c.font="13px Georgia";
        c.fillStyle = `rgba(0,0,0,${isBoxShow})`;
        c.fillText(text,400*scale+dirx*speed, 0*scale+diry*speed);  
    }

    defaultGirl = (dirx,diry,speed,txt) => {
        let c = this.canvas.current.getContext("2d");
        c.fillStyle = "#f6e1c3";    //face
        c.fillRect(200*scale+dirx*speed,200*scale+diry*speed,100*scale,100*scale);

                                //hair
        c.fillStyle = "#ffeb3b";
        c.fillRect(200*scale+dirx*speed,170*scale+diry*speed,100*scale,30*scale);
        c.fillRect(180*scale+dirx*speed,200*scale+diry*speed,30*scale,80*scale);
        c.fillRect(290*scale+dirx*speed,200*scale+diry*speed,30*scale,80*scale);
                                //brows
        c.fillStyle = "black";
        c.fillRect(215*scale+dirx*speed,220*scale+diry*speed,20*scale,5*scale);
        c.fillRect(265*scale+dirx*speed,220*scale+diry*speed,20*scale,5*scale);
                                //eyes
        c.fillRect(220*scale+dirx*speed,230*scale+diry*speed,10*scale,10*scale);
        c.fillRect(270*scale+dirx*speed,230*scale+diry*speed,10*scale,10*scale);
                                //mouse
        c.fillRect(235*scale+dirx*speed,270*scale+diry*speed,30*scale,(5+gmouse)*scale);
                                //body
        c.fillStyle = "pink";
        c.fillRect(200*scale+dirx*speed,300*scale+diry*speed,100*scale,100*scale);
                                //arms
        c.fillStyle = "#f6e1c3";    
        c.fillRect(180*scale+dirx*speed,300*scale+diry*speed,20*scale,100*scale);
        c.fillRect(300*scale+dirx*speed,300*scale+diry*speed,20*scale,100*scale);
                                //legs
        c.fillRect(210*scale+dirx*speed,400*scale+diry*speed,30*scale,(50-glLeg)*scale);
        c.fillRect(260*scale+dirx*speed,400*scale+diry*speed,30*scale,(50-grLeg)*scale);
                                //box
        //strokeRoundRect(c, 360*scale+dirx*speed, -100*scale+diry*speed, 600*scale, 150*scale, 30*scale);
                                //text
        let text = txt;
        c.font="13px Georgia";
        c.fillStyle = `rgba(0,0,0,${gisBoxShow})`;
        c.fillText(text,400*scale+dirx*speed, 0*scale+diry*speed);
    }

    addToMail = () => {
        this.setState({
            isDisabled: true
        })
        for(let item of this.props.subs){
            if(item["title"]==="SocketSpace"&&item["isRemoved"]===false){
                this.setState({
                    isAdded: true
                })
                return;
            }
        }
        this.props.addSubs({
            title: "SocketSpace",
            id: 2,
            isRemoved: false
        });
    }
    
    render(){
        const { current } = this.state;

        return(
            <div className = "article_content">
                 <h1>Socket Space</h1>
                 <Divider orientation="right"><button disabled={this.state.isDisabled} className = "addButton" style={{fontFamily:"Open Sans Condensed",borderRadius:"22px"}} onClick={this.addToMail}>{this.state.isAdded===false?(this.state.isDisabled===false?"Add to Mailbox":"Adding..."):"Added"}</button></Divider>
                 <Steps current={current} onChange={this.onChange} direction="vertical" style = {{position: "fixed"}}>
                      <Step title="Demonstration" description="snake game" />
                      <Step title="Principle" description="canvas & logic" />
                      <Step title="Conclusion" description="" />
                 </Steps>
                 <div className = "contentText">
                    <h2 id="0">Demonstration</h2>
                 </div>
                 <div id="socketspacecanvascontainer">
                     <canvas ref = { this.canvas } id = "socketspacecanvas"></canvas>
                     <button ref = { this.bbtn } className="choosebtn" id="bbtn" onClick={this.bbtnHandler}>BOY</button>
                     <button ref = { this.gbtn } className="choosebtn" id="gbtn" onClick={this.gbtnHandler}>GIRL</button>
                     <div className="inputBox" ref = { this.inputbox }>
                         <input id="textarea" ref = { this.inputvalue } type="text" name="" maxLength="25" onChange={this.handleInputChange}/>
                         <button id="sendbtn" onClick={this.sendbtnHandler}>send</button>
                     </div>
                 </div>
                 <div className = "contentText">
                    <h2 id="1">Principle</h2>
                    <p>
                        <span className = "paraStart">S</span>nake game has a long history in programming world.In 1997,Snake met the people  for the first time
                         on Nokia 6110.I remember when I was a child,I was crazy about playing Snake on my grandpa's Nokia.The shape of a tiny black snake and it's 
                         food stuck in my heart.
                        <br/>
                        <br/>
                        The purpose of the game is to survive as far as you can,and snake will grow longer after eating a food.Only four keys to operate the snake,
                        they are UP,DOWN,LEFT,RIGHT.In theory,the endding of this game is to fill all the space with snake's body,in fact,as snake growing longer,the harder
                         people could manipulate it without making mistake.Once there's a mistake happen,then game over.
                        <br/>
                        <br/>
                        Creating the snake game in javascript with canvas,in my opinion,there're some principles:
                        <br/>
                        1.Using an Array to store snake's body.
                        <br/>
                        2.To realize snake‘s moving,pop the tail and unshift the new position to the head.
                        <br/>
                        3.Before generating food randomly,check the whole body's array item to make sure food will not occupy the position of every node of body.
                        <br/>
                        4.Make collision tests,such as striking the wall and snake itself.
                        <br/>
                        <br/>
                        How to make it move?
                        <br/>
                        Using an array to store head and bodies <span className="code">let bodies = [body[0],body[1],body[2]]</span>.Of course the first item is the head.
                        Every item is an object has coordinate <span className="code">x: .., y: ..</span>.This object records position of the snake's body real time.
                        <br/>
                        <span className="code">setInterval(animation, interval)</span> can make snake move.Add an <span className="code">addEventListener</span> to monitor user's action
                         of pressing keys.Using global variable to store directions that user want snake to move and it can change the snake's moving direction dynamically.
                    </p>
                    <h2 id="2">Conclusion</h2>
                    <p>
                        <span className = "paraStart">I</span>n this demo,I just used pure javascript less than 100 lines.I think it contains all the basic features that a Snake should have.
                        <br/>
                        <br/>
                        There are still some notes:
                        <br/>
                        1.To realize a composite motion,an important point is to find out the regulation of motion's cycle and add another cycle on the cycle's variable of previous one.
                        <br/>
                        2.Choosing a proper refreshing methond could lead a awesome result.
                        <br/>
                        3.While creating complex canvas or something else,dat.gui is a wonderful tool and handy one.It allows developers set any arguments and visualize them on the screen.
                        <br/>
                        4.Using interval to controll the speed of snake.
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

export default connect(mapStateToProps, { addSubs } )(Socketspace);