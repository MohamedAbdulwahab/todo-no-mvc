const express = require('express');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient
const { application } = require('express');

// Load config
dotenv.config({ path: './config/config.env' })

// use express for the entire application.
const app = express();

let db,
    dbConnectionStr = process.env.MONGO_URI,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
})
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


/***************************
 * Routers
 ***************************/
app.get('/', async (request, response) => {
	try {
		const todoItems = await db.collection('todos').find().toArray();
		const itemsLeft = await db.collection('todos').countDocuments({ completed: false });
		response.render('index.ejs', { items: todoItems, left: itemsLeft });
	} catch(error) {
		console.log(error);
	}
});

app.post('/addTodo', async (request, response) => {
	try {
		const result = await db.collection('todos').insertOne({ thing: request.body.todoItem, completed: false })
		console.log('todo added');
		response.redirect('/');
	} catch(error) {
		console.log(error);
	}
});

app.delete('/deleteItem', async (request, response) => {
	try {
		const deleteItem = await db.collection('todos').deleteOne({ thing: request.body.itemFromJS });
		console.log('Todo Deleted');
		response.json('Todo Delted');
	} catch(error) {
		console.log(error);
	}
});







const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`);
});