import React from "react";
import { connect } from "react-redux";
import Mailbox from "../addons/mailbox";
//import { withRouter } from 'react-router-dom';
import { Steps, Divider } from 'antd';
import { addSubs } from "../../actions/postAction";

const { Step } = Steps;

class SineWave extends React.Component{
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
        window.location = `/sinewave/#${current}`;
        this.setState({ current });
      };

    componentDidMount(){
        let increament = 0;
        const canvas = this.canvas.current;
        const c = canvas.getContext("2d");

        canvas.width = 900;
        canvas.height = 500;

        animation();

        function animation(){
            requestAnimationFrame(animation);
            c.fillStyle = `rgba(0, 0, 0, .02)`;
            c.fillRect(0, 0, canvas.width, canvas.height);
            c.beginPath();
            c.moveTo(0, canvas.height / 2);
            for(let i = 0; i < canvas.width; i++){
                c.lineTo(i, Math.sin(increament) * 30 * Math.sin((i / 50) + increament) + canvas.height / 2);
            }
            c.strokeStyle = `rgba(167,10,10,1)`;
            c.stroke();
            increament += .025;
        }

        window.addEventListener("scroll", this.scrollHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollHandler);
    }

    scrollHandler = (e) => {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //console.log(scrollTop);
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

    addToMail = () => {
        this.setState({
            isDisabled: true
        })
        for(let item of this.props.subs){
            if(item["title"]==="Sinewave"&&item["isRemoved"]===false){
                this.setState({
                    isAdded: true
                })
                return;
            }
        }
        this.props.addSubs({
            title: "Sinewave",
            id: 1,
            isRemoved: false
        });
    }
    
    render(){
        const { current } = this.state;

        return(
            <div className = "article_content">
                 <h1>Sine Wave</h1>
                 <Divider orientation="right"><button disabled={this.state.isDisabled} className = "addButton" style={{fontFamily:"Open Sans Condensed",borderRadius:"22px"}} onClick={this.addToMail}>{this.state.isAdded===false?(this.state.isDisabled===false?"Add to Mailbox":"Adding..."):"Added"}</button></Divider>
                 <Steps current={current} onChange={this.onChange} direction="vertical" style = {{position: "fixed"}}>
                      <Step title="Demonstration" description="A virtual 3D show case" />
                      <Step title="Principle" description="canvas & sine" />
                      <Step title="Conclusion" description="" />
                 </Steps>
                 <div className = "contentText">
                    <h2 id="0">Demonstration</h2>
                 </div>
                 <canvas ref = { this.canvas } id = "sinewavecanvas"></canvas>
                 <div className = "contentText">
                    <h2 id="1">Principle</h2>
                    <p>
                        <span className = "paraStart">A</span>s you can no longer abide that creating effects,such as 
                        using canvas,only dull graphics.You want your app cooler or some more 
                        dynamic things.This example will demonstrate you a tricky way to upgrade your app.
                        <br/>
                        <br/>
                        Many effects look nice and they seem should be pretty hard 
                        to realized,but in fact,most complex things to be composed by simple pieces.Like you saw the Sine Wave above,
                        it looks cool and didn't require any 3D or animation library such as Three.js,only pure javascript.
                        <br/>
                        <br/>
                        The principle of it are two points:
                        <br/>
                        1.making peaks of the sine wave change in cycle.
                        <br/>
                        2.refreshing canvas with <span className="code">fillRect()</span>,and set it's rgba.
                        <br/>
                        <br/>
                        How to make it move?
                        <br/>
                        Creating an variable to store an increament.Note that the increament variable should be irrelevent to every refresh.
                        It says the increament variable should be a global variable.
                        <br/>
                        In each cycle,we use <span className="code">moveTo(x,y)</span> and <span className="code">lineTo(x,y)</span> to draw a sine 
                        on canvas every frame.We can change y value of <span className="code">lineTo(x,y)</span> in a sine way with placing a <span className="code">Math.sin()</span>.
                    </p>
                    <h2 id="2">Conclusion</h2>
                    <p>
                        <span className = "paraStart">I</span>n this demo,I just used pure javascript then create a,maybe,virtual 3D wave effection.It looks better than dull wave moving there,the 
                        sine wave looks dynamic.For now,by following the principle that useing simple creating complex,can make many good effects flexibly.
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
                        4.Always use <span className="code">requestAnimationFrame()</span>.
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

export default connect(mapStateToProps, { addSubs } )(SineWave);