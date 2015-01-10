var mysql = require('mysql');

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
      callback(rows);
    });
};

exports.insertIntoDB = function(connection, query, callback) {
  connection.query(query, function(err) {
    if (err) { throw err;}

    if (callback) {
      callback();
    }
  });
};

exports.closeConnection = function(connection) {
  connection.end();
};

exports.select = function() {

};

exports.createWhenInexistent = function(connection, tablename, field, value, callback) {
  connection.query('SELECT * FROM ' + tablename + ' WHERE '+ field + '=\'' + value + '\'' , function(err, rows) {
    if (err) { throw err;}

    console.log('Printing rows', rows);

    if (rows.length === 0) {
      var query = 'INSERT INTO '+tablename+' ('+field+') VALUES (\''+value+'\')';
      console.log('If there was no rows in the DB', query);
      connection.query(query, function(err) {
        if (err) { throw err; }
        callback();
      });
    } else {
      callback();
    }
  });
};
