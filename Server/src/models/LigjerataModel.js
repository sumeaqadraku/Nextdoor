module.exports = (sequelize, DataTypes) => {
    const Ligjerata = sequelize.define('Ligjerata',{
        lectureName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lecturerId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ligjeruesi",
                key: "id",
            },
        }
    },{
        tableName: 'ligjerata',
         timestamps: false,
    })

    Ligjerata.associate = (models) => {
        Ligjerata.belongsTo(models.Ligjeruesi, {
            foreignKey: 'lecturerId',
            as: 'ligjeruesi'
        })
    }

    return Ligjerata;
}

