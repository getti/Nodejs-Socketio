var express = require('express');
var app = express.createServer();
app.listen(process.env.PORT);
var socketIO = require('socket.io');
var io = socketIO.listen(app);

io.sockets.on('connection', function(socket) {
  console.log(socket.id + 'が接続しました。');
  // メッセージを受けたときの処理
  socket.on('message', function(msg) {
    console.log(socket.id + "'がメッセージを送信しました。(" + msg + ")");

    socket.emit('message', msg);  // 送信元イベント発火
    socket.broadcast.emit('message', msg);  // ブロードキャスト
  });
  
  socket.on('disconnect', function(){
    console.log(socket.id + 'が切断しました。');
  });
});

// リクエストが来たら、index.ejsの内容をクライアントに出力する
app.get('/', function(req, res){
  res.render('index.ejs', {
    layout: false
  });
});

