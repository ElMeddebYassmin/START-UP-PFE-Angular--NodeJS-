module.exports = (db, type) => {
    return db.define('chats', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: type.STRING,
        },
        date: {
            type: type.DATE,
        },
       
          })
}