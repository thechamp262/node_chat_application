
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

    let locationButton = jQuery('#send-location');

    socket.on('newLocationMessage',function(m){//m is for message
      let li = jQuery('<li></li>');
      let a = jQuery('<a target="_blank">My current location</a>');

      li.text(`${m.from}: `);
      a.attr('href',m.url);
      li.append(a);
      jQuery('#messages').append(li);
    });

    locationButton.on('click',function(){
      if(!navigator.geolocation){
        return alert('Geolocation is not supported for your browser');
      }
      navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        console.log(position);
      },function(){
        alert('Unable to fetch your location');
      })
    });
