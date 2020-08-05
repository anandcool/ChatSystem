const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage  =require('./utils/messages')

const app = express();
const server = http.createServer(app)
const io = socketio(server);
const botName = 'ChatCord'

//Set Static folder
app.use(express.static(path.join(__dirname,'public')));

// Run when client connects
io.on("connection",socket =>{

    socket.on('joinRoom',({username,room})=>{
        socket.emit('message',formatMessage(botName,'Welcome to Chat Cord!!!'))

        //Broadcast when a user connects
        socket.broadcast.emit('message',formatMessage(username,`A ${username} has joined to chat`))
    })

        //Listen chat message
        socket.on('chatMessage',msg =>{
            io.emit('message',formatMessage('USER',msg))
         })


    //Runs when clients disconnect
    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botName,'A user has left chat'))
    })


})

const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>console.log(`Server is running at ${PORT}`))