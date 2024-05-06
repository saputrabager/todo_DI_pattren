require(`dotenv`).config();
process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../database/models')

describe('Todo Routes', () => {
    let authToken;

    beforeAll(async () => {
        await db.sequelize.sync({force: true});
        //mendaftar akun
        const responseSignup = await request(app)
            .post('/v1/signup')
            .send({ name: 'testuser', email: "testuser@test.com", password: 'testpassword' });
            
            
        // Mendapatkan token JWT valid untuk diuji
        const response = await request(app)
            .post('/v1/signin')
            .send({ email: "testuser@test.com", password: 'testpassword' });

        authToken = response.body.data.access_token;
    });

    it('should create a new todo', async () => {
        const response = await request(app)
            .post('/v1/todos')
            .set('Authorization', 'Bearer ' + authToken)
            .send({ title: 'Test Todo', description: 'This is a test todo' });

        expect(response.statusCode).toBe(201);
        expect(response.body.todo).toHaveProperty('title', 'Test Todo');
        expect(response.body.todo).toHaveProperty('description', 'This is a test todo');
    });

    it('should get all todos', async () => {
        const response = await request(app)
            .get('/v1/todos')
            .set('Authorization', 'Bearer ' + authToken);

        expect(response.statusCode).toBe(200);
        expect(response.body.todos.length).toBeGreaterThan(0);
    });

    it('should mark a todo as completed', async () => {
        // Menemukan ID todo yang akan diubah statusnya
        const todosResponse = await request(app)
            .get('/v1/todos')
            .set('Authorization', 'Bearer ' + authToken);

           
        const todoId = todosResponse.body.todos[0].id;

        // Menandai todo sebagai selesai
        const response = await request(app)
            .post(`/v1/todos/${todoId}/completed`)
            .set('Authorization', 'Bearer ' + authToken);

        expect(response.statusCode).toBe(200);
        expect(response.body.todo[0]).toHaveProperty('completed', true);
    });
});
