const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const CategoryModel = require('./category.model');
const TodoModel = require('./todo.model');

const Category = CategoryModel(sequelize, DataTypes);
const Todo = TodoModel(sequelize, DataTypes);

Category.hasMany(Todo, { foreignKey: 'categoryId' });
Todo.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = { sequelize, Sequelize, Category, Todo };
