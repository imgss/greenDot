var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/myproject';

function insert(user, year, data){
    MongoClient.connect(url, function(err, db) {
        if(err){
            console.log('未开启mongodb')
        }
        insertDocuments(db, function() {
            db.close();
        });
    });
    var insertDocuments = function(db, callback) {
        var collection = db.collection('userData');
        // Insert some documents
        collection.insertOne({user, year, data}, function(err, result) {
            console.log('insert one');
        });
    }
}
function read(user, year, callback){
    console.log('read',user)
    MongoClient.connect(url, function(err, db) {
        if(err){
            console.log('未开启mongodb')
            callback(null);
            return;
        }
        var collection = db.collection('userData');
        collection.findOne({user, year},function(err, doc) {
            callback(doc);
            db.close();
        });
    });
}
module.exports={
    insert,
    read
}