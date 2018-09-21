const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

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
	if (ObjectID.isValid(req.params.id)) {
		Todo.findById(req.params.id)
			.then(todo => (todo ? res.send({ todo }) : res.status(404).send('todo not found')))
			.catch(err => res.status(404).send('todo not found'));
	} else {
		res.status(404).send('todo not found');
	}
});

app.delete('/todo/:id', (req, res) => {
	if (ObjectID.isValid(req.params.id)) {
		Todo.findOneAndDelete({ _id: req.params.id })
			.then(todo => {
				todo ? res.send({ todo }) : res.status(404).send('could not find todo to delete');
			})
			.catch(err => res.status(404).send('could not find todo to delete'));
	} else {
		res.status(404).send('could not find todo to delete');
	}
});

app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

module.exports = {
	app,
};
