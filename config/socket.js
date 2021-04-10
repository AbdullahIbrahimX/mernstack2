module.exports = (io)=>{
    io.on('connection', socket=>{
        console.log(socket.id);

        socket.on("messageSent", socket =>{
           console.log(socket)
            io.emit('newMessage')
        });

    });
    io.on('disconnection', socket=>{
        console.log(socket.id + "  Disconnected");
    });
};
