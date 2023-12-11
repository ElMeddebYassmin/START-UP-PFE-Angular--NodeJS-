module.exports = (db, type) => {
    return db.define('comments', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        contenu: {
            type: type.STRING,
        },
       
       
          })
}