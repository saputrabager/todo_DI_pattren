const models = require('../../database/models');
const Todo = models.todo

class TodoRepository {
    async getAll() {
        return await Todo.findAll();
    }

    async getById(todoId) {
        return await Todo.findByPk(todoId);
    }

    async create(todo) {
        return await Todo.create(todo);
    }

    async updateById(todoId, data) {
        return await Todo.update(data, {
            where: {
                id: todoId
            },
            returning: true
        });
    }

    async deleteTodo(todoId) {
        return await Todo.destroy({where : {id: todoId}});
    }
}

module.exports = TodoRepository;