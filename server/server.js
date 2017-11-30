const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New users connected');

  socket.on("disconnect",()=>{
    console.log("The user has disconnected!");
  })
  //new message whofrom text createdattime stamp
  socket.emit("newMessage",{
    from: "test@email.com",
    message: "This is some dummy text",
    createdAT: 123321
  });
  socket.on("createMessage",(newMessage)=>{
    console.log(`New Message from ${newMessage.from}.`, newMessage);
  })

});

server.listen(port,()=>{
  console.log(`Started on at port ${port}`);
})
