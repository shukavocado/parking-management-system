const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const Visitor = require("./visitor");

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
    Visitor.injectDB(client);
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition:{
    openapi: '3.0.0',
    info:{
      title: 'MyVMS API',
      version: '1.0.0',
    },
  },
  apis: ['./main.js'],
}

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

	const user = await User.login(req.body.username, req.body.userpassword)
	if(user=="The username is wrong"||user=="The password is wrong"){
		return res.status(404).send("Wrong Input")
	}
	return res.status(200).send("Login success")
})
/**
 * @swagger
 * /login:
 *   post:
 *     description: Staff Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               userpassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: Wrong password or username
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */
app.post('/register', async (req, res) => {
	//console.log(username);
	const user = await User.register(req.body.username, req.body.userpassword, req.body.phoneNum);
	if(user=="Username already used"){
		return res.status(404).send("Username already used")
	}
	return res.status(200).send("Done create your account!!")
	
})
/**
 * @swagger
 * /register:
 *   post:
 *     description: Staff Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               userpassword:
 *                 type: string
 *               phoneNum: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Done create your account!!
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: Username already used
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */

app.patch('/update', async (req, res) => {
	//console.log(user);
	const user = await User.update(req.body.username);
	if(user == "The username is wrong"){
		return res.status(404).send("Fail updated")
	}
	return res.status(200).send("Successfully updated")
	
})
/**
 * @swagger
 * /update:
 *   patch:
 *     description: update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful updated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: Fail updated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */

app.delete ('/delete', async (req, res) => {
	//console.log(req.body);
	const user = await User.delete(req.body.username, req.body.userpassword);
	if (user == 'The password is wrong' || user == "The username is wrong"){
	  return res.status(404).send('Wrong Input')
	}
	return res.status(200).send('Successfully Delete')
  })
/**
 * @swagger
 * /delete:
 *   delete:
 *     description: delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               userpassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully Delete
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: Wrong input
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})


//visitor

app.post('/register/visitor', async (req, res) => {
	//console.log(username);
	const visitor = await Visitor.registerVisitor(req.body.username, req.body.phoneNum, req.body.parking);
	if(visitor=="parking not available"){
		return res.status(404).send("parking not available")
	}
	return res.status(200).send("new visitors registered")
})
/**
 * @swagger
 * /register/visitor:
 *   post:
 *     description: Register visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               phoneNum:
 *                 type: string
 *               parking:
 *                 type: string
 *     responses:
 *       200:
 *         description: new visitor registered
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: parking not available
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */

app.patch('/update/visitor/parking', async (req, res) => {
	//console.log(user);
	const visitor = await Visitor.updateVisitor(req.body.username,req.body.parking);
	if(visitor == "Visitor not exist"){
		return res.status(404).send("Fail updated")
	}
	return res.status(200).send("Successfully updated")
	
})
/**
 * @swagger
 * /update/visitor/parking:
 *   patch:
 *     description: Update visitor parking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               parking:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: Fail updated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */

app.post ('/delete/visitor', async (req, res) => {
	//console.log(req.body);
	const visitor = await Visitor.delete(req.body.username);
	if (visitor == 'The visitor is not exist'){
	  return res.status(404).send('Wrong Input')
	}
	return res.status(200).send('Successfully Delete')
})
/**
 * @swagger
 * /delete/visitor:
 *   post:
 *     description: Delete visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful delete
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: Wrong input
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */



app.post('/register/security', async (req, res) => {
    const security = await Security.register(req.body.securityName, req.body.password, req.body.phoneNum)
    if(req.user.role=="admin"){
      if (security == "Username already existed"){
        return res.status(404).send("Security already existed")
    }
    else{
        return res.status(200).send("New Security registered")
    }
    }
    else{
      return res.status(403).send('Unauthorized')
    }
})
/**
 * @swagger
 * /register/security:
 *   post:
 *     description: Staff Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               securityName: 
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNum:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: Security already existed
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */


app.delete('/delete/security', async (req, res) => {
	const security = await Security.delete(req.body.securityusername)
	if(req.user.role == "admin"){
	  if (security == "Security is not exist"){
		return res.status(404).send("Security is not exist")
		
	}
	  else {
		return res.status(200).json({
  
		  status: "Security deleted"
		})
	} 
	}
	else{
	  return res.status(403).send('Unauthorized')
	 
	} 
})
/**
 * @swagger
 * /register/security:
 *   delete:
 *     description: Staff Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               securityName: 
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNum:
 *                 type: string
 *     responses:
 *       200:
 *         description: Security deleted
 *         content:
 *           text/plain:
 *             schema:
 *           type: string
 * 
 *       404:
 *         description: Security is not exist
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 */


