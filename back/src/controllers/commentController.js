const {Comment}=require('./../models/relations');
const {User}=require('./../models/relations');
const {Projet}=require('./../models/relations');
const projectService = require('../services/projectService')
// ajouter un nouveau commentaire
exports.addComment = async(req, res) =>{
   console.log(req.body)
    return(new Comment({
        contenu : req.body.contenu,
        projetId:req.body.projetId,
        userId : req.body.userId
    })).save()
    .then((ress) => {
        projectService.getProjects(req.body)
        .then(resultat =>{ res.status(resultat.status).json({pro:resultat.body});})
        .catch(err=>{ res.status(400).json({erreur:`${err}`})})
    }
        
    )
    .catch(err=>{ throw err ;});
}

// supprimer un commentaire
module.exports.delete = async function (req, res) {
    try {
    await Comment.destroy({
        where: {
            id: req.body.id,
           // projetId:req.body.projetId,
            userId: req.body.userId
                }
        });
    res.status(200).json({ message: "Comment deleted."}); } 
    catch (e) { errorHandler(res, e);} 
}


// get all comments
module.exports.getAllComments = async function (req, res) {
    const comments = {
        where: { projetId: req.query.projetId },
        include:  { model: User } 
                  };
    res.status(200).json(comments)
    .catch(err=>{ throw err ;});
}
    // try {
    //     const comments = await Comment.findAndCountAll(query);
    //     res.status(200).json(comments);
    // } catch (e) {
    //     errorHandler(res, e);
    // }
