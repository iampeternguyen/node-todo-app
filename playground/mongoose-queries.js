const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

const id = '5ba4f9179a73b24f1d4e53fd11';

if (!ObjectID.isValid(id)) {
	return console.log('ID is not valid');
}
// Todo.find({ _id: id }).then(todos => {
// 	console.log(todos);
// });

// Todo.findOne({ _id: id }).then(todo => {
// 	console.log(todo);
// });

Todo.findById(id)
	.then(todo => {
		todo ? console.log(todo) : console.log('id not found');
	})
	.catch(e => console.log(e));
