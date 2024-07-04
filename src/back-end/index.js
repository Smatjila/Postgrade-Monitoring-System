import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:5173"
}));

io.on('connection', (socket) => {
  console.log(`User Connected:${socket.id}`);
  
  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User joined room: ${socket.id} joined room:${data}`);
  });

  socket.on('send_message', (data) => {
    console.log(`Message from client: ${data.message}`);
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected:${socket.id}`);
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});





// import express from 'express';
// import http from 'http';
// import {Server} from "socket.io"
// import cors from 'cors'
// const app=express();
// const server=http.createServer(app)
// const io = new Server(server);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });
  
//   server.listen(3000, () => {
//     console.log('listening on *:3000');
//   });
// // const cors=require("cors"); 
// // app.use( cors());

// // const io=new Server(server,{
// //     cors:{
// //         orgin:"http://localhost:3000",
// //         methods:["GET","POST"],
// //     },
// // });

// // io.on("connection",(socket)=>{
// //     console.log(`User Connected:${socket.id}`);
// //     socket.on("join_room",(data)=>{
// //         socket.join(data);
// //     });
// // ///comminting
// // //index.js

    
// //     socket.on("send_message",(data)=>{
// //        socket.to(data.room).emit("receive_message",data)
// //     });
// // });
// // server.listen(3001,()=>{
// //     console.log("Server is running")
// // });