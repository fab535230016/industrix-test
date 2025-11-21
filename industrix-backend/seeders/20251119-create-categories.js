'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categories', [
            {
                name: 'Work',
                color: '#3B82F6',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Personal',
                color: '#10B981',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Shopping',
                color: '#F59E0B',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Others',
                color: '#8B5CF6',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categories', null, {});
    }
};
