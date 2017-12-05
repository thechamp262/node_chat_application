const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require("./utils/message");

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{

  console.log('New users connected');

  socket.emit("newMessage",generateMessage('Admin','Welcome to the chat app!'));

  socket.broadcast.emit("newMessage",generateMessage('Admin','A new user has joined!'));

  socket.on("createMessage",(newMessage)=>{
    console.log(`New Message from ${newMessage.from}.`, newMessage);

    // socket.broadcast.emit("newMessage",{
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   date: new Date().getTime()
    // });
    io.emit("newMessage",generateMessage(newMessage.from,newMessage.text));
  })

  socket.on("disconnect",()=>{
    console.log("The user has disconnected!");
  })
  //new message whofrom text createdattime stamp
  // socket.emit("newMessage",{
  //   from: "test@email.com",
  //   message: "This is some dummy text",
  //   createdAT: 123321
  // });

});

server.listen(port,()=>{
  console.log(`Started on at port ${port}`);
})
