import nodemailer from "nodemailer";
import asyncHandler from 'express-async-handler';

const sendMail = asyncHandler ( async (data, req, res ) => {
 

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "ayushguptass14@gmail.com",
          pass: "tiuzfwyjfzzrwuxl",
        },
      });

      const info = await transporter.sendMail({
        from: '"Hey 👻" i am sender', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.htm, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      

})




export {sendMail};