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

		// db.collection('Todos')
		// 	.find({ _id: new ObjectID('5ba10587d9771ebbc8a2a3c1') })
		// 	.toArray()
		// 	.then(docs => {
		// 		console.log(JSON.stringify(docs, null, 2));
		// 	})
		// 	.catch(err => {
		// 		console.log('Unable to fetch todos', err);
		// 	});

		// db.collection('Todos')
		// 	.find()
		// 	.count()
		// 	.then(count => {
		// 		console.log(count);
		// 	})
		// 	.catch(err => {
		// 		console.log('Unable to fetch todos', err);
		// 	});

		db.collection('Users')
			.find({ name: 'Peter' })
			.toArray()
			.then(docs => {
				console.log(docs);
			})
			.catch(err => {
				console.log(err);
			});
		// client.close();
	}
);
