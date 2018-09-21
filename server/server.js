const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text,
	});
	todo.save()
		.then(doc => {
			res.send(doc);
		})
		.catch(err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
	Todo.find()
		.then(todos => {
			res.send({ todos });
		})
		.catch(err => res.status(400).send(err));
});

app.get('/todo/:id', (req, res) => {
	Todo.findById(req.params.id)
		.then(todo => (todo ? res.send({ todo }) : res.status(404).send('')))
		.catch(err => res.status(404).send(''));
});

app.listen('3000', () => {
	console.log('Listening on port 3000');
});

module.exports = {
	app,
};
