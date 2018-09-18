// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
	'mongodb://localhost:27017',
	{ useNewUrlParser: true },
	(err, client) => {
		const db = client.db('TodoApp');
		if (err) {
			return console.log('Unable to connect to MongoDB server');
		}

		console.log('Connected to MongoDB server');

		// db.collection('Todos').insertOne({ text: 'Something to do', completed: false }, (err, result) => {
		// 	if (err) {
		// 		return console.log('Unable to insert todo', err);
		// 	}
		// 	console.log(JSON.stringify(result.ops, null, 2));
		// });

		// db.collection('Users').insertOne({ name: 'Peter', age: 30, location: 'Vietnam' }, (err, result) => {
		// 	if (err) {
		// 		return console.log('Unable to insert todo', err);
		// 	}
		// 	console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), null, 2));
		// });
		client.close();
	}
);
