const express = require('express');
const likeController = require('../controllers/likeController');
const router = express.Router()

router.put('/likeP/:id',likeController.Like);





module.exports = router ;