const express = require('express');
const router = express.Router()
const { isAuthenticated } = require('../auth/middleware');
const TodoController = require('./controller');
const TodoRepository = require('./repository');

const todoRepository = new TodoRepository();
const todoController = new TodoController(todoRepository);

router.post('/v1/todos',isAuthenticated, todoController.createTodo.bind(todoController));
router.get('/v1/todos',isAuthenticated, todoController.getAllTodos.bind(todoController));
router.get('/v1/todos/:id',isAuthenticated, todoController.getTodo.bind(todoController));
router.post('/v1/todos/:id/completed',isAuthenticated, todoController.markTodoAsCompleted.bind(todoController));
router.delete('/v1/todos/:id',isAuthenticated, todoController.deleteTodo.bind(todoController));


module.exports = router;