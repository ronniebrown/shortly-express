var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  username: String,
  email: String,
  password: String
});

User.hashPassword = function() {
  bcrypt.hash(this.password, null, null, function(err, hash) {
    db.knex('users').insert({ password: hash });
  });
};

User.comparePassword = function(enteredPassword, cb) {
  bcrypt.compare(enteredPassword, this.password, function(err, match) {
    cb(match);
  });
};

module.exports = User;