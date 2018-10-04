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