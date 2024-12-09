const getDB = require('../utils/db').getDB

class User {
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }
    save() {
        const db = getDB();
        return db.collection('users').insertOne(this)
            .then((result) => {
                return result
            })
            .catch((err) => {
                console.log(err);
            });
    }
    static loginDataByEmail(email) {
        const db = getDB();
        return db.collection('users')
            .findOne({ email: email })
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err)
            })
    }
    static allLoginData(skip, limit) {
        const db = getDB();
        return db.collection('users')
            .find()
            .project({ email: 1 })
            .skip(skip)
            .limit(limit)
            .toArray()
            .then((result) => {
                return result
            }).catch((err) => {
                console.log(err)
            })
    }
    static updateData(email) {
        const db = getDB();
        return db
            .collection("users")
            .updateOne(
                { email: email },
                { $set: { email: email } }
            )
            .then((user) => {
                console.log("updateData----", user);
                return user
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static allUpdateItem(email) {
        const db = getDB();
        return db
            .collection("users")
            .updateMany(
                {},
                { $set: { email: email } }
            )
            .then((user) => {
                console.log("allUpdateItem----", user);
                return user
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static deleteSingleItem(email) {
        const db = getDB();
        return db
            .collection("users")
            .deleteOne(
                { email: email }
            )
            .then((user) => {
                console.log(user)
                return user
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static allDeleteItem() {
        const db = getDB();
        return db
            .collection("users")
            .deleteMany(
                {}
            )
            .then((user) => {
                console.log(user)
                return user
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = User