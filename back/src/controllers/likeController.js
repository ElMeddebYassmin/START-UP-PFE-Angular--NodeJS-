const sequelize = require('../../DB/db');
const {Like} = require('../models/relations')

exports.Like = async(req, res) =>{
    try{
        await Like.update({ isLike: sequelize.literal('isLike+2')},{where:{id:id}})
        res.status(200).json({ message: "liked."}); } 
        catch (e) { errorHandler(res, e);} 
}

// exports.Like = async(req, res) =>{
//     try{
//         await Like.update({field})
//         res.status(200).json({ message: "liked."}); } 
//         catch (e) { errorHandler(res, e);} 
// }

// Model.update({ field: sequelize.literal('field + 2') }, { where: { id: model_id } });
//Like.increment('isLike', {where:{id:id}})