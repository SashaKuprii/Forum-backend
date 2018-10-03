const express = require('express')
const ROUTER = express.Router()
const MongoClient = require('mongodb').MongoClient

const URI = "mongodb+srv://SashaKuprii:K04u02p20r04ii@forum-kjixh.mongodb.net/test?retryWrites=true"

MongoClient.connect(URI, {useNewUrlParser: true}, function(err, client) {
    
    if(err) {
        console.log(err)
        return
    }

    //Path to collection of users in DB

    global._USER = client.db("forum").collection("users")


    /**
     * Getting all users
     */

    ROUTER.get('/all', (req, res) => {
        
        _USER.find().toArray( (err, result) => { 
            if(err) { 
                console.log(err) 
                return res.sendStatus(500) 
            } 
            res.send(result) 
        })

    })

    /**
     * Getting user by name
     * @param 
     *     @var name - URL
     */

    ROUTER.get('/:name', (req, res) => {

        _USER.findOne({"name": req.params.name})
            .then( (result) => {
                res.send(result)
            })

    })  

    /**
     * Signing in user
     * Updating status and date online
     * @param
     *     @var name - body
     *     @var password - body
    */

    ROUTER.post('/login', (req, res) => {

        let user = {
            "name": req.body.name,
            "password": req.body.password
        }
        _USER.findOne({"name": user.name, "password": user.password}, {"name": 1})
            .then( result => {
                if(result != null) {
                    _USER.updateOne({"name": user.name, "password": user.password}, { $set: {"status": 1, "date_online": Date.now()}})
                    res.sendStatus(200)
                }
                else {
                    return res.sendStatus(500)
                }
            })

    })

    /**
     * Signing up new user 
     * @param
     *     @var name - body
     *     @var password - body
     *     @var email - body     
     */

    ROUTER.post('/register', (req, res) => {

        let user = {
            "name": req.body.name,
            "password": req.body.password,
            "email": req.body.email,
            "phone": req.body.phone
        }

        let error = { 
            "name": "",
            "email": "",
            "phone": ""
        }

        _USER.find({"name": user.name}).toArray( (err, result) => {
            if(err) {
                console.log(err)
                return res.sendStatus(500)
            }
            if(result != "") { 
                error.name = "This name has alreaady reserved"  
            }

            _USER.find({"email": user.email}).toArray( (err, result) => {
                if(err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                if(result != "") { 
                    error.email = "This email has alreaady reserved" 
                }
            })

            _USER.find({"phone": user.phone}).toArray( (err, result) => {
                if(err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                if(result != "") { 
                    error.phone = "This phone has alreaady reserved"  
                }


                if( error.name == "" && error.email == "" && error.phone == "" ) {
                    _USER.insertOne(user)
                    .then( () => {
                        _USER.updateOne({"name": user.name, "password": user.password}, { $set: {"status": 1, "date_online": Date.now()}})
                        res.sendStatus(200)
                    }) 
                }
                else {
                    res.sendStatus(500)
                }
            })
        })

    })

    /**
     * Deleting user by name
     * @param
     *     @var name - URL
     */

    ROUTER.delete('/:name', (req, res) => {
        
        _USER.deleteOne({"name": req.params.name})
            .then( () => {
                res.sendStatus(200)
            })

    })

    /**
     * Updating user's password 
     * @param  
     *    @var name - URL
     *    @var password - body
     */

    ROUTER.put('/:name', (req, res) => {
        
        _USER.updateOne({"name": req.params.name}, {$set: { "password": req.body.password } })
            .then( () => {
                res.sendStatus(200)
            })

    })
    
})

module.exports = ROUTER