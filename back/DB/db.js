const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('db','root','',{
    host: '127.0.0.1',
    dialect: 'mysql', 
    operatorAliases : false ,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
});

sequelize.authenticate().then(() => { console.log('Connecté avec succès.'); })
    .catch(e => {

        console.error('Erreur de connection au serveur:', e);
    });


module.exports = sequelize;
global.sequelize = sequelize ;