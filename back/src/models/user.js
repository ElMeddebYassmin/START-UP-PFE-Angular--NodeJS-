module.exports = (db, type) => {
    return db.define('users', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: type.STRING(30),
        },
        prenom: {
            type: type.STRING(30),
        },
        dateNaissance: {
            type: type.DATE,
            allowNull: false,
        },
        email: {
            type: type.STRING(100),
            allowNull: false,
            isEmail: true,
        } ,
        telephone: {
            type: type.STRING(250)
        },
        password: {
            type: type.STRING(250)
        },
        isAdmin : {
            type : type.BOOLEAN,
            default: "false" 
        },
        activated : {
            type : type.BOOLEAN,
            default: "true" 
        },
        avatar: {
            type: type.STRING(100),
            defaultValue: ''
        },
       
       
          })
}