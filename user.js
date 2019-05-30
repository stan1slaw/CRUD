const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/Users';

module.exports = {
	signup: function(name, email, password){
		MongoClient.connect(url, function(err, db) {
		  	db.collection('user').insertOne( {
				"name": name,
				"email": email,
				"password": password
			},function(err, result){
				assert.equal(err, null);
			});
		});
	},
	validateSignIn: function(username, password,callback){
		MongoClient.connect(url, function(err, db){
			db.collection('user').findOne( { email : username ,password: password 
			},function(err, result){
				if(result==null){
					callback(false)
				}
				else{
					callback(true)
				}
			});
		});
	}

}
