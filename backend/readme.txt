aAPI Docs

// Check if alias exists or not and then add alias
Http requests

POST : http://127.0.0.1:8000/chat/check

Request Body : { "alias": "username" }
Response Body : 
{
    "success": true,
    "alias": "username",
    "encrypted_alias": "cecea730f209ab0c8ccced7f6b0b6b85c8c5655352548afec0d23c987ffa5b78"
}
OR
{
    "success": false
}
Store "encrypted_alias" as it will be needed to add this user to active users list (Server side processing)
Using any other alias other than stored "encrypted_alias" will result in 403 error

###################################################################
WebSocket Connection 
'ws://127.0.0.1:8000/ws/chat/default/$'

For more information see 'room.html' source for javascript code to start and operate chatroom 
