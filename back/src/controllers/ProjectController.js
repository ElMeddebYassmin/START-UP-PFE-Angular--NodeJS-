const {Projet}=require('./../models/relations');
const projectService=require('../services/projectService')



// add new project
exports.addProject = async(req, res) =>{
    const url = req.protocol + "://" + req.get("host");
    const personnelimage = url + "/projets/" + req.files["Image"][0].filename;
    console.log(req.body)
    return(new Projet({
        nomProjet : req.body.nomProjet,
        description : req.body.description,
        prix : req.body.prix,
        image : personnelimage,
        userId : req.body.userId
    })).save()
    .then(resultat =>{ res.status(200).json(resultat);})
    .catch(err=>{ 
        console.log(err) 
        throw err ;});
}


// get all posted projects
exports.getAll=function(req,res){
    projectService.getProjects(req.body)
    .then(resultat =>{ res.status(resultat.status).json({pro:resultat.body});})
    .catch(err=>{ res.status(400).json({erreur:`${err}`})})
}


// get user's projects
exports.getAllUserProjects=function(req,res){
    projectService.getUserProjects(req.params.userId)
    .then(resultat =>{ res.status(resultat.status).json({proj:resultat.body});})
    .catch(err=>{ res.status(400).json({erreur:`${err}`})})
}


//delete project
exports.deleteProject = function(id){
    return Projet.destroy({where: {id: id, userId:userId}})
        .then(result=>{
            if(result==1) return { status : 200 };
            else          return { status : 412 };})
        .catch(err=>{ throw err ;})
}

// //update a project
// exports.update = async function (req, res) {
//     try {
//         const project = await Projet.update({
//             nomProjet: req.body.nomProjet,
//             description: req.body.description,
//             prix: req.body.prix,
//             image: req.body.image,
//             usreId: req.body.userId
//         }, {
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(400).json(project);
//     } catch (err) {
//         err =>{ res.status(400).json ({erreur : `${err}`})}
//     }
// };


// // delete project nd user
// exports.deletePU = async function (req, res) {
//     try {
//         await Project.destroy({
//             where: {
//                 id: req.body.id,
//                 userId: req.body.userId
//             }
//         });
//         res.status(200).json({ message: "Project deleted !"});
//     } catch (err) {
//         err =>{ res.status(400).json ({erreur : `${err}`})}
//     }
// }


// // // get User's projects
// // exports.getAllUserProjects = function(req,res){
// //     return Project.findAll({where : ({userId:req.decoded.userId})})
// //     // include:[
// //     // model: User,
// //     // required:true
// //     // ]
// //     .then(result=>{return { status : 200 , body : result }})
// //     .catch(err=>{ throw err ;})
// // }


// // exports.getAllUserProjects = function(){
// // User.findAll({
// //     include:[Projet],
// //     where:{isAdmin:0}
// // }).then(users=>{
// //     console.log(users[0].projets)
// // })}

// exports.getAllUserProjects = function(userId){
//     Projet.findAll({
//         include:[User],
//         where: {userId:userId}
//     }).then(projets=>{
//         console.log(projets)
//     })}