const { Sequelize } = require("sequelize");
const db = require("../../DB/db");
const likeModel = require('./like');
const commandeModel = require('./commande');
const commentModel = require('./comment');
const chatModel = require('./chat');
const userModel = require("./user");
const projetmodel = require("./project");
const Like = likeModel(db,Sequelize);
const Commande = commandeModel(db,Sequelize)
const Comment = commentModel(db, Sequelize);
const Chat = chatModel(db, Sequelize);
const Projet = projetmodel(db, Sequelize);
const User = userModel(db, Sequelize);

//relation entre Projet et User
User.hasMany(Projet, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Projet.belongsTo(User);


//relation entre projet et comments
Projet.hasMany(Comment, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Comment.belongsTo(Projet);

// relation entre comment et user
User.hasMany(Comment, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Comment.belongsTo(User)


// relation entre commande et projet
Projet.hasMany(Commande,{
    onDelete: "CASCADE",
    onUpdate : "CASCADE"
})
Commande.belongsTo(Projet)


//relation entre user et projet
User.hasMany(Commande,{
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
})
Commande.belongsTo(User)


//relation entre like et projet
Projet.hasMany(Like,{
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
})
Like.belongsTo(Projet)


//relation entre like et user
User.hasMany(Like,{
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
})
Like.belongsTo(User)

//relation entre Chat et User
User.hasMany(Chat, {
    foreignKey: 'senderId',
    as: 'senderChat',
    references: {
        model: 'users',
        key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

User.hasMany(Chat, {
    foreignKey: 'receiverId',
    as: 'receiverChat',
    references: {
        model: 'users',
        key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Chat.belongsTo(User, {
    foreignKey: 'senderId',
    as: 'sender',
    references: {
        model: 'users',
        key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Chat.belongsTo(User, {
    foreignKey: 'receiverId',
    as: 'receiver',
    references: {
        model: 'users',
        key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


db.sync({ alter: true })
    .then(() => {
        console.log("table updated successfully !!!!!!");
        console.log("/************************************************************************/");
    })
    .catch((e) => {
        console.log(e);
    });

module.exports = {
    User,
    Projet,
    Chat,
    Comment,
    Commande,
    Like

};