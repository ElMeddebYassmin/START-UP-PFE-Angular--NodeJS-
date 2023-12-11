const userService=require('../services/userServices')
const  secretCode="yx9TUnTIA^luh&M6z82epT8*NaPg^xBWD!KpDtR&jp2CNeexK&";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {User} = require('../models/relations');
const mailService = require ('../services/mailService');
const JWT_KEY = "4SIQr7JeVfCOlmExJlC6WlH6exxtXvOoGfecDfY1ujqWspqzGIE24wUKSNbV";
const TOKEN_TIME_EXPIRES = '1d';


exports.add=function(req,res){
    userService.addUser(req.body)
    .then(resultat =>{res.status(resultat.status).json(resultat.body);})
    .catch(err =>{ res.status(400).json ({erreur : `${err}`})})                     
}


// update method
exports.update=function(req,res){
    const id= req.params.id
    userService.updateUser(req.body,id)
    .then(resultat =>{ res.status(resultat.status).json(resultat.body);})
    .catch(err=>{ res.status(400).json ({erreur : `${err}`})}) 
}

exports.updated=function(req,res){
    const id= req.params.id
    userService.updated(req.body,id)
    .then(resultat =>{ res.status(resultat.status).json(resultat.body);})
    .catch(err=>{ res.status(400).json ({erreur : `${err}`})}) 
}

// destroy method 
exports.destroy=function(req,res){
    userService.deleteUser(req.params.id)
    .then(resultat=>{ res.status(resultat.status).end();})
    .catch(err=>{ res.status(400).json({erreur: `${err}`})})
}

// getAll method
exports.getAll=function(req,res){
    userService.getAllUsers(req.body)
    .then(resultat =>{ res.status(resultat.status).json(resultat.body);})
    .catch(err=>{ res.status(400).json({erreur:`${err}`})})
}

// getAll method
exports.getAllDesactivated=function(req,res){
    userService.getAllDesactivatedUsers(req.body)
    .then(resultat =>{ res.status(resultat.status).json(resultat.body);})
    .catch(err=>{ res.status(400).json({erreur:`${err}`})})
}
exports.getOne=function(res,req){
    userService.getOneUser(req.params.id)
    .then(resultat=>{res.status(resultat.status).end();})
    .catch(err=>{res.status(400).json({erreur:`${err}`})})
}
// // getOne
// exports.getOneE=function(res,req){
//     const email= req.params.email
//     userService.getOneUserByEmail(req.body.email)
//     .then(resultat=>{res.status(resultat.status).end();})
//     .catch(err=>{res.status(400).json({erreur:`${err}`})})
// }


// faire le update de photo
exports.updateUserPhoto = async(req,res) =>{
    const url = req.protocol + "://" + req.get("host");
    console.log(req.body) 
    const mail = req.body.mail;
    console.log(mail)
    const personnelimage = url + "/images/" + req.files["Image"][0].filename;
    try{ const finduser = await User.findOne({where : {email : req.body.mail}});
        if (!finduser) { res.status(401).json({msg : "User Not Found !!"}) }
        if (finduser){ finduser.update({ avatar : personnelimage ? personnelimage : finduser.avatar,});}
        if (finduser) { res.status(200).json({
                    msg: "Avatar updated succecfully",
                    user: finduser,
                    ok: true, }); }}
    catch(err){ res.status(500).json({err:"internal server error"});} },


exports.desactivate=function(req,res){
    const id= req.params.id
    userService.desactivateUser(id)
    .then(resultat =>{ res.status(resultat.status).json(resultat.body);})
    .catch(err=>{ res.status(400).json ({erreur : `${err}`})}) 
}

exports.activate=function(req,res){
    const id= req.params.id
    userService.activateUser(id)
    .then(resultat =>{ res.status(resultat.status).json(resultat.body);})
    .catch(err=>{ res.status(400).json ({erreur : `${err}`})}) 
}

// module.exports= {
//     add: async(req,res)=>{
//         try{
//             const email = req.body.email
//             global.user;

//             const findUser = await userModel.findOne({where:{
//                 email : email
//             }});

//             if (findUser){
//                 return res.status(401).json({msg : "this email is already exist!!"});
//             }

//             const hashedPass = await bcrypt.hash(req.body.password,10);
//             if(hashedPass){
//                 this.user= {
//                     nom: req.body.nom,
//                     prenom: req.body.prenom,
//                     dateNaissance: req.body.dateNaissance,
//                     telephone: req.body.telephone,
//                     email: req.body.email,
//                     password: hashedPass,
//                     isAdmin : req.body.isAdmin,
//                     activated : false
//                 }

//                 const userAdded = await userModel.create(this.user);
//                 if (userAdded){
//                     console.log("done !!")
//                     console.log(userAdded);

//                     var expireDate = new Date();
//                     expireDate.setHours(expireDate.getHours()+1);
//                     const token = await jwt.sign({mail: this.user.email},JWT_KEY,{expiresIn:'1d'})
//                     console.log(token)

//                     const restoken = await resetToken.create({
//                         email : email,
//                         expiration : expireDate,
//                         token : token,
//                         used : 0
//                     });
//                     console.log(restoken)

//                     const text = `welcome to start up please verify your account by clicking on the link below:
//                     http://localhost:4200/login?token=${encodeURIComponent(token)}&email=${email}
//                     Start-Up TEAM`
//                     const message ={
//                         from: 'kortfarah7@gmail.com',
//                         to : email,
//                         replyTo : 'kortfarah7@gmail.com',
//                         subject: 'Account Verification for Start-UP',
//                         text: text
//                     };

//                     const sendMail = await mailService.Envoyer(message);
//                     if (sendMail){
//                         res.status(200).json({
//                             msg: "email verificatiin has been sent to your email",
//                             ok: true
//                         });
//                     }
//                 }
//             }
//             return res.status(200).json({msg:"user created with success!!"})

//         }catch(err){
//             res.status(500).json({err:"Internal server Error!"});
//         }
//     }
// }


/****************************************GetProfileUser*******************************************/
// module.exports={
//     getUserProfile:function(req,res){
//         //Getting header auth //récupérer l'entete autorization de notre requete 
//         var headerAuth=req.headers['authorization'];
//         var userId=this.getUserId(headerAuth);
//         if(userId<0){
//             return res.status(400).json({'error' : 'wrong token'});}
//             userModel.findOne({
//                 attributes:['id','nom','prenom','email','telephone','dateNaissance'],
//                 where:{id:userId}
//             }).then(function(user){
//                 if(user){
//                     res.status(201).json(user);
//                 }else{
//                     res.status(404).json({'error':'user not found!'});
//                 }
//             }).catch(function(err){
//                 res.status(500).json({'error':'cannot fetch user!'})
//             });
        
//     },



//     parseAuthorization:function(authorization){
//         return(authorization!=null) ? authorization.replace('Bearer ','') : null;
//     },


//     getUserId: function(authorization){
//         var userId = -1;
//         var token = module.exports.parseAuthorization(authorization);
//         if (token!=null){
//             try{
//                 var jwtToken = jwt.verify(token, secretCode);
//                 if(jwtToken!=null){
//                     userId=jwtToken.userId;
//                 }
//             }catch(err){}
//         }return userId;
//     }
// }

