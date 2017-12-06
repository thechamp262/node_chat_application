
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
      let li = jQuery('<li></il>');
      li.text(`${newMessage.from}: ${newMessage.text}`);

      jQuery('#messages').append(li);
    });

    jQuery('#message-form').on('submit',function(e){
      e.preventDefault();
      socket.emit('createMessage',{
        from: "User",
        text: jQuery('[name=message]').val()
      },function(){

      })
    })
