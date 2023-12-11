const Sequelize = require('sequelize');
const sequelize = new Sequelize('startup','root','',{
    host: '127.0.0.1',
    dialect: 'mysql', 
    operatorAliases : false ,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
});
module.exports = sequelize ;
global.sequelize = sequelize ;