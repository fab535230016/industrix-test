module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: true }
    }, {
        tableName: 'Categories',
        timestamps: true,
        underscored: false
    });

    return Category;
};
