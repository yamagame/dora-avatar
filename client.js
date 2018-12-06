let io = null;

module.exports = {

  //初期化
  init: (server) => {
    if (!io) {
      io = require('socket.io')(server);
      io.on('connection', function (socket) {
        console.log('connected');
      })
    }
  },

  //アクション
  action: (params) => {
    if (io) {
      io.emit('action', params);
    }
  }

}
