const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
let encryptedPassword;


const username = faker.name.findName();
const userpassword = faker.internet.password();
const phoneNum = faker.phone.phoneNumber('601#-#######');

bcrypt.genSalt(saltRounds, function (saltError, salt) {
    if (saltError) {
      throw saltError
    } else {
      bcrypt.hash(userpassword, salt, function(hashError, hash) {
      if (hashError) {
        throw hashError
      } else {
        encryptedPassword = hash;
        //console.log("Hash:",hash);
        
      }
      })
    }
    })

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.h4fs7.mongodb.net/myFirstDatabase",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})
	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register(username,userpassword,encryptedPassword,phoneNum)
		expect(res).toBe("Done create your account!!")
	})

	test("Duplicate username", async () => {
		const res = await User.register(username,userpassword,encryptedPassword,phoneNum)
		expect(res).toBe("Username already used")
	})

	test("User login invalid username", async () => {
		const res = await User.login("Apip",userpassword)
		expect(res).toBe("The username is wrong")
	})

	test("User login invalid password", async () => {
		const res = await User.login("Ellen McLaughlin","NK4zyE9avkmnx")
		expect(res).toBe("Wrong Input")
	})

	test("Username doesn't exist to login", async () => {
		const res = await User.login("Apop","1423")
		expect(res).toBe("Wrong Input");
	  })

	test("User login successfully", async () => {
		const res = await User.login(username,userpassword)
		expect(res.name).toBe(username)
		expect(res.password).toBe(userpassword)
	})
});