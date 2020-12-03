//Made by Pizzakeitto with the help of jeesusmies
//I have no more braincells left

const net = require('net');
const readline = require('readline');

var name;
var isReady = false;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('SIGINT', () => {
    console.log('Nah m8 do .exit instead :)');
    //rl.question('Are you sure you want to quit? ', (ans) => {
    //    if(ans.match(/^y(es)?$/i)) {
    //        rl.close();
    //        client.end();
    //    }
    //})
    //TODO: Get this working lol
})

function chat(){
    rl.question('> ', (ans) => {
        if(ans.toLowerCase() == '.exit') {
            client.write(`${name} has left the chat`)
            client.end();
            return;
        }
        process.stdout.clearLine(0, () => { });
        client.write(`${name}: ${ans}`);
        setTimeout(() => {
            chat()
        }, 50);
    })
}

const client = net.connect(3000, 'localhost', () => {
    setTimeout(() => {
        rl.question('Oi what you be called? ', (ans) => {
            name = ans;
            client.write(`${name} has joined the chat`);
            isReady = true;
            setTimeout(() => { chat(); }, 500)
        })
    }, 50)
})

client.on('data', (data) => {
    process.stdout.clearLine(0, () => { });
    process.stdout.cursorTo(0, () => { });
    console.log(data.toString());
    if(isReady){
        chat();
    }
})
client.on('end', () => {
    console.log('Disconnected!');
    rl.close();
})