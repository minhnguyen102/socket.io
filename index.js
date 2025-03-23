const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    // console.log('a user connected', socket.id);

    // server send to client
    socket.emit("SEND_ID_USER", socket.id);

    // server receive from client
    socket.on('chat message', (data) => {
      
      // Khi A gửi lên sever và chỉ a nhận được 
      // dùng khi a bị lỗi trong quá trình gửi lên sever => sever chỉ được thông báo lỗi cho a chứ khong thể thong báo cho toàn bộ client 
      socket.emit("SEND_MESSAGE", data);

      // Khi A gửi lên sever và các client a, b, đều dùng được 
      // ví dụ : tính năng chat
      // io.emit("SEND_MESSAGE", data);

      // Khi A gửi lên sever và các client a, b, đều dùng được 
      // ví dụ : hiển thị thông báo sinh nhật, dấu typing(...) khi a gõ chat và chỉ người khác thấy được
      // socket.broadcast.emit("SEND_MESSAGE", data);
    });

  
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});