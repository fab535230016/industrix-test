'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Todos', [
            {
                title: 'Complete coding challenge',
                description: 'Build a full-stack todo application for Industrix',
                completed: false,
                priority: 'high',
                due_date: '2025-12-31T23:59:59Z',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Buy groceries',
                description: 'Milk, eggs, bread, coffee',
                completed: false,
                priority: 'medium',
                due_date: '2025-11-25T18:00:00Z',
                categoryId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Call mom',
                description: 'Weekly call with mom',
                completed: false,
                priority: 'low',
                due_date: null,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Prepare presentation',
                description: 'Slides for Monday meeting',
                completed: false,
                priority: 'high',
                due_date: '2025-11-24T09:00:00Z',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Pay utilities',
                description: 'Electricity and water bills',
                completed: false,
                priority: 'medium',
                due_date: '2025-11-28T12:00:00Z',
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Order new mouse',
                description: 'Replace faulty mouse',
                completed: true,
                priority: 'low',
                due_date: '2025-11-15T15:00:00Z',
                categoryId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Read technical article',
                description: 'Read article about Node.js performance',
                completed: false,
                priority: 'low',
                due_date: null,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Workout',
                description: 'Gym session — legs',
                completed: false,
                priority: 'medium',
                due_date: '2025-11-20T07:00:00Z',
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Buy birthday gift',
                description: 'Gift for friend - check wishlist',
                completed: false,
                priority: 'high',
                due_date: '2025-12-05T00:00:00Z',
                categoryId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Cleanup project folder',
                description: 'Remove old branches and tidy repo',
                completed: true,
                priority: 'low',
                due_date: null,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Schedule dentist',
                description: 'Call clinic and schedule check-up',
                completed: false,
                priority: 'medium',
                due_date: '2025-12-01T10:00:00Z',
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Declutter closet',
                description: 'Sort clothes to donate',
                completed: false,
                priority: 'low',
                due_date: '2025-11-30T18:00:00Z',
                categoryId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Todos', null, {});
    }
};
