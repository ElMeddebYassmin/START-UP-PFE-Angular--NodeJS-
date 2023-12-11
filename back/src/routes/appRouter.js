const express=require('express');
const appRouter=express.Router();

const userRoute = require('../../src/routes/userRoutes')
const authRoute = require('../../src/routes/authRoute')
const projectRoute = require('../../src/routes/projectRoute')
const commentRoute=require('../../src/routes/commentRoute')
const commandRoute=require('../../src/routes/commandRouter')
const likeRoute=require('../../src/routes/likeRoute')

appRouter.use('/user',userRoute);
appRouter.use('/auth',authRoute);
appRouter.use('/project', projectRoute)
appRouter.use('/comment',commentRoute);
appRouter.use('/command',commandRoute);
appRouter.use('/like',likeRoute);

module.exports=appRouter