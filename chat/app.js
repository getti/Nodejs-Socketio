var express = require('express');
var app = express.createServer();
// 3000ポートでプログラムを動作させる
app.listen(process.env.PORT);
// ソケットを作る
var socketIO = require('socket.io');
// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var io = socketIO.listen(app);

// クライアントが接続してきたときの処理
io.sockets.on('connection', function(socket) {
  console.log(socket.id + 'が接続しました。');
  // メッセージを受けたときの処理
  socket.on('message', function(msg) {
    console.log(socket.id + "'がメッセージを送信しました。(" + msg + ")");
    // つながっているクライアント全員に送信
    socket.emit('message', msg);
    socket.broadcast.emit('message', msg);
  });
  
  // クライアントが切断したときの処理
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

