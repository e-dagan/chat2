let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
//const port = 3010 //glitch:
const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
    });


    socket.on("message", (data)=>{
      console.log(data);
      io.emit("incoming", data);
    });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
