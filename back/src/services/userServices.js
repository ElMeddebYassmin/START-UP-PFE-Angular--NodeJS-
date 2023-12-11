const {User} =require('../models/relations');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const checkService = require('../services/checkService');


exports.addUser = async (data)=>{
    const hashedPassword= await bcrypt.hash(data.password,10)
  return (new User({
      nom : data.nom,
      prenom : data.prenom,
      dateNaissance: data.dateNaissance,
      telephone : data.telephone,
      email : data.email,
      password: hashedPassword,
      isAdmin : false,
      activated: true
  })).save()
  .then(resultat=>{
      return {
          status :201 ,
          body : resultat
      }
  })
  .catch(err=>{ throw err ;});
}

// update method
exports.updateUser = async function (data,id){
    const hashedPassword = await bcrypt.hash(data.password,10)
    const userfound = await User.findOne({where: { id: id}});
    if(!userfound) {
        console.log(" user not found ! ") 
    }
    return userfound.update(
        {   
            
            nom: data.nom,
            prenom: data.prenom,
            dateNaissance: data.dateNaissance,
            telephone: data.telephone,
            email : data.email,
            password : hashedPassword,
        },
        {where: { id: id} })
        .then(result=>{return {status : 200 ,body :  result};})
        .catch(err=>{ throw err; });
}

exports.updated = async function (data,id){
    const userfound = await User.findOne({where: { id: id}});
    if(!userfound) {
        console.log(" user not found ! ") 
    }
    return userfound.update(
        {   
            nom: data.nom,
            prenom: data.prenom,
            dateNaissance: data.dateNaissance,
            telephone: data.telephone,
            email : data.email
        },
        {where: { id: id} })
        .then(result=>{
            return {status : 200 ,body :  result};})
        .catch(err=>{ throw err; });
}

//destroy method
exports.deleteUser = function(id){
    return User.destroy({where: {id: id}})
        .then(result=>{
            if(result==1) return { status : 200 };
            else          return { status : 412 };})
        .catch(err=>{ throw err ;})
}

// findAll method
exports.getAllUsers = function(){
    return User.findAll({where : {isAdmin:0, activated:1}})
    .then(result=>{return { status : 200 , body : result }})
    .catch(err=>{ throw err ;})
}

// findAllDesactivated method
exports.getAllDesactivatedUsers = function(){
    return User.findAll({where : {activated:0}})
    .then(result=>{return { status : 200 , body : result }})
    .catch(err=>{ throw err ;})
}


// findById method
exports.getOneUser = function(id){
    return User.findById(id)
    .then(result=>{
        return { status : 200 , body : result }})
    .catch(err=>{ throw err ;})
  }
  
  // findOne method
// exports.getOneUserByEmail =function (email){
//     return User.findOne({ where: {email}})
//     .then(result=>{
//         return { status : 200 , body : result }
//     })
//     .catch(err=>{ throw err ;})
//   }

  // dessactiver un utilisateur
  exports.desactivateUser = async function (id){
    const userfound = await User.findOne({where: { id: id}});
    if(!userfound) {
        console.log(" user not found ! ") 
    }
    return userfound.update(
        {   
            activated : false
        },
        {where: { id: id} })
        .then(result=>{return {status : 200 ,body :  result};})
        .catch(err=>{ throw err; });
}

// activer un utilisateur 
exports.activateUser = async function (id){
    const userfound = await User.findOne({where: { id: id}});
    if(!userfound) {
        console.log(" user not found ! ") 
    }
    return userfound.update(
        {   
            activated : true
        },
        {where: { id: id} })
        .then(result=>{return {status : 200 ,body :  result};})
        .catch(err=>{ throw err; });
}

// get all new users
// exports.getAllNewUsers = function(){
//     return User.findAll({where : {activated:0}})
//     .then(result=>{return { status : 200 , body : result }})
//     .catch(err=>{ throw err ;})
// }


// //add method
// const USER_ID='1025704727495-gurnkhi9l1iae947n57tb3c2bs9pi4ig.apps.googleusercontent.com';
// const USER_SECRET='IWCFykwZANTr4A-XrXzMazDj';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN='1//04KFysNj5ft7BCgYIARAAGAQSNwF-L9IrVOtFOeDmEAjJborE_OexOXu5EswjDizzIJ3ZPisxZEvRJ-R7jjho_MiDtaEATOHXZcY';

// const oAuth2User = new google.auth.OAuth2(
//     USER_ID,
//     USER_SECRET,
//     REDIRECT_URI
//   );
//   oAuth2User.setCredentials({refresh_token:REFRESH_TOKEN})

// exports.addUser = async (data)=>{

//   if(( await checkService.emailExist(data.email))){
//   return {
//   status : 422 ,
//   body : {
//   message: "email already used!!" }
//     }
//   }
//    const hashedPassword= await bcrypt.hash(data.password,10)
//     return (new User({
//     nom: data.nom,
//     prenom: data.prenom,
//     dateNaissance: data.dateNaissance,
//     telephone: data.telephone,
//     email: data.email,
//     password: hashedPassword,
//     isAdmin : false}))
//     .save()
//     .then(resultat=>{
//         function sendMail() {
//     try {
//     const accessToken = oAuth2User.getAccessToken();
          
//     const transport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//     type: 'OAuth2',
//     user: 'meddebyesmina123@gmail.com',
//     usertId: USER_ID,
//     userSecret: USER_SECRET,
//     refreshToken: REFRESH_TOKEN,
//     accessToken: accessToken,},
//     tls :{
//     rejectUnauthorized: false}});
          
//     const mailOptions = {
//     from: 'STARTUP <meddebyesmina123@gmail.com>',
//     to: data.email,
//     subject: 'STARTUP Account Validation ',
//     text: 'Votre Compte A Été Créé Avec Succès !',
//     html: '<h1>Votre Compte A Été Créé Avec Succès !</h1>',};
          
//     const result =  transport.sendMail(mailOptions);
//     return result; } 
//     catch (error) {
//     return error; }}
          
//     sendMail()
//     .then((result) => console.log('Email sent...', result))
//     .catch((error) => console.log(error.message)); 
//     return {
//     status :201 ,
//     body : resultat}})
//     .catch(err=>{ throw err ;});
// }
/****************************************************************************************/
//exécuter toutes les lignes; async
//await wait the execution of that line finished
//bcrypt.hash utilise tjrs await
/*exports.addUser = async (data)=>{
    const hashedPassword= await bcrypt.hash(data.password,10)
  return (new User({
      nom : data.nom,
      prenom : data.prenom,
      dateNaissance: data.dateNaissance,
      telephone : data.telephone,
      email : data.email,
      password: hashedPassword,
      isAdmin : false
  })).save()
  .then(resultat=>{
      return {
          status :201 ,
          body : resultat
      }
  })
  .catch(err=>{ throw err ;});
}*/
