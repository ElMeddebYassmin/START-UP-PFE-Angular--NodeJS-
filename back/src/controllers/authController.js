const {User} = require('../models/relations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports= {
    login:async(req,res)=>{
      const  secretCode="yx9TUnTIA^luh&M6z82epT8*NaPg^xBWD!KpDtR&jp2CNeexK&"
        try{
            const email=req.body.email
            const password=req.body.password
            const findUser=await User.findOne({where : {email : email}});
            if(!findUser){
                res.status(401).json({message : 'user not found !'})}
            if (findUser.activated == false){
                res.status(401).json({message: "this user is not activated yet !!"})
            }    
            const hashedPassword=findUser.password
            console.log(findUser)
            const pass=await bcrypt.compare(password, hashedPassword)
            console.log(email)
            if(!pass){
                res.status(401).json({message : 'wrong email or password !'})}
            const token=await jwt.sign({
                email : findUser.email, 
                id : findUser.id}, secretCode, {expiresIn: '5h'});
                console.log(token)
            if(token){
                // //token reset
                // var expireDate = new Date();
                // expireDate.setHours(expireDate.getHours()+1);
                // console.log(expireDate)
                
                // const t =await tokenReset.create({
                //     email:findUser.email, expiration : expireDate, token : token, used: 0
                // });
                // console.log(t)
                //fin token reset
                console.log(token)
                findUser.password=''
                res.status(200).json({message : 'user connected', token:token, isAdmin:findUser.isAdmin,
                email:findUser.email, 
                nom : findUser.nom,prenom:findUser.prenom,telephone:findUser.telephone,
            avatar:findUser.avatar, dateNaissance:findUser.dateNaissance,user:findUser})
            }
          
        }catch (err){
            res.status(500).json({err:'erreur au niveau du serveur !'})
        }
    }
}


