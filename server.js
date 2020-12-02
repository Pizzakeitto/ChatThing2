const net = require('net');

const server = net.createServer((socket) => {
    console.log('Someone connected!');
    socket.on('end', () =>{
        console.log('Someone disconnected!');
    })
    socket.on('error', (err) => {
        //throw(err);
        console.log('Ignoring error: ' + err);
    })
    socket.write('Welcome to shitty chatroom!\n');
    var count = server.connections;
    socket.write('Youre here with ' + count + ' other people.')
    //socket.pipe(socket);
    socket.on('data', (data) => {
        console.log(data);
        socket.write(data);
    })
})

server.on('error', (err) => {
    throw(err);
});

server.listen({ host: 'localhost', port: 3000 }, () => {
    console.log('Opened server on ', server.address());
})
