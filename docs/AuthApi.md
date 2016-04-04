# Auth API

1. 登录
policy: default  
request: `POST /auth?!token&!username&!password`  
result:  

    ```
    {
        user: ObjectId,
        token: String,
        expiry: Integer,
        socket: String
    }
    ```

2. 注销  
policy: logged  
request: `DELETE /auth?!token`  
result:  

    ```
    {
        msg: String
    }
    ```