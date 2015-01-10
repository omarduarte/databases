var db = require('../db');
var queries = require('./queries.js');
var Promise = require('bluebird');
var promisedDB = Promise.promisifyAll(db);

module.exports = {
  messages: {

    get: function (callback) {

      var dbconnection = db.openConnection();

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

      db.createWhenNonexistent(dbconnection, 'rooms', 'roomname', message.roomname, function() {
        db.createWhenNonexistent(dbconnection, 'users', 'username', message.username, function() {
          db.queryDB(dbconnection, query, callback);
          db.closeConnection(dbconnection);
        });
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {

      var dbconnection = db.openConnection();

      db.getAllFromTable(dbconnection, queries.getAllUsers, function(err, users) {
        var results = [];
        users.forEach(function (user) {
          results.push({
            objectId: user.id,
            username: user.username,
          });
        });
        callback(err, results);
        db.closeConnection(dbconnection);
      });

    },
    post: function () {
      var dbconnection = db.openConnection();

      var attributes = {
        tablename: 'users',
        field: 'username',
        value: message.username
      };

      var query = queries.insertNewRowTemplate(attributes);

      db.createWhenNonexistent(dbconnection, 'users', 'username', message.username, function() {
        db.queryDB(dbconnection, query, callback);
        db.closeConnection(dbconnection);
      });
    }
  }
};
