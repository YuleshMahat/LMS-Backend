import nodemailer from "nodemailer";
import config from "../config/config.js";

const processEmail = async (obj) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.nodemailer.user,
      pass: config.nodemailer.pass,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: `BurrowABook <burrowabook@etherea.email>`,
      ...obj,
    });
  } catch (err) {
    console.log("error sending email");
  }
};

const sendEmailVerificationTemplate = async ({ to, url, userName }) => {
  const obj = {
    to,
    subject: "Verify your email",
    text: `Please verify you email by clicking the link below. ${url}`,
    html: `
    <p> Dear ${userName}, </p>

    <h1>To verify your account, please click othe button below</h1>
    <br />
    <br/>
    <br />
    
    <a href=${url} target="_blank" style="background: green; color: white; padding: 2rem; border-radius: 10px"> Verify Your Email Now</a> 

    <br />
    <br />
    <br />
    <p>Thank you for registering with us!</p>
    <p>Best regards,</p>
    <p>BurrowABook</p>
     
    
    `,
  };
  await processEmail(obj);
};

export default sendEmailVerificationTemplate;
