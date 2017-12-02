
    let socket = io();
    socket.on('connect',function(){
      console.log("Connected to server");
      // socket.emit("createMessage",{
      //   from: "melissa",
      //   text: "This is some more dummy text!"
      // })
    });

    socket.on('disconnect',function(){
      console.log("Disconnected from server!");
    });

    socket.on("newMessage",function(newMessage){
      console.log("Incoming message",newMessage);
    });
