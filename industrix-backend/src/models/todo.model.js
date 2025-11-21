module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        priority: { type: DataTypes.STRING, allowNull: true },
        dueDate: { type: DataTypes.DATE, field: 'due_date', allowNull: true },
        categoryId: { type: DataTypes.INTEGER, allowNull: true, field: 'categoryId' }
    }, {
        tableName: 'Todos',
        timestamps: true,
        underscored: false
    });

    return Todo;
};
