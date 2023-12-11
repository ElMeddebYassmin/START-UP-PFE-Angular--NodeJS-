const {Commande} = require('../models/relations');
const {Projet} =require('../models/relations');
const {User}=require('../models/relations');


exports.getUserCommands = function(userId){
    return Commande.findAll({
        where: {userId:userId},
        include:[ {model:Projet,
          include: [{model:User}]}]
      })
    .then(result=>{return { status : 200 , body : result }})
    .catch(err=>{ throw err ;})
}

exports.getPassedCommands = function(userId){
  return Commande.findAll({
      where: {userId:userId},
      include:[ {model:Commande,
        include: [{model:User}]}]
      })
     // include:[User, Projet]
    
  .then(result=>{return { status : 200 , body : result }})
  .catch(err=>{ throw err ;})}
