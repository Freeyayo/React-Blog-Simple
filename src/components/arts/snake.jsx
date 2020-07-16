import React from "react";
import { connect } from "react-redux";
import Mailbox from "../addons/mailbox";
//import { withRouter } from 'react-router-dom';
import { Steps, Divider } from 'antd';
import { addSubs } from "../../actions/postAction";

const { Step } = Steps;


class Snake extends React.Component{
    constructor(props){
        super(props);
        this.canvas = React.createRef();
        this.state = {
            current: 0,
            isDisabled: false,
            isAdded: false
        }
    }

    onChange = current => {
        //this.props.history.push(`/sinewave/#${current}`);
        window.location = `/snake/#${current}`;
        this.setState({ current });
      };

    componentWillMount(){
        
    }

    componentDidMount(){
        const canvas = this.canvas.current;
        const c = canvas.getContext("2d");
        canvas.width = 900;
        canvas.height = 500;
        let box = 10;
        let dirX = 1,dirY = 0;
        let ranX = box*Math.round((Math.random()*canvas.width)/box),
            ranY = box*Math.round((Math.random()*canvas.height)/box);
        let newX, newY, tid;
        let head = [
            {
                x: 20,
                y: 15
            },
            {
                x: 19,
                y: 15
            },
            {
                x: 18,
                y: 15
            }
        ];
        animation();
        function animation(){
            c.clearRect(0,0,canvas.width,canvas.height);
            food();
            let length = head.length, i;

            for(i = 0; i < length; i++){
                c.fillStyle = "white";
                c.fillRect(head[i]["x"]*box,head[i]["y"]*box,box,box);
            }
            newX = head[0]["x"]+dirX;
            newY = head[0]["y"]+dirY;
            if(newX === (ranX/box) && newY === ranY/box){
                ranX = box*Math.round((Math.random()*canvas.width)/box);
                ranY = box*Math.round((Math.random()*canvas.height)/box);
            }else{
                if(newX * box > canvas.width || newX < 0 || newY * box > canvas.height || newY < 0){
                    return;
                }
                for(let j = 0; j < length; j++){
                    if(newX === head[j]["x"] && newY === head[j]["y"]){
                        return;
                    }
                }
                head.pop();
            }
            head.unshift({x:newX,y:newY});
        }
        function food(){
            for(let i = 0; i < head.length; i++){
                if(ranX/box === head[i]["x"] && ranY/box === head[i]["y"]){
                    ranX = box*Math.round((Math.random()*canvas.width)/box);
                    ranY = box*Math.round((Math.random()*canvas.height)/box);
                    food();
                }else{
                    c.fillStyle = "white";
                    c.fillRect(ranX,ranY,box,box);  
                }
            }
        }
        window.addEventListener("keydown",event => {
            let e = event || window.event;
            if(typeof tid === "undefined"){
                 tid = setInterval(animation,50);
            }
            switch (e.keyCode){
                case 87:     //up
                    if(dirY !== 1){
                        dirY = -1;
                        dirX = 0;
                    }
                    break;
                case 65:    //left
                    if(dirX !== 1){
                        dirX = -1;
                        dirY = 0;
                    }
                    break;
                case 83:    //down
                    if(dirY !== -1){
                        dirY = 1;
                        dirX = 0;
                    }
                    break;
                case 68:    //right
                    if(dirX !== -1){
                        dirX = 1;
                        dirY = 0;
                    }
                    break
                default:
                    return false;
            }
        } ,false);

        window.addEventListener("scroll", this.scrollHandler);

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    addToMail = () => {
        this.setState({
            isDisabled: true
        })
        for(let item of this.props.subs){
            if(item["title"]==="Snake"&&item["isRemoved"]===false){
                this.setState({
                    isAdded: true
                })
                return;
            }
        }
        this.props.addSubs({
            title: "Snake",
            id: 3,
            isRemoved: false
        });
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
    
    render(){
        const { current } = this.state;
        return(
            <div className = "article_content">
                 <h1>Snake</h1>
                 <Divider orientation="right"><button disabled={this.state.isDisabled} className = "addButton" style={{fontFamily:"Open Sans Condensed",borderRadius:"22px"}} onClick={this.addToMail}>{this.state.isAdded===false?(this.state.isDisabled===false?"Add to Mailbox":"Adding..."):"Added"}</button></Divider>
                 <Steps current={current} onChange={this.onChange} direction="vertical" style = {{position: "fixed"}}>
                      <Step title="Demonstration" description="snake game" />
                      <Step title="Principle" description="canvas & logic" />
                      <Step title="Conclusion" description="" />
                 </Steps>
                 <div className = "contentText">
                    <h2 id="0">Demonstration</h2>
                 </div>
                 <canvas ref = { this.canvas } id = "snakecanvas"></canvas>
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
                        Every item is an object which has coordinate <span className="code">x: .., y: ..</span>.This object records position of the snake's body real time.
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


// Snake.propTypes = {
//     getSubs : PropTypes.func.isRequired,
//     subs : PropTypes.array.isRequired 
// }

const mapStateToProps = state => ({
    subs: state.posts.subs
})



export default connect(mapStateToProps, { addSubs } )(Snake);







