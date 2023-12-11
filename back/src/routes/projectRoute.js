const projectController = require ('../controllers/ProjectController');
const express=require('express');
const router=express.Router();
const upload = require ('./../upload/uploadP');


// Ajout d'un projet
router.post("/",upload,projectController.addProject);
//Suppression d'un projet 
router.delete("/delete/:id",projectController.deleteProject);
// // modification d'un projet
// router.put("/",projectController.update);
// liste des projets des utilisateurs
router.get("/getAll",projectController.getAll);
// get user's projects 
router.get("/getAllUP/:userId",projectController.getAllUserProjects);


module.exports = router ;