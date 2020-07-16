import React from "react";

class Ots extends React.Component{
    constructor(props){
        super(props);
        this.canvas = React.createRef();
    }

    componentDidMount(){
        const canvas = this.canvas.current;
        const c = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight*.7;

        let originalX = canvas.width / 2;
        let originalY = canvas.height / 2;
        const Radius = 10;

        let planet = new Planet(
                                originalX,
                                originalY,
                                .5,
                                "black",
                                "black",
                                .5,
                                2,
                                20,
                                .07
                    ),
            planet2 = new Planet(
                                originalX,
                                originalY,
                                .5,
                                "black",
                                "black",
                                1.7,
                                .5,
                                20,
                                .07
                    );
        let tPlanet = new TPlanet(
                                originalX,
                                originalY,
                                .5,
                                "black",
                                "black",
                                .1,
                                2,
                                105,
                                65,
                                .1,
                                .02
                    ),
            tPlanet2 = new TPlanet(
                                originalX,
                                originalY,
                                .5,
                                "black",
                                "black",
                                2,
                                .1,
                                -135,
                                -135,
                                .1,
                                .02
                    )
        animation();


        function animation(){
            requestAnimationFrame(animation);
            c.fillStyle = `rgba(255,255,255,.02)`;
            c.fillRect(0,0,canvas.width,canvas.height);
            for(let i=0;i<1;i++){
                new Particle(
                        originalX,
                        originalY,
                        Radius,
                        "black",
                        "white"
                ).update()
            }
            planet.update();
            planet2.update();
            tPlanet.update();
            tPlanet2.update();
        }

        function Particle(x,y,radius,borderColor,innerColor){
            this.x = x;
            this.y = y;
            // this.velocity = .03 * Math.random() + .02;
            this.velocity = .001;
            this.radius = radius;
            this.borderColor = borderColor;
            this.innerColor = innerColor;
            this.radians = Math.random() * Math.PI * 2; 
            // this.randomR = 1 + Math.random();

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
                this.x = x + 6*Math.sin(this.radians);
                this.y = y + 6*Math.cos(this.radians);
                this.draw();
            }
        }

        function Planet(x,y,radius,borderColor,innerColor,xF,yF,rR,v){
            this.x = x;
            this.y = y;
            // this.velocity = .03 * Math.random() + .02;
            this.velocity = v;
            this.radius = radius;
            this.borderColor = borderColor;
            this.innerColor = innerColor;
            this.radians = Math.random() * Math.PI * 2; 
            this.randomR = rR;

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
                this.x = x + xF*this.randomR*Math.sin(this.radians);
                this.y = y + yF*this.randomR*Math.cos(this.radians);
                this.draw();
            }
        }

        function TPlanet(x,y,radius,borderColor,innerColor,xF,yF,xO,yO,rR,v){
            this.x = x;
            this.y = y;
            // this.velocity = .03 * Math.random() + .02;
            this.velocity = v;
            this.radius = radius;
            this.borderColor = borderColor;
            this.innerColor = innerColor;
            this.radians = Math.random() * Math.PI * 2; 
            this.randomR = rR;

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
                this.x = x + xF*this.randomR*Math.sin(this.radians*Math.random()) + xO*Math.cos(this.radians*Math.random());
                this.y = y + yF*this.randomR*Math.cos(this.radians*Math.random()) + yO*Math.sin(this.radians*Math.random());
                this.draw();
            }
        }

    }
    
    render(){
        return(
            <div className = "ostContainer">
                <canvas id="ostcanvas" ref={this.canvas}></canvas>  
            </div>
        )
    }
}

export default Ots;