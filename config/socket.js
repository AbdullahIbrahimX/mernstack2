module.exports = (io)=>{
    io.on('connection', socket=>{
        console.log(socket.id);

        socket.on("messageSent", socket =>{
           console.log('Socket log')
           console.log( socket );
            io.emit('newMessage');
        });

        socket.on('test',()=>{
            console.log('test Googd');
            io.emit('test1');
        })
        socket.on('disconnect', socket=>{
            console.log(socket.id + "  Disconnected");
        });

    });

};
