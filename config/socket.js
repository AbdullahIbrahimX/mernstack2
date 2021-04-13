module.exports = (io)=>{
    io.of('/test').on('connection',test =>{
        console.log('test is good');
        io.of('/test').emit('test1');
        test.on('disconnect',()=>{
            console.log('Test disconnected')
        });
        test.on('test',()=>{
            console.log('test Googd');
            io.emit('test1');
        });
    });
    io.on('connection', socket=>{
    console.log(socket.id);

    socket.on("messageSent", socket =>{
       console.log('Socket log')
       console.log( socket );
        io.emit('newMessage');
    });
    ///////////////////////////
    //TODO for testing only >>> to be deleted
        socket.on('test',()=>{
            console.log('test Googd');
            io.emit('test1');
        });

    //////////////////////////




    socket.on('disconnect', socket=>{
        console.log(socket.id + "  Disconnected");
    });

});
};

