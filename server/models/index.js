var db = require('../db');
var queries = require('./queries.js');
var promisify = require('bluebird').promisify;

module.exports = {
  messages: {

    get: function (callback) {

      var dbconnection = db.openConnection();

      // THIS PROMISE IS STILL NOT WORKING
      // var getAllFromTable = promisify(db.getAllFromTable);
      // getAllFromTable(dbconnection, queries.getAllMessages)
      // .then(function(err, messages) {
      //   var results = [];
      //   console.log(messages);
      //   messages.forEach(function(message) {
      //     results.push({
      //       objectId: message.id,
      //       username: message.username,
      //       roomname: message.roomname,
      //       text: message.content,
      //       createdAt: message.createdAt
      //     });
      //   });
      //   callback(err, results);
      //   db.closeConnection(dbconnection);
      // })
      // .catch(function(err) {if (err) { throw err; }});

      db.getAllFromTable(dbconnection, queries.getAllMessages, function(err, messages) {
        var results = [];
        messages.forEach(function (message) {
          results.push({
            objectId: message.id,
            username: message.username,
            roomname: message.roomname,
            text: message.content,
            createdAt: message.createdAt
          });
        });
        // console.log(messages);
        callback(err, results);
        db.closeConnection(dbconnection);
      });
    },

    post: function (message, callback) {
      var dbconnection = db.openConnection();

      var attributes = {};

      for (var key in queries.getIDTemplates) {
        attributes[key] = queries.getIDTemplates[key](message);
      }

      var query = queries.insertMessageTemplate(attributes);

      db.createWhenInexistent(dbconnection, 'rooms', 'roomname', message.roomname, function() {
        db.createWhenInexistent(dbconnection, 'users', 'username', message.username, function() {
          db.insertIntoDB(dbconnection, query, callback);
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
