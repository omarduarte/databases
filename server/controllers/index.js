var models = require('../models');
var promisify = require('bluebird').promisify;
var response = require('../response-handler.js');


module.exports = {
  messages: {
    get: function (req, res) {
      var get = promisify(models.messages.get);

      get()
      .then(function(data) {
        response(res, JSON.stringify({results: data}), 200);
      })
      .catch(function(err) { throw err; });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = {
        username: req.param('username'),
        text: req.param('text'),
        roomname: req.param('roomname')
      };

      models.messages.post(message, function(err, result) {
        if (err) { throw err; }
        response(res, JSON.stringify(result.insertId), 201);
      });

      // Promises don't seem to work with posts now...
      // var post = promisify(models.messages.post);

      // post(message)
      //   .then(function(result) {
      //     response(res, JSON.stringify(result.insertId), 201);
      //   })
      //   .catch(function(err){ throw err;});

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {},
    options: function(req, res) {}
  }
};

