const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const USER = require('./routes/user.js')
const FORUM = require('./routes/forum.js')

const URI = "mongodb+srv://SashaKuprii:K04u02p20r04ii@forum-kjixh.mongodb.net/test?retryWrites=true"

MongoClient.connect(URI, {useNewUrlParser: true}, function(err, client) {

    if(err) {
        console.log(err)
        return
    }
    
    app.use('/user', USER)
    app.use('/forum', FORUM)

    /**
     * Error 404 if invalid route
     */

    app.use(function (req, res, next) {
        res.status(404).send("Sorry can't find that!")
    })

    /**
     * Starting express server on port 4000
     */

    app.listen(4000, () => {
        console.log("Express server is running on port 4000!")
    })

})

