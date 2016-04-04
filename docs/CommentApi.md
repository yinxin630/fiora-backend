# Comment Api

1. 发布评论  
policy: logged  
request: `POST /comment?!token&content`  
result:  

    ```
    {
        from: ObjectId,
        content: String,
        Time: Time
    }
    ```

2. 获取评论  
policy: default  
request: `GET /comment`  
result:  

    ```
    {
        comments: Array
    }
    ```