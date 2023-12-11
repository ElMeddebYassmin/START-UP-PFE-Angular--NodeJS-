const express = require('express');
const commandController =  require('../controllers/commandeController')
const router = express.Router()


// ajouter un nouveau commantaire
router.post('/add',commandController.addCommand); 
// retourner tous les commandes d'un utilisateur
router.get('/getAllCommands/:userId', commandController.getAllUserCommands)





module.exports = router ;