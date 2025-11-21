const { Todo, Category } = require('../models');
const { Op } = require('sequelize');

function snakeKeys(obj) {
    const out = {};
    Object.entries(obj).forEach(([k,v]) => {
        const snake = k.replace(/[A-Z]/g, m => `_${m.toLowerCase()}`);
        out[snake] = v;
    });
    return out;
}

async function list(req, res) {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const offset = (page - 1) * limit;
        const search = req.query.search || '';
        const status = req.query.completed;
        const categoryFilter = req.query.categoryId;
        const where = {};

        if (search) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } },
            ];
        }

        if (typeof status !== 'undefined') where.completed = (status === 'true');
        if (categoryFilter) where.categoryId = categoryFilter;

        const { rows, count } = await Todo.findAndCountAll({
            where,
            include: [{ model: Category, as: 'category', attributes: ['id','name','color'] }],
            order: [['createdAt', 'DESC']],
            limit, offset
        });

        const data = rows.map(r => {
            const plain = r.get({ plain: true });
            const topLevel = {};
            Object.entries(plain).forEach(([k, v]) => {
                if (k === 'category') {
                    topLevel.category = v;
                } else {
                    topLevel[k] = v;
                }
            });
            return topLevel;
        });

        return res.json({
            data,
            pagination: {
                current_page: page,
                per_page: limit,
                total: count,
                total_pages: Math.ceil(count / limit)
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

async function getOne(req, res) {
    try {
        const t = await Todo.findByPk(req.params.id, { include: [{ model: Category, as: 'category', attributes: ['id','name','color'] }] });
        if (!t) return res.status(404).json({ error: 'not found' });
        return res.json(t);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

async function create(req, res) {
    try {
        const { title, description, categoryId, priority, due_date } = req.body;
        if (!title) return res.status(400).json({ error: 'title required' });
        if (priority && !['high','medium','low'].includes(priority)) return res.status(400).json({ error: 'invalid priority' });

        const todo = await Todo.create({ title, description, categoryId, priority, due_date });
        const full = await Todo.findByPk(todo.id, { include: [{ model: Category, as: 'category', attributes: ['id','name','color'] }] });
        return res.status(201).json(full);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) return res.status(404).json({ error: 'not found' });
        await todo.update(req.body);
        const full = await Todo.findByPk(id, { include: [{ model: Category, as: 'category', attributes: ['id','name','color'] }] });
        return res.json(full);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) return res.status(404).json({ error: 'not found' });
        await todo.destroy();
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

async function toggleComplete(req, res) {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) return res.status(404).json({ error: 'not found' });
        todo.completed = !todo.completed;
        await todo.save();
        return res.json(todo);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

module.exports = { list, getOne, create, update, remove, toggleComplete, snakeKeys };


