
    let socket = io();

    let scrollToBottom = function(){
      //selectors
      let messages = jQuery('#messages');
      let newMessage = messages.children('li:last-child');

      //heights
      let clientHeight = messages.prop('clientHeight');
      let scrollTop = messages.prop('scrollTop');
      let scrollHeight = messages.prop('scrollHeight');
      let newMessageHeight = newMessage.innerHeight();
      let lastMessageHeight = newMessage.prev().innerHeight();

      if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight  >= scrollHeight){
        messages.scrollTop(scrollHeight);
      }
    }

    socket.on('connect',function(){
      let params = jQuery.deparam(window.location.search);

      socket.emit('join',params,function(e){
        if(e){
          alert(e);
          window.location.href = "/";
        }else{
          console.log("No error!");
        }
      });
    });

    socket.on('disconnect',function(){
      console.log("Disconnected from server!");
    });

    socket.on('updateUserList',function(users){
      let ol = jQuery('<ol></ol>');
      users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
      })
      jQuery('#users').html(ol);
    })

    socket.on("newMessage",function(newMessage){
      let formattedTime = moment(newMessage.createAt).format('h:mm a');
      let template = jQuery('#message-template').html();
      let html = Mustache.render(template,{
        text: newMessage.text,
        from: newMessage.from,
        createdAt: formattedTime
      });
      jQuery('#messages').append(html);
      scrollToBottom();
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
      let formattedTime = moment(m.createdAt).format('h:mm a');
      let template = jQuery('#location-message-template').html();
      let html = Mustache.render(template,{
        url: m.url,
        from: m.from,
        createdAt: formattedTime
      });
      jQuery('#messages').append(html);
      scrollToBottom();
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
