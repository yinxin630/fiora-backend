# User API

1. 创建用户  
policy: default   
request: `POST /user?!username&!password`  
result:

    ```
    {
        id: ObjectId
    }
    ```

2. 获取用户  
policy: default  
request: `GET /user?token`  
result:

    ```
    {
        id: ObjectId,
        username: String,
        avatar: String,
        linkmans: Array,
        groups: Array,
        socketId: String
    }
    ```

3. 修改用户信息  
policy: logged  
request: `PUT /user?!token&avatar`  
result:

    ```
    {
        username: String,
        avatar: String
    }
    ```