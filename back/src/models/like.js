module.exports = (db, type) => {
    return db.define('likes', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isLike: {
            type: type.INTEGER,
            default:0
        }
          })
}