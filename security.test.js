const MongoClient = require("mongodb").MongoClient;
const Security = require("./security")

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
		Security.injectDB(client);
	})
	afterAll(async () => {
		await client.close();
	})

	test("New security registration", async () => {
		const res = await Security.register(username,userpassword,encryptedPassword,phoneNum)
		expect(res).toBe("Done create your account!!")
	})
});