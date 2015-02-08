/* jshint node:true */
'use strict';

module.exports = {
  resolveOnDone: function resolveOnDone (done) {
    return function () {
      if (arguments.length === 0) {
        return done();
      }
      done(arguments[0]);
    };
  },
  resolveOnError: function resolveOnError (done) {
    return function () {
      if (arguments.length === 0) {
        return done(arguments[0]);
      }
      done();
    };
  },

  it: function (description, fnc) {
    fnc = arguments.length === 1 ? description : fnc;

    fnc.apply();
  }
};