const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router()


// ajouter un nouveau commantaire
router.post('/add',commentController.addComment);





module.exports = router ;