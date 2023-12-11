module.exports = (db, type) => {
    return db.define('commandes', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        adresse: {
            type: type.STRING,
        },
        telephone: {
            type: type.STRING,
        },
       
          })
}