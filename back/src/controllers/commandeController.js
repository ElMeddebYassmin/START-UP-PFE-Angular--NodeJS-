const {Commande} = require ('./../models/relations');
const {User}=require('./../models/relations');
const {Projet}=require('./../models/relations');
const commandService=require('../services/commandeService')


// ajouter une nouvelle commande
exports.addCommand = async(req, res) =>{
     return(new Commande({
         adresse : req.body.adresse,
         telephone : req.body.telephone,
         projetId:req.body.projetId,
         userId : req.body.userId
     })).save()
     .then(resultat =>{ res.status(200).json(resultat);})
     .catch(err=>{ 
         console.log(err) 
         throw err ;});
 }


// user's commands
 exports.getAllUserCommands=function(req,res){
    commandService.getUserCommands(req.params.userId)
    .then(resultat =>{ res.status(resultat.status).json({cmd:resultat.body});})
    .catch(err=>{ res.status(400).json({erreur:`${err}`})})
}
 