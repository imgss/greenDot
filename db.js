var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/myproject';

function insert(user,data){
    MongoClient.connect(url, function(err, db) {
        insertDocuments(db, function() {
            db.close();
        });
    });
    var insertDocuments = function(db, callback) {
        var collection = db.collection('userData');
        // Insert some documents
        collection.insertOne({user,data}, function(err, result) {
            console.log('insert one');
        });
    }
}
function read(user,callback){
    console.log('read',user)
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('userData');
        collection.findOne({user},function(err, doc) {
            callback(doc);
            db.close();
    });
    });
}
module.exports={
    insert,
    read
}