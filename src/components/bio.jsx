import React from "react";
let page = 1;

class Bio extends React.Component{
    constructor(props){
        super(props);
        this.canvas = React.createRef();
    }

    componentDidMount(){
        const canvas = this.canvas.current;
        const c = canvas.getContext("2d");

        canvas.width = window.innerWidth*.8;
        canvas.height = window.innerHeight*.9;

        let originalX = canvas.width / 2;
        let originalY = canvas.height / 2;
        const Radius = .1;
        const particles = [];

        animation();

        function Particle(x,y,radius,borderColor,innerColor){
            this.x = x;
            this.y = y;
            // this.velocity = .03 * Math.random() + .02;
            this.velocity = .01;
            this.radius = radius;
            this.borderColor = borderColor;
            this.innerColor = innerColor;
            this.radians = Math.random() * Math.PI * 2; 
            this.randomR = 100 + Math.random() * (canvas.width / 2);

            this.draw = () => {
                c.beginPath();
                c.strokeStyle = this.borderColor;
                c.fillStyle = this.innerColor;
                c.arc(this.x,this.y,this.radius,0,2*Math.PI);
                c.fill();
                c.stroke();
            }

            this.update = () => {
                this.radians += this.velocity;
                this.x = x + this.randomR*Math.sin(this.radians);
                this.y = y + this.randomR*Math.cos(this.radians);
                this.draw();
            }
        }

        function animation(){
            requestAnimationFrame(animation);
            c.fillStyle = `rgba(255,255,255,.04)`;
            c.fillRect(0,0,canvas.width,canvas.height);
            particles.forEach(particle => {
                particle.update();
            })
        }

        for(let i = 0; i < 50; i++){
            particles.push(new Particle(
                        originalX,
                        originalY,
                        Radius,
                        "gray",
                        "gray"
                        )
            )
        }

        const next = document.querySelector("#nextPage");
        next.addEventListener("click",nextHandler,false);

        function nextHandler(){
            if(page === 3){
                next.innerHTML = "review ... ";
            }else{
                next.innerHTML = "next ->";
            }
            document.querySelector(`#page${page}`).style.display = "none";

            if(page < 4){
                document.querySelector(`#page${page+1}`).style.display = "block";
                document.querySelector(`#page${page+1}`).setAttribute("class","fadeIn");
                page++;
            }else{
                page = 1;
                document.querySelector(`#page${page}`).style.display = "block";
                document.querySelector(`#page${page}`).setAttribute("class","fadeIn");
            }
        }
    }
    
    render(){
        return(
            <div id="biocontainer">
                <div id="title">Career  &   Projects</div>
                <div id="page1">
                    <div id="bioLine1">
                        <span className="variable">const</span> <span className="variableName">Name</span> <span className="equal">=</span> " <span className="string">Conghao Cai</span> 👼";
                    </div>
                    <div id="bioLine2">
                        <span className="variable">const</span> <span className="variableName">Birth</span> <span className="equal">=</span> " <span className="string">May 6th</span> ";
                    </div>
                    <div id="bioLine3">
                        <span className="variable">const</span> <span className="variableName">Height</span> <span className="equal">=</span> " <span className="string">178 cm</span> ";
                    </div>
                    <div id="bioLine4">
                        <span className="variable">let</span> <span className="variableName">Weight</span> <span className="equal">=</span> " <span className="string">65 kg</span> ";
                    </div>
                    <div id="bioLine5">
                        <span className="variable">const</span> <span className="variableName">Hobbies</span> <span className="equal">=</span> ["<span className="string">Soccer</span>","<span className="string">Games</span>","<span className="string">Old Films</span>","<span className="string">New Things</span>"];
                    </div>
                    <div id="bioAvatar">
                        <img alt="" src={process.env.PUBLIC_URL+"/assets/bioavatar.png"}/>
                    </div>
                </div>

                <div id="page2">
                    <div id="bio2Line1">
                    
                    </div>
                    <div id="bio2Line2">
                        <span className="variable">成都亚林古建筑设计公司</span> 旅游策划部 <span className="variableName">官网开发</span> 2016.1 - 2017.10
                    </div>
                    <div id="bio2Line3">
                        <span className="variable">博谊商贸有限公司</span> 前端开发技术部门 <span className="variableName">前端开发</span> 2017.12 - 2018.3
                    </div>
                    <div id="bio2Line4">
                        <span className="variable">北京指尖灵动广告有限公司</span> 前端部门 <span className="variableName">前端开发</span> 2018.4 - 2018.9
                    </div>
                    <div id="bio2Line5">
                        <span className="variable">北京指尖灵动广告有限公司</span> 技术事业部 <span className="variableName">前端开发工程师</span> 2018.10 - 2019.4
                    </div>
                    <div id="bioAvatar2">
                        <img alt="" src={process.env.PUBLIC_URL+"/assets/bioavatar2.png"}/>
                    </div>
                </div>

                <div id="page3">
                    <div id="bio3Line1">
                    What can I do ?
                    </div>
                    <div id="bio3Line2">
                        Modern JavaScript , TypeScript 
                    </div>
                    <div id="bio3Line3">
                        React , ReactNative , Vue , MiniProgram , Electron 
                    </div>
                    <div id="bio3Line4">
                        Jquery , Webpack , Git , ThreeJs , PixiJs , Redux , WebSocket 
                    </div>
                    <div id="bio3Line5">
                        NodeJs , EJS , MongoDB , PHP , Python , c++ 
                    </div>
                </div>

                <div id="page4">
                    <div id="bio4Line1">
                    Some projects 
                    </div>
                    <div id="bio4Line2">
                        Mobile :
                    </div>
                    <div id="bio4Line3">
                         <a href="http://h5.flyfinger.com/2018/dm/live/index.html">Damai Music Festival</a><br/>
                         <a href="http://h5.flyfinger.com/2018/huayi/intern/index.html">Huayi Intern</a><br/>
                         <a href="http://h5.flyfinger.com/2018/360/llq10year/index.html">360 Ten Years</a><br/>
                         <a href="http://h5.dodoh5.com.cn/marshall/poster/index.html">Marshall</a><br/>
                         <a href="http://h5.flyfinger.com/2018/zj/mm1/index.html">Flyfinger Music & Movie</a><br/>
                         <a href="http://h5.flyfinger.com/2018/carabao/poster/index.html">Carabao World Cup</a><br/>
                         <a href="http://h5.flyfinger.com/2018/360/check/index.html">360 Brain</a><br/>
                         <a href="https://h5.flyfinger.com/2019/yg/invitation/index.html">ShangHai Yiguo Invitation</a>
                         <br/>
                         <a href="http://h5.flyfinger.com/2019/baidu/ad/index.html">Spring Rain</a>
                    </div>
                    <div id="bio4Line4">
                        Desktop :
                    </div>
                    <div id="bio4Line5">
                        国家质检总局："http://101.37.148.184/"
                        <br/>
                        指尖灵动立项单系统
                        <br/>
                        个人网站："http://119.23.244.156:39111/home"
                        <br/>
                        丽柏女神网站："http://www.ladylibertybrands.com.cn/"

                    </div>
                </div>

                <div id="nextPage">
                        next ->
                </div>
                <canvas ref = {this.canvas}></canvas>
            </div>
        )
    }
}

export default Bio;