# Routes
## User

    /user
    
    1. GET /all - Getting all users
    2. GET /:name - Getting user by name
    3. POST /login - Signing in
    4. POST /register - Signing up
    5. DELETE /:name - Deleting user
    6. PUT /:name - Updating password 

## Forum

    /forum

    1. GET /all - Getting all forums
    2. GET /:name - Getting forum by name
    3. POST / - Creating new forum
    4. POST /message/:forum_name - Adding message to forum
    5. DELETE /:name - Deleting forum
    6. DELETE /messages/:forum_name - Deleting all messages from forum