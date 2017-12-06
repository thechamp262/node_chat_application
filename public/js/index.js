
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
      let formattedTime = moment(newMessage.createAt).format('h:mm a');
      let li = jQuery('<li></il>');
      li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);

      jQuery('#messages').append(li);
    });

    jQuery('#message-form').on('submit',function(e){
      e.preventDefault();

      let messageTextBox = jQuery('[name=message]');

      socket.emit('createMessage',{
        from: "User",
        text: messageTextBox.val()
      },function(){
        messageTextBox.val('');
      })
    })

    let locationButton = jQuery('#send-location');

    socket.on('newLocationMessage',function(m){//m is for message
      let li = jQuery('<li></li>');
      let a = jQuery('<a target="_blank">My current location</a>');
      let formattedTime = moment(m.createdAt).format('h:mm a');

      li.text(`${m.from} ${formattedTime}: `);
      a.attr('href',m.url);
      li.append(a);
      jQuery('#messages').append(li);
    });


    locationButton.on('click',function(){
      if(!navigator.geolocation){
        return alert('Geolocation is not supported for your browser');
      }
      locationButton.attr('disabled','disabled').text('Sending location...')
      navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch your location');
      })
    });
