const userController=require('../controllers/userController');
const express=require('express');
const router=express.Router();
const upload = require ('./../upload/upload');

router.post('/add',userController.add);
router.put('/:id',userController.update);
router.put('/update/:id',userController.updated);
router.delete('/:id',userController.destroy);
router.get('/get/one/:id',userController.getOne);
// router.get('/getE',userController.getOneE);
router.get('/', userController.getAll);
router.get('/get',userController.getAllDesactivated);
router.put('/desactivate/:id',userController.desactivate);
router.put('/activate/:id',userController.activate);
// image router
router.post('/image',upload,userController.updateUserPhoto);

module.exports = router;
