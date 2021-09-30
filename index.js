var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    cors = require('cors');
app.use(cors());

http.listen(3000,() => console.log(3000));

//io.on('connect', (socket) => console.log("CONNECT!"));
app.get('/',(req,res) => res.json( 'oksk' ));

