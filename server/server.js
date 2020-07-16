const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const http=require('http').Server(app);
const io=require('socket.io')(http);
const Domain = require("domain").create();

let linkedDuration = 0;

app.use(cors());
app.use(express.json());

let online = {
	boy : false,
	girl : false
}

let boyData = {
	gender: "boy",
	i: 0,
	ll: 25,
	m: 0,
	rl: 0,
	x: 0,
	y: 0
};
let girlData = {
	gender: "girl",
	i: 0,
	ll: 25,
	m: 0,
	rl: 0,
	x: 0,
	y: 0
};


io.on('connection', function(socket){
  let addedUser = false;
  console.log('a user connected');
  socket.emit("createPerson", online);

  socket.on("boy talking", data => {
  	socket.broadcast.emit("boy message",data);
  })

  socket.on("girl talking", data => {
  	socket.broadcast.emit("girl message",data);
  })

  socket.on("chosen",() => {
  	socket.emit("position", {boyData,girlData})
  })

  socket.on("boy", () => {
  	socket.gender = "boy";
  	addedUser = true;
  	online.boy = true;
  	socket.broadcast.emit("createPerson", online);
  })
  socket.on("girl", () => {
  	socket.gender = "girl";
  	addedUser = true;
  	online.girl = true;
  	socket.broadcast.emit("createPerson", online);
  })
  socket.on("behavier", (data) => {
  	if(data.gender === "boy"){
  		boyData = {...data};
  		socket.broadcast.emit("receivedBehavier", boyData);
  	}else if(data.gender === "girl"){
  		girlData = {...data};
  		socket.broadcast.emit("receivedBehavier", girlData);
  	}
  })

  socket.on("boy disconnected",(data)=>{
  	online.boy = false;
  	socket.emit("createPerson", online);
  })

  socket.on("girl disconnected",()=>{
  	online.girl = false;
  	socket.emit("createPerson", online);
  })

  socket.on("tiktok",() => {
  	linkedDuration += 1;
  	if(linkedDuration % 360000 === 0){
  		console.log(linkedDuration);
  	}
  })

  socket.on('disconnect', () => {
  	console.log("disconnected");
    if (addedUser) {
      online[socket.gender] = false;
    }
  });
});



app.post("/sendmail",(req, res, next) => {
  const data = req.body;
  async function main(dataFromClient){

    let dataAttachments = dataFromClient.slice(0,-1).map(item => {
      if(item.title){
        return {
          path: '../pdf/'+item.title+'.pdf'
        }
      }
    })

    console.log(dataAttachments);

    let transporter = nodemailer.createTransport({
      service: 'qq', 
      port: 465, // SMTP 
      secureConnection: true, // 使用 SSL
      auth: {
        user: "763615809@qq.com",
        pass: "bqagnngvnmqnbdjb" 
      }
    });

    let info = await transporter.sendMail({
      from: '"React App" <763615809@qq.com>', 
      to: dataFromClient[dataFromClient.length-1], // list of receivers
      subject: "Hi", 
      // text: "Hello world?", 
      html: `
              <body style="
                background: #798f92;
                  font-family: monospace;
                  color: lavender;
                  text-align: center;
                  ">
                <h1 style="
                font-size: 22px;
                margin-bottom: 12px;
                ">So Glad That I've Found You 🔍</h1>
                <hr style="
                  width: 80%;
                    display: block;
                    margin: 0 auto;
                ">
                <p style="
                  font-size: 18px;
                  margin-top: 12px;
                ">All of Your Subscribes Have Sent to You in The Attanchment 📎</p>
                <p style="
                  font-size: 18px;
                  margin-top: 12px;
                ">Please Cheack It Out 👋</p>
                <br>
              </body>
            `, 
      attachments: dataAttachments
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  Domain.run(() => {
    main(data).catch(console.error);
  })

  res.send("sent")

})

Domain.on("error", err => {
  console.log("Error ignored !")
})

http.listen(3001, function(){
  console.log('listening on *:3001');
});