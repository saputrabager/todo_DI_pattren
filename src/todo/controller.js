// controllers/todoController.js
// const TodoRepository = require('../repository/todoRepository');

class TodoController {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    async getAllTodos(req, res) {
        try {
            const todos = await this.todoRepository.getAll();
            return res.json({success: true, todos});
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    async createTodo(req, res) {
        const { title, description } = req.body;
        const user_id = req.user.id;
        try {
            const newTodo = await this.todoRepository.create({ title, description, completed: false, user_id });
            res.status(201).json({success: true, todo: newTodo});
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async getTodo(req, res) {
        const { id } = req.params;
        try {
            const Todo = await this.todoRepository.getById(id);
            if (!Todo) {
                return res.status(404).json({ success: false, message: 'Todo not found' });
            }
            res.status(201).json({success: true, todo: Todo});
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async markTodoAsCompleted(req, res) {
        const todoId = req.params.id;
        try {
            const todo = await this.todoRepository.getById(todoId);
            if (!todo) {
                return res.status(404).json({ success: false, message: 'Todo not found' });
            }

            const [count, newTodo] = await this.todoRepository.updateById(todoId, {completed: true})
            res.json({success: true, todo: newTodo});
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async deleteTodo(req, res) {
        const todoId = req.params.id;
        try {
            const todo = await this.todoRepository.getById(todoId);
            if (!todo) {
                return res.status(404).json({ success: false, message: 'Todo not found' });
            }

            await this.todoRepository.deleteTodo(todoId);
            res.json({success: true});
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = TodoController;
