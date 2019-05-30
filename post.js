const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/Users';
module.exports = {
	addPost: function(title, posttext, callback){
		MongoClient.connect(url, function(err, db) {
		  	db.collection('post').insertOne( {
				"title": title,
				"posttext": posttext
			},function(err, result){
				assert.equal(err, null);
		    	if(err == null){
		    		callback(true)
		    	}
		    	else{
		    		callback(false)
		    	}
			});
		});
	},
	updatePost: function(id, title, posttext, callback){
		MongoClient.connect(url, function(err, db) {
				db.collection('post').updateOne( 
						{ "_id": new mongodb.ObjectID(id) },
						{ $set: 
								{ "title" : title,
									"posttext" : posttext 
								}
						},function(err, result){
						assert.equal(err, null);
						console.log("Updated");
						if(err == null){
								callback(true)
						}
						else{
								callback(false)
								console.log('error')
						}
				});
		});
	},
getPost: function(callback){
		
	MongoClient.connect(url, function(err, db){
		 db.collection('post', function (err, collection) {
					collection.find().toArray(function (err, list) {
							callback(list);
					});
			 });
	})
},

deletePost: function(id, callback){
 
	MongoClient.connect(url, function(err, db){
			 db.collection('post').deleteOne({
					"_id": new mongodb.ObjectID(id)
			 },
			 function(err, result){
					assert.equal(err, null);
					if(err == null){
							callback(true)
					}
					else{
							callback(false)
					}
			});
	})
},
getPostWithId: function(id, callback){
	MongoClient.connect(url, function(err, db){
			 db.collection('post').findOne({
					"_id": new mongodb.ObjectID(id)
			 },
			 function(err, result){
					assert.equal(err, null);
					console.log("Take post");
					if(err == null){
							callback(result)
					}
					else{
							callback(false)
					}
			});
	})
}
}

