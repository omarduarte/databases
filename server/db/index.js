var mysql = require('mysql');
var queries = require('../models/queries.js');
var Promise = require('bluebird');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


exports.openConnection = function() {

  var dbConnection = mysql.createConnection({
    user: "root",
    password: "1234",
    database: "chat"
  });

  dbConnection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + dbConnection.threadId);

  });
  return dbConnection;
};

exports.getAllFromTable = function(connection, query, callback) {
    connection.query(query, function(err, rows) {
      if (err) { throw err; }
      callback(err, rows);
    });
};


exports.queryDB = function(connection, query, callback) {
  connection.query(query, function(err, result) {
    if (err) { throw err; }
    callback(err, result);
  });
};

exports.closeConnection = function(connection) {
  connection.end();
};

exports.getMatchingField = function(connection, tablename, field, value, callback) {
  var query = queries.getAllMatchingTemplate({
    tablename: tablename,
    field: field,
    value: value
  });
  connection.query(query , function(err, rows) {
    callback(err, rows);
  });
};

exports.createWhenNonexistent = function(connection, tablename, field, value, callback) {
  exports.getMatchingField(connection, tablename, field, value, function(err, rows) {
    if (err) { throw err;}

    if (rows.length === 0) {
      var query = queries.insertNewRowTemplate({
        tablename: tablename,
        field: field,
        value: value
      });
      exports.queryDB(connection, query, callback);
    } else {
      callback(err, rows);
    }
  });
};
