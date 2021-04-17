const logger = require('morgan');
const passport = require('passport');
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);


module.exports = (io)=>{
    //----middleware----//
    // io.use(wrap(logger('dev')));
    io.use(wrap(passport.initialize()));
    io.use(wrap(passport.session()));
    require('../config/passport')(passport);


    //----NSPs----//


    io.of('/').use((socket,next)=>{
        console.log(socket.nsp.name.toString() + '   User connected : ' + socket.id)

        socket.on('disconnect',()=>{
           console.log(socket.nsp.name.toString() + '   User Disconnected');
           next();
        });
        next();
    });

    io.of('/test').use((socket,next)=>{
        socket.on('test',()=>{
            console.log('test is good');
        });
        socket.emit('test1');
        socket.on('disconnect',()=>{
            console.log('Test Disconnected');
        });
        next();
    })
};

//io.on('connection', socket=>{
//         console.log(socket.id);
//
//         socket.on("messageSent", socket =>{
//           console.log('Socket log')
//           console.log( socket );
//           io.emit('newMessage');
//     });
//
//
//     ///////////////////////////
//     //TODO for testing only >>> to be deleted
//     socket.on('test',()=>{
//             console.log('test Googd');
//             io.emit('test1');
//         });
//     io.of('/test').on('connection',test =>{
//         console.log('test is good');
//         io.of('/test').emit('test1');
//         test.on('disconnect',()=>{
//             console.log('Test disconnected')
//         });
//         test.on('test',()=>{
//             console.log('test Googd');
//             io.emit('test1');
//         });
//     });
//     //////////////////////////
//
//     socket.on('disconnect', socket=>{
//         console.log(socket.id + "  Disconnected");
//     });
//
// });
