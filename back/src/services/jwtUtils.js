const jwt = require('jsonwebtoken');
//const JWT_KEY = "yx9TUnTIA^luh&M6z82epT8*NaPg^xBWD!KpDtR&jp2CNeexK&";
generatTokenForuser= function(userData, expiresIn = null){
    return jwt.sign({
        userId: userData.id,
        isAdmin : false
    },
    JWT_KEY,
    {
        expiresIn: expiresIn ? expiresIn : TOKEN_TIME_EXPIRES
    })
}

Envoyer= async (mailOptions) => {
    const transporter = nodemailer.createTransport({
      host: constantes.MAIL_HOST,
      port: constantes.MAIL_HOST_PORT,
      secure: true,
      auth: {
        user:  constantes.MAIL_HOST_USER, 
        pass:  constantes.MAIL_HOST_PASS 
      },
      tls: {
        rejectUnauthorized: false
     }
    }); 
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