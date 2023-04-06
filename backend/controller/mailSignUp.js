const nodemailer = require('nodemailer')
require('dotenv').config()






const sendEMail = async(email,res)=>{
    try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
          }
        });
        await transporter.sendMail({
          from: 'senthilvlk.20cse@kongu.edu',
          to: email,
          subject: 'hello',
          html: '<b>SUCESSFULLY SIGNED UP</b>'
        },()=>res.redirect('/login'));
        console.log('success');
      } catch (error) {
        console.log('mail', error);
      }
}

module.exports = sendEMail

