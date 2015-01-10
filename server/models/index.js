var db = require('../db');
var _ = require('underscore');

module.exports = {
  messages: {
    queryAllMessages: 'SELECT messages.id, users.username, messages.content, rooms.roomname, messages.createdAt ' +
                       'FROM messages ' +
                       'JOIN users ON users.id = messages.u_id ' +
                       'JOIN rooms ON rooms.id = messages.r_id ' +
                       'ORDER BY createdAt DESC',
    get: function (callback) {
      var dbconnection = db.openConnection();
      db.getAllFromTable(dbconnection, this.queryAllMessages, function(messages) {
        var results = [];
        messages.forEach(function(message) {
          results.push({
            objectId: message.id,
            username: message.username,
            roomname: message.roomname,
            text: message.content,
            createdAt: message.createdAt
          });
        });
        callback(results);
        db.closeConnection(dbconnection);
      });

    },
    insertMessageQuery: _.template("INSERT INTO messages "  +
                        "(u_id, r_id, content) " +
                        "VALUES (<%=userID%>,<%=roomID%>,<%=content%>)"),
    insertionAttributes: {
      userID: _.template("(SELECT DISTINCT(id) FROM users WHERE username='<%-username%>')"),
      roomID: _.template("(SELECT DISTINCT(id) FROM rooms WHERE roomname='<%-roomname%>')"),
      content:  _.template("'<%-text%>'")
    },
    post: function (message, callback) {
      var dbconnection = db.openConnection();
      var attributes = {};

      for (var key in this.insertionAttributes) {
        attributes[key] = this.insertionAttributes[key](message);
      }

      var self = this;
      db.createWhenInexistent(dbconnection, 'rooms', 'roomname', message.roomname, function() {
        db.createWhenInexistent(dbconnection, 'users', 'username', message.username, function() {
          db.insertIntoDB(dbconnection, self.insertMessageQuery(attributes), callback);
          db.closeConnection(dbconnection);
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};
