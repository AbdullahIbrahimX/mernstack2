module.exports = (io)=>{
    io.on('connection', socket=>{
        console.log("User Connected:  " + socket.id)

        socket.on('messageSent', socket=>{
            console.log('new message from:  ' + socket.data);
            io.emit('newMessage',socket);
        })

        socket.on('disconnect', socket=>{
            console.log( "User Disconnected :"+ socket);
        });
    });

};
