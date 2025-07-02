

module.exports = (sequelize, DataTypes) => {
    const Ligjeruesi = sequelize.define('Ligjeruesi', {
        lecturerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deparatament: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },{
        tableName: 'ligjeruesi',
         timestamps: false,
    });

    Ligjeruesi.associate = (models) => {
        Ligjeruesi.hasMany(models.Ligjerata, {
            foreignKey: 'lecturerId',
            as: 'ligjerata'
        });
    };

    return Ligjeruesi;
}