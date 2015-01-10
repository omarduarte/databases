CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  u_id MEDIUMINT NOT NULL,
  r_id MEDIUMINT,
  createdAt TIMESTAMP,
  content TEXT,
  PRIMARY KEY(id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

