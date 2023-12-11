const nodemailer = require("nodemailer");
const { google } = require('googleapis');
module.exports =
{
  Envoyer: async (mailOptions) => {
    console.log(mailOptions)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user:  'kortfarah7@gmail.com', 
        pass:  '*FARAHFARAH30/11FK2018*7' 
      },
      tls: {
        rejectUnauthorized: false
     }
    }); 
    console.log(transporter)
    return await transporter.sendMail(mailOptions)
    .then(result => {
        return {
          status : 200,
          body : {
              message: result
          }
      }
    }).catch(err=>{ throw err; });
}

}
