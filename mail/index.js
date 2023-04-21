const username = "designdev67@gmail.com";
const password = "iwzorsldclwchaac";
const receivingAccount = "developerhridoy1@gmail.com";
const emailSubject = "Message from NRI Repatriation";

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: username,
    pass: password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("Page Not Found!");
});

app.get("/mail", (req, res) => {
  res.send("Page Not Found!");
});

app.post("/mail", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  if (
    name != undefined &&
    email != undefined &&
    subject != undefined &&
    message != undefined
  ) {
    const mailOptions = {
      from: username,
      to: receivingAccount,
      subject: emailSubject,
      html: "Test <button>sending</button> Gmail using Node JS",
      html: `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Email Template</title> <style>.mainDiv{max-width: 600px; margin: 0 auto; padding: 0 12px;}.mainDivWrapper{background-color: #fff; padding: 30px; font-family: Arial, Helvetica, sans-serif; border-radius: 5px;}.heading{font-size: 23px; font-weight: bold; text-align: center; margin-bottom: 30px; display: block;}.sendBtn{margin: 50px 0 20px 0; display: flex; justify-content: center;}.sendBtn a{padding: 15px 40px; background: #1f2f98; color: #fff; text-decoration: none; transition: 0.3s;}.sendBtn a:hover{background: #1ca7ec;}.image{width: 100%; max-width: 250px; margin-left: auto; margin-right: auto; margin-bottom: 30px;}</style></head><body style="width: 100%; height: 100%; background-color: #1ca7ec; margin: 0; padding-top: 70px"> <div class="mainDiv"> <div class="mainDivWrapper"> <div class="image"></div><span class="heading">${emailSubject}</span> <div style="font-size: 20px !important"> <strong>Name:</strong> ${name} <hr/> <strong>Email:</strong> <a style="text-decoration: none; color: #1ca7ec" href="mailto:${email}">${email}</a> <hr/> <strong>Message:</strong> <div style="width: 100%; margin-top: 10px">${message} </div></div><div class="sendBtn"> <a href="mailto:${email}">Send Email</a> </div></div></div></body></html>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(
          '{"status": false, "response": "Something went wrong! Please try again."}'
        );
      } else {
        res.send(
          '{"status": true, "response": "Message received, we will contact you soon!"}'
        );
      }
    });
  } else
    res.send('{"status": false, "response": "Please fill all the fields"}');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
