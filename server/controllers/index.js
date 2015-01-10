var models = require('../models');
var bluebird = require('bluebird');
var response = require('../response-handler.js');


module.exports = {
  messages: {
    get: function (req, res) {

      models.messages.get(function(attributes) {
        var data = JSON.stringify({results: attributes});
        response(res, data, 200);
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = {
        username: req.param('username'),
        text: req.param('text'),
        roomname: req.param('roomname')
      };

      models.messages.post(message, function(err, result){
        response(res, JSON.stringify(result.insertId), 201);
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {},
    options: function(req, res) {}
  }
};

