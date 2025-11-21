const { Category } = require('../models');

async function list(req, res) {
    try {
        const cats = await Category.findAll({ order: [['id','ASC']] });
        return res.json(cats);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

async function create(req, res) {
    try {
        const { name, color } = req.body;
        if (!name) return res.status(400).json({ error: 'name is required' });
        const cat = await Category.create({ name, color });
        return res.status(201).json(cat);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, color } = req.body;
        const cat = await Category.findByPk(id);
        if (!cat) return res.status(404).json({ error: 'not found' });
        await cat.update({ name, color });
        return res.json(cat);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const cat = await Category.findByPk(id);
        if (!cat) return res.status(404).json({ error: 'not found' });
        await cat.destroy();
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

module.exports = { list, create, update, remove };