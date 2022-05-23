const supertest = require('supertest');
const request = supertest('http://localhost:3000');
const bcrypt = require("bcryptjs");

describe('Express Route Test', function () {
	// it('should return hello world', async () => {
	// 	return request.get('/hello')
	// 		.expect(200)
	// 		.expect('Content-Type', /text/)
	// 		.then(res => {
	// 			expect(res.text).toBe('Hello BENR2423');
	// 		});
	// })

	it('User login successfully', async () => {
		return request
			.post('/login')
			.send({username: "Seth Kunde", userpassword: "ZsdyonNRkxXXpqv"})
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Login success");
			});
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({username: "Seth Kunde", userpassword: "ZsdyonNRkxXXpq"})
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Invalid Input");
	});
});
	

	it('register', async () => {
		return request
			.post('/register')
			.send({username: "Apup", userpassword: "Apupp156"})
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Successfully, create new account");
	});
});

	it('register failed', async () => {
		return request
			.post('/register')
			.send({username: 'Apup', userpassword: "Apupp15"})
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Username exists");
			});
	});

	it('update successfully', async () => {
		return request
			.patch('/update')
			.send({username: 'Seth Kunde'})
			.expect(200)
	});

	it('delete successfully', async () => {
    	return request
    	  .post('/delete')
    	  .send({username: "Ms. Lillie Adams", userpassword: "LPfFIsZMYqFQXEd"})
    	  .expect('Content-Type', /text/)
    	  .expect(200).then(response => {
     			expect(response.text).toEqual("Successfully Delete");
			});
	});

  	it('delete failed', async () => {
    	return request
    	.post('/delete')
      	.send({username: 'Barbara Klein V', userpassword: "FaiDJG3MGrW7tn"})
      	.expect('Content-Type', /text/)
      	.expect(404).then(response => {
        		expect(response.text).toEqual("Invalid Input");
    	});
	});
});