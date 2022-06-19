let users;
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
const req = require('express/lib/request');
const saltRounds = 10;
let encryptedPassword;


class User {
	static async injectDB(conn) {
		users = await conn.db("Assignment").collection("admin")
	}
//register staff
	static async register(username,userpassword,phoneNum,encryptedPassword) {

		bcrypt.genSalt(saltRounds, function (saltError, salt) {
			if (saltError) {
			throw saltError
			} else {
			bcrypt.hash(userpassword, salt, function(hashError, hash) {
			if (hashError) {
			  return hashError
			} else {
			  encryptedPassword = hash;
			  //console.log("Hash:",hash);
			}
			})
			}
			})

		const user = await users.findOne({  
			$and: [{ 
			"name": username,       
			"password": userpassword,
			}]})
			.then(async user =>{
			// TODO: Check if username exists
			if (user){
				if ( user.name == username )		
				{
					return "Username already used";
				}
			}
			else{
				// TODO: Save user to database
				await users.insertOne({					
					"name" : username,
					"password" : userpassword,
					"encryptedpassword" : encryptedPassword,
					"phone number": phoneNum,
				})
				return "Done create your account!!"
			}
		})	
		return user;
	}

	//login
	static async login(username, userpassword) {

		const user = await users.findOne({$or: [{"name" : username}, {"password" : userpassword}]})
		.then(async user =>{
			//console.log(username)
			if (user)
			{													
				if (user.name != username && user.password == userpassword) {		
					return "The username is wrong";
				}
				else if (user.name == username && user.password != userpassword) 
				{	
					return "The password is wrong";
				}
				else
				{
					return user;
				}
			}
			else
		{
			return "Wrong Input";
		}
		})
		return user;
	}

	//updates
	static async update(username, phoneNum) {

		return users.findOne({"name" : username})
		.then(async user =>{
			//console.log(user)
			if (user)
			{									
				return users.updateOne({"name" : username},{$set : { phoneNum : "01774683939"}})
				.then(result =>{
					console.log(result)
				})
			}
			else
			{
			return "The username is wrong";
			}
		})
	}

	//delete
	static async delete (username,userpassword){
		return users.findOne({
		  "name" : username
		}).then(async user =>{
	
		  if (user){
			if (user.password != userpassword){
			  return "The password is wrong"
			}
			else {
			  await users.deleteOne({"name" : username})
				return "Data have been deleted"
			}
		  }
		  else {
			return "The username is wrong"
		  }
		})
	  }	
}
module.exports = User;