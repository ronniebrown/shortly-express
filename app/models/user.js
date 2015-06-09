var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  username: String,
  password: String,
  inititalize: function() {
    db.knex('users').insert({ username: this.username, password: this.password });
  }
});

User.hashPassword = function(password) {
  bcrypt.hash(password, null, null, function(err, hash) {
    // db.knex('users').insert({ password: hash });
    return hash;
  });
};

User.comparePassword = function(enteredPassword, cb) {
  bcrypt.compare(enteredPassword, this.password, function(err, match) {
    cb(match);
  });
};

module.exports = User;