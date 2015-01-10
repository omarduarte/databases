var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(attributes) {
        console.log(attributes);
      });

      // models.messages.post({
      //   username: 'New User',
      //   roomname: 'New Room',
      //   message: 'Is Anyone Here?'
      // }, function(){});
      res.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

