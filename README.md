# ROUTES

## USER
    Path: /user
<hr>

    JSON-object of user:  
        {
            _id - identifier  
            name - unique user's name  
            password - user's password   
            email - unique user's email  
            phone - unique user's phone number  
            date_online - last online(Timestamp)  
            status - online/offline  
        }

>   Method: GET  
    Path: /user/all  
    Params: null  
    Respond: JSON 

>   Method: GET    
    Path: /user/:name   
    Params: name - URL     
    Respond: JSON

>   Method: POST    
    Path: /user/signin    
    Params: name - body; password - body  
    Respond: 200/500

>   Method: POST  
    Path: /user/signup  
    Params: name - body; password - body; email - body; phone - body   
    Respond: 200/500

>   Method: DELETE  
    Path: /user/:name  
    Params: name - URL  
    Respond: 200/500
 
>   Method: PUT  
    Path: /user/:name  
    Params: name - URL  
    Respond: 200/500

## FORUM

    Path: /forum
<hr>

    JSON-object of user:  
        {
            _id - identifier  
            name - unique forum's name  
            password - forum's password     
            date_creation - creation timestamp  
            creator - creator's id
            admin - admin's id
            moderators: [] - array of moderators' id
            members: [] - array of members' id  
            messages: [
                {
                    message - text of message  
                    author - authors' id  
                    date - date of publication  
                    likes - count of likes  
                    dislikes - count of dislikes  
                }
            ] - array of messages
        }

>   Method: GET  
    Path: /forum/all  
    Params: null  
    Respond: JSON 

>   Method: GET    
    Path: /forum/:name   
    Params: name - URL     
    Respond: JSON

>   Method: POST    
    Path: /forum/    
    Params: everything - body  
    Respond: 200/500

>   Method: POST  
    Path: /forum/message/:forum_name    
    Params: forum_name - URL; message - body; author - body; date - body   
    Respond: 200/500

>   Method: DELETE  
    Path: /forum/:name  
    Params: name - URL  
    Respond: 200/500
 
>   Method: DELETE  
    Path: /forum/messages/:forum_name  
    Params: forum_name - URL  
    Respond: 200/500
        