const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGO_URI)
        .then(client => {
            console.log("Connected to mongoDB database");
            _db=client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDB=()=>{
    if(_db) {
        return _db;
    }
    throw "No database connection found!";
}

exports.mongoConnect=mongoConnect;
exports.getDB=getDB;


