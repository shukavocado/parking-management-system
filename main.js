const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.h4fs7.mongodb.net/myFirstDatabase",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Shukri server')
})

app.get('/welcome', (req, res) => {
	res.send('Welcome!!!!!!!')
})

app.post('/login', async (req, res) => {
	//console.log(req.body);

	const user = await User.login(req.body.username, req.body.userpassword);
	if(user=="The Username is invalid"||user=="The Password is invalid"){
		return res.status(404).send("Invalid Input")
	}
	return res.status(200).send("Login success")
})
app.post('/register', async (req, res) => {
	//console.log(username);
	const user = await User.register(req.body.username, req.body.userpassword);
	if(user=="Username exists"){
		return res.status(404).send("Username exists")
	}
	return res.status(200).send("Successfully, create new account")
	
})
app.patch('/update', async (req, res) => {
	//console.log(user);
	const user = await User.update(req.body.username);
	if(user == "The Username is incorrect"){
		return res.status(404).send("Fail updated")
	}
	return res.status(200).send("Successfully updated")
	
})
app.post ('/delete', async (req, res) => {
	//console.log(req.body);
	const user = await User.delete(req.body.username, req.body.userpassword);
	if (user == 'The Password is invalid' || user == "The Username is invalid"){
	  return res.status(404).send('Invalid Input')
	}
	return res.status(200).send('Successfully Delete')
  })
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
