require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

const categoriesRouter = require('./routes/categories');
const todosRouter = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, msg: 'Industrix backend running' }));

app.use('/api/categories', categoriesRouter);
app.use('/api/todos', todosRouter);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await sequelize.authenticate();
        console.log('DB connected ✅');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('Unable to connect to DB:', err);
        process.exit(1);
    }
}

start();
