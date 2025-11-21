const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/todo.controller');

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.patch('/:id/complete', ctrl.toggleComplete);

module.exports = router;
