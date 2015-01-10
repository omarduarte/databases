var db = require('../db');

module.exports = {
  messages: {
    queryAllMessages: 'SELECT messages.id, users.username, messages.content, rooms.roomname, messages.createdAt ' +
                       'FROM messages ' +
                       'JOIN users ON users.id = messages.u_id ' +
                       'JOIN rooms ON rooms.id = messages.r_id',
    get: function (callback) {
      var dbconnection = db.openConnection();
      db.getAllFromTable(dbconnection, this.queryAllMessages, function(messages) {
        var results = [];
        messages.forEach(function(message) {
          results.push({
            objectId: message.id,
            username: message.username,
            roomname: message.roomname,
            createdAt: message.createdAt
          });
        });
        callback(results);
      });

      db.closeConnection(dbconnection);
    }, // a function which produces all the messages
    insertMessageQuery: 'INSERT ',
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};
