const net = require('net');

const prompt = require('prompt-sync')();

async function chat(){
    let data = prompt('> ');
    client.write(data);
}

const client = net.connect(3000, 'localhost', () => {
    console.log('i think ima conec ted');
    //chat();
})

client.on('data', (data) => {
    console.log(data.toString());
    chat();
})
client.on('end', () => {
    console.log('Discone cted');
})