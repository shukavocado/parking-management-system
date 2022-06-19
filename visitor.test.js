const MongoClient = require("mongodb").MongoClient;
const Visitor = require("./visitor")

describe("Visitor Info Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.h4fs7.mongodb.net/myFirstDatabase",
			{ useNewUrlParser: true },
		);
		Visitor.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

    test("Visitor registration", async () => {
        const res = await Visitor.registerVisitor("kirrra","090909090909","c2")
        expect(res).toBe("new visitors registered")
    })
})