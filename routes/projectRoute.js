const express = require('express');

const router = express.Router();

const projectController = require('../controllers/projectController');

router.get('/', projectController.project_get);
router.post('/', projectController.project_store);
router.get('/:id', projectController.project_show);
router.put('/:id', projectController.project_update);
router.delete('/:id', projectController.project_delete);


module.exports = router;
