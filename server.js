//Made by Pizzakeitto with the help of jeesusmies
//I have no more braincells left

const net = require('net');
let sockets = [];

function arrayRemove(arr, value){
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

const server = net.createServer((socket) => {
    console.log('Someone connected!');
    sockets.push(socket);
    socket.on('end', () =>{
        console.log('Someone disconnected!');
        arrayRemove(sockets, socket);
    })
    socket.on('error', (err) => {
        //throw(err);
        console.log('Ignoring error: ' + err);
    })
    let count = server.connections;
    socket.write('Welcome to shitty chatroom!\n');
    socket.write('Youre here with ' + count + ' other people.\n')
    socket.write('Oh btw dont do CTRL C, things will break!\n')
    //socket.pipe(socket);
    socket.on('data', (data) => {
        sockets.forEach(socket => {
            socket.write(data);
        });
    })
})

server.on('error', (err) => {
    throw(err);
});

server.listen({ host: 'localhost', port: 3000 }, () => {
    console.log('Opened server on ', server.address());
})
