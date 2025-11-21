require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'industrix_user',
        password: process.env.DB_PASS || '123456',
        database: process.env.DB_NAME || 'industrix_dev',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false
    },
    test: {
        username: process.env.DB_USER || 'industrix_user',
        password: process.env.DB_PASS || '123456',
        database: (process.env.DB_NAME || 'industrix_dev') + '_test',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        logging: false
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false
    }
};
