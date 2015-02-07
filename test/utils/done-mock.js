/* jshint node:true */
'use strict';

module.exports = {
  resolveOnDone: function resolveOnDone (done) {
    return function () {
      if (arguments.length === 0) {
        return done();
      }
      done(new Error('Failed the test on a negative result. Expected the promise to be resolved'));
    };
  },
  resolveOnError: function resolveOnError (done) {
    return function () {
      if (arguments.length === 0) {
        return done(new Error('Failed the test on a positive result. Expected the promise to be rejected'));
      }
      done();
    };
  },

  it: function (description, fnc) {
    fnc = arguments.length === 1 ? description : fnc;

    fnc.apply();
  }
};