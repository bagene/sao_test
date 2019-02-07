var express = require('express');
var router = express.Router();

var taskController = require('../controllers/task.js');

router.route('/:project_id/tasks')
	.get(taskController.index)
	.post(taskController.store);

router.route('/:task_id/subtasks')
	.post(taskController.storeSubTask);

router.route('/users')
	.get(taskController.getUsers);

module.exports = router;