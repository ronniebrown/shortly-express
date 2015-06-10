var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  inititalize: function() {
    this.on('creating', this.hashPassword);
  }, 
  comparePassword: function(enteredPassword, cb) {
    bcrypt.compare(enteredPassword, this.get('password'), function(err, match) {
      cb(match);
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});

module.exports = User;

// var User = db.Model.extend({
//   inititalize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var hash = bcrypt.hashSync(model.get('password'));
//       model.set('password', hash);
//     });
//   }
// });

// var comparePassword = function(enteredPassword, cb) {
//   bcrypt.compare(enteredPassword, this.password, function(err, match) {
//     cb(match);
//   });
// };