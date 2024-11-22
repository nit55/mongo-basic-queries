const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;
const MongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://arijitkundu333:arijit2907@cluster0.cav3m.mongodb.net/trail').then((client) => {
        _db = client.db();
        callback()
    }).catch((err) => {
        console.log(err)
        throw err
    })
}

const getDB = () => {
    if (_db) {
        return _db
    }
    throw 'not found DB'
}

exports.MongoConnect = MongoConnect
exports.getDB = getDB