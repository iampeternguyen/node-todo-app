const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [
	{
		_id: new ObjectID(),
		text: 'First test todo',
	},
	{
		_id: new ObjectID(),
		text: 'Second test todo',
	},
];

beforeEach(done => {
	Todo.deleteMany()
		.then(() => {
			return Todo.insertMany(todos);
		})
		.then(() => done());
});

describe('Post /todos', () => {
	it('should create a new todo', done => {
		let text = 'this is a test todo';

		request(app)
			.post('/todos')
			.send({ text })
			.expect(200)
			.expect(res => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({ text })
					.then(todos => {
						expect(todos.length).toBe(1);
						expect(todos[0].text).toBe(text);
						done();
					})
					.catch(err => done(err));
			});
	});

	it('should not create todo with invalid body data', done => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find()
					.then(todos => {
						expect(todos.length).toBe(2);
						done();
					})
					.catch(err => done(err));
			});
	});
});

describe('Get /todos', () => {
	it('should get all todos', done => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect(res => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('Get /todo/:id', () => {
	it('should return todo doc', done => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', done => {
		let id = new ObjectID();
		request(app)
			.get(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 if invalid objectID', done => {
		let id = 1348091;
		request(app)
			.get(`/todos/${id}`)
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', done => {
		request(app)
			.delete(`/todos/${todos[0]._id}`)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.findById(todos[0]._id)
					.then(result => {
						expect(result).toBeNull();
						done();
					})
					.catch(err => done(err));
			});
	});

	it('should return 404 if todo now found', done => {
		let id = new ObjectID();
		request(app)
			.delete(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 if invalid object id', done => {
		let id = 4;
		request(app)
			.delete(`/todos/${id}`)
			.expect(404)
			.end(done);
	});
});
