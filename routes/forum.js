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

    global._FORUM = client.db("forum").collection("forums")


    /**
     * Getting all forums
     */

    ROUTER.get('/all', (req, res) => {
        
        _FORUM.find().toArray( (err, result) => {
            if(err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.send(result)
        })

    })

    /**
     * Getting forum by name
     * @param 
     *     @var name - URI
     */

    ROUTER.get('/:name', (req, res) => {
         
        _FORUM.findOne({"name": req.params.name})
            .then( (result) => {
                res.send(result)
            })

    })

    /**
     * Creating new forum
     * @param
     *     @var name - body
     *     @var password - body
     *     @var creator - body
     *     @var admin - body
     */

    /**
     * Forum collection structure:
     * 
     * name
     * password
     * date_creation
     * creator
     * admin
     * moderators
     * members:object
     * messages -> {
     *      message
     *      author
     *      date
     *      likes
     *      dislikes
     * }
     *   
     */

    ROUTER.post('/', (req, res) => {
        
        let forum = {
            "name": req.body.name,
            "password": req.body.password,
            "date_creation": Date.now(),
            "creator": req.body.creator,            
            "admin": req.body.creator,
            "moderators": {},
            "members": [req.body.creator],
            "messages": []
        }

        let error = { 
            "name": ""
        }

        _FORUM.find({"name": forum.name}).toArray( (err, result) => {
            if(err) {
                console.log(err)
                return res.sendStatus(500)
            }
            if(result != "") {
                error.name = "This name has already reserved"
            }

            if(error.name == "") {
                _FORUM.insertOne(forum)
                    .then( () => {
                        res.sendStatus(200)
                    })
            }
            else {
                res.sendStatus(500)
            }
        })

    })

    /**
     * Adding message to forum
     * @param
     *     @var forum_name - URI
     *     @var message - body
     *     @var author - body
     *     @var date - auto
     */

    ROUTER.post('/message/:forum_name', (req, res) => {
        
        _FORUM.find({"name": req.params.forum_name}).toArray( (err, result) => {
            if(err) {
                console.log(err)
                return res.sendStatus(500)
            }
            if(result == "") 
                return res.sendStatus(500)
            
            let message = {
                "message": req.body.message,
                "author": req.body.author,
                "date": Date.now()
            }
            
            _FORUM.updateOne({"name": req.params.forum_name}, { $push: { "messages": { $each: [message], $sort: {"date": -1} }} })
                .then( () => {
                    res.sendStatus(200)
                })
        })

    })

    /**
     * Deleting forum 
     * @param   
     *     @var name - URI
     */

    ROUTER.delete('/:name', (req, res) => {
        
        _FORUM.deleteOne({"name": req.params.name})
            .then( () => {
                res.sendStatus(200)
            })

    })

    /**
     * Deleting all messages from forum
     * @param
     *     @var forum_name - URI
     */

    ROUTER.delete('/messages/:forum_name', (req, res) => {
       
        _FORUM.updateOne({ "name": req.params.forum_name}, { $pull: { "messages": {} } })
            .then( () => {
                res.sendStatus(200)
            })

    })

})

module.exports = ROUTER