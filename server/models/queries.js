var _ = require('underscore');

module.exports = {

  getAllMessages : 'SELECT messages.id, users.username, messages.content, rooms.roomname, messages.createdAt ' +
                       'FROM messages ' +
                       'JOIN users ON users.id = messages.u_id ' +
                       'JOIN rooms ON rooms.id = messages.r_id ' +
                       'ORDER BY createdAt DESC',

  insertMessageTemplate : _.template("INSERT INTO messages " +
                                   "(u_id, r_id, content) " +
                                   "VALUES (<%=userID%>,<%=roomID%>,<%=content%>)"),

  getIDTemplates : {
    userID: _.template("(SELECT DISTINCT(id) FROM users WHERE username='<%-username%>')"),
    roomID: _.template("(SELECT DISTINCT(id) FROM rooms WHERE roomname='<%-roomname%>')"),
    content:  _.template("'<%-text%>'")
  },

  getAllMatchingTemplate: _.template("SELECT * FROM <%= tablename %> WHERE <%= field %>='<%= value %>' "),

  insertNewRowTemplate: _.template("INSERT INTO <%= tablename %> (<%= field %>) VALUES ('<%= value %>') ")
};
