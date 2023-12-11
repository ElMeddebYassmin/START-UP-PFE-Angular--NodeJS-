const {Projet} =require('../models/relations');
const {User}=require('../models/relations');
const {Comment}=require('../models/relations');


exports.getProjects = function(){
    return Projet.findAll({include:[{model:User}, {model:Comment,
        include: [{model:User}]}]})
    .then(result=>{return { status : 200 , body : result }})
    .catch(err=>{ throw err ;})
}


exports.getUserProjects = function(userId){
    console.log(userId)
    return Projet.findAll({
        where: {userId:userId},
        include:Comment
      })
    .then(result=>{return { status : 200 , body : result }})
    .catch(err=>{ throw err ;})
}
