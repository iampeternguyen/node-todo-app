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
		// 	.findOneAndUpdate(
		// 		{ _id: new ObjectID('5ba108b25ea7c08a5fe098bc') },
		// 		{
		// 			$set: {
		// 				completed: true,
		// 			},
		// 		},
		// 		{
		// 			returnOriginal: false,
		// 		}
		// 	)
		// 	.then(doc => {
		// 		console.log(doc);
		// 	});

		db.collection('Users')
			.findOneAndUpdate(
				{ _id: new ObjectID('5ba107a40a651eef30df09e8') },
				{
					$inc: {
						age: 5,
					},
				},
				{
					returnOriginal: false,
				}
			)
			.then(result => {
				console.log(result);
			});
		// client.close();
	}
);
