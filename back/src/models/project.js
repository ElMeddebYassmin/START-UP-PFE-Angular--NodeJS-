module.exports=(db,type)=>{
    return db.define('projets',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        nomProjet:{
            type:type.STRING(25)
        },
        description:{
            type:type.STRING(25)
        },
        prix:{
            type:type.DECIMAL(16,3)
        },
        image:{
            type:type.STRING(255),
            allowNull:false,
            defaultValue: ''
        },
    })
}