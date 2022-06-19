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

	//user 
	it('User login successfully', async () => {
		return request
			.post('/login')
			.send({username: "Joanne Torphy", userpassword: "AksoG7jlAunC1KB", })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Login success");
			});
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({username: "Joanne Torphy", userpassword: "AksoG7jlAunC"})
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Wrong Input");
	});
});
	

	it('register', async () => {
		return request
			.post('/register')
			.send({username: "Apup", userpassword: "Apupp156", phoneNum: "01133277013"})
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Done create your account!!");
	});
});

	it('register failed', async () => {
		return request
			.post('/register')
			.send({username: 'Apup', userpassword: "Apupp15", phoneNum: "011332770"})
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Username already used");
			});
	});

	it('update successfully', async () => {
		return request
			.patch('/update')
			.send({username: 'Joanne Torphy'})
			.expect(200)
	});

	it('delete successfully', async () => {
    	return request
    	  .post('/delete')
    	  .send({username: "Clara Crooks", userpassword: "6eTi6XAXKMafYrX"})
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
        		expect(response.text).toEqual("Wrong Input");
    	});
	});
});

//Visitor
it('Visitor register', async()=>{
    return request
    	.post('/register/visitor')
    	.send({username:"fin",phonenumber:"0195995732",parking:"A1"})
    	.expect(200)
  	});

it('Update parking', async () => {
	return request
		.patch('/update/visitor/parking')
		.send({username: 'aliabu', parking:"B1"})
		.expect(200)
  
  	});

it('Delete visitor', async () => {
    return request
    	.post('/delete/visitor')
    	.send({username: "ainin"})
    	.expect('Content-Type', /text/)
    	.expect(200).then(response => {
     		expect(response.text).toEqual("Successfully Delete");
		});
});
//Security
it('Staff register', async()=>{
	return request
	.post('/register/security')
	.send({securityName:"Azhar",userpassword:"abcde",phoneNum:"0174273564"})
	.expect(200)
  	}); 

//security register fail
it('Staff register', async()=>{
	return request
		.post('/register/security')
		.send({securityName:"Azhar",userpassword:"abcde",phoneNum:"174273564"})
		.expect(404)
  }); 

//delete security
it('Delete security', async () => {
	return request
		.delete('/delete/security')
		.send({securityName: 'Jeanette Boehm'})
		.expect(200)
  });

  