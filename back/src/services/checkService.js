const userService= require('../services/userServices');


exports.nomExist = async (nom)=>{
    let user = await userService.getOneByUserByNom(nom);
    if(user.body) return true;
}

exports.emailExist = async (email)=>{
    let user = await userService.getOneUserByEmail(email);
    if(user.body) return true ;
}


