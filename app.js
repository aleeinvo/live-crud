require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const { Server } = require('socket.io');
const postSocket = require('./scokets/post');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Socket connection established');

  async function emitPostsIndex() {
    const posts = await postSocket.index();
    io.emit('posts:index', posts);
  }

  emitPostsIndex();

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('posts:create', async post => {
    console.log('Recivied post', post);
    await postSocket.create(post);
    emitPostsIndex();
  });

  socket.on('posts:update', async postData => {
    await postSocket.update(postData);
    emitPostsIndex();
  });

  socket.on('posts:destroy', async postId => {
    await postSocket.destroy(postId);
    emitPostsIndex();
  })

  socket.on('message:new', message => {
    console.log('received message: ', message);

    // socket.broadcast.emit('message:broad', message)

    io.emit('message:broad', message);
  })
});

module.exports = {
    server,
    port
};
