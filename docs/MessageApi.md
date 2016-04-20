# Message Api

1. 发送消息
policy: default  
request: `POST /message?token&!isGuest&!isToGroup&!from&!to&!type&!content`  
result:  

    ```
    {
        from: Object,
        toUser: Object,
        toGroup: Object,
        time: Time,
        content: String,
        Type: String
    }
    ```