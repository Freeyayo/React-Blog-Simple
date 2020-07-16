const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: "763615809@qq.com", // generated ethereal user
      pass: "bqagnngvnmqnbdjb" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"React App" <763615809@qq.com>', // sender address
    to: "caiconghao@icloud.com", // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
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
          `, // html body
    attachments: [
      {   // use URL as an attachment
          path: '../pdf/Snake.pdf'
      }
    ]
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);