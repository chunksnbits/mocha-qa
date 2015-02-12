/* jshint node:true */
/* global it, before, beforeEach, after, afterEach, window */
'use strict';


var _ = require('lodash');

//
// Argument handling has been derived from the way
// angular $injector is parsing function arguments:
// https://github.com/angular/angular.js/blob/master/src/auto/injector.js#L71
//
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;


function callbackRequiresDone (fnc) {
  var fncText = fnc.toString().replace(STRIP_COMMENTS, '');
  var matches = fncText.match(FN_ARGS);

  if (!matches) {
    return false;
  }

  var args = matches[1].replace(/ /g, '').split(FN_ARG_SPLIT);

  return _.contains(args, 'done');
}

function PromiseRejectedError (message) {
  this.name = 'PromiseRejectedError';
  this.message = message;
}
PromiseRejectedError.prototype = Error.prototype;

function PromiseResolvedError (message) {
  this.name = 'PromiseResolvedError';
  this.message = message;
}
PromiseResolvedError.prototype = Error.prototype;

/**
 *
 * Attaches then / catch callbacks to a given promise.
 *
 * Will call done() on promise resolution and done(error)
 * on rejection.
 *
 */
function attachPromiseHandlers (fnc, done) {

  function resolve () {
    done();
  }

  function reject (error) {
    if (!error) {
      error = new PromiseRejectedError('Test failed. Expected promise to be resolved (No error provided).');
    }
    done(error);
  }

  try {
    var promise = fnc.apply(null, [done]);
    if (promise && _.isFunction(promise.then) && _.isFunction(promise.catch)) {
      return promise
        .then(resolve)
        .catch(reject);
    }
    else if (promise && _.isFunction(promise.then)) {
      return promise
        .then(resolve, reject);
    }

    resolve();
  }
  catch (error) {
    reject(error);
  }
}

/**
 *
 * Attaches then / catch callbacks to a given promise.
 *
 * Will call done(error) on promise resolution and
 * done() on rejection, thus resolving the test whenever
 * the promise gets rejected.
 *
 */
function attachErrorHandlers (fnc, done) {
  function resolve () {
    done();
  }

  function reject (error) {
    if (!_.isError(error)) {
      error = new PromiseResolvedError('Test failed. Expected promise to be rejected (No error provided).');
    }

    done(error);
  }

  try {
    var promise = fnc.apply(null, [done]);
    if (promise && _.isFunction(promise.then) && _.isFunction(promise.catch)) {
      return promise
        .then(reject)
        .catch(resolve);
    }
    else if (promise && _.isFunction(promise.then)) {
      return promise
        .then(reject, resolve);
    }
    reject();
  }
  catch (error) {
    resolve();
  }
}

var doneFnc;

var itFnc = it;
var beforeFnc = before;
var beforeEachFnc = beforeEach;
var afterFnc = after;
var afterEachFnc = afterEach;

/**
 *
 * Promise wrapper around the mocha.js library.
 *
 * Adds a number of convenience methods for handling
 * promises as results of tests.
 *
 */
module.exports = {

  _test: function setDone(fnc, done) {
    doneFnc = done;

    itFnc = fnc;
    beforeFnc = fnc;
    afterFnc = fnc;
    beforeEachFnc = fnc;
    afterEachFnc = fnc;
  },

  /**
   *
   * Promise variant of the default it-test.
   *
   * Handles a returned promise and
   * calls done() to conclude the test in case of
   * a positive resolution.
   *
   * Fails the the test if the promise gets rejected
   * or any of the assertions within the test run fails.
   *
   */
  it: function promiseIt (description, fnc) {
    if (callbackRequiresDone(fnc)) {
      return itFnc(description, fnc);
    }

    return itFnc(description, function (done) {
      return attachPromiseHandlers(fnc, doneFnc || done);
    });
  },

  /**
   *
   * Convenience variant for testing promise rejections.
   *
   * Handles a returned promise and
   * calls done() to conclude the test in case of
   * a negative resolution, i.e., the catch block
   * of the promise handling chain is triggered.
   *
   * Fails the the test if the promise gets resolved.
   *
   */
  catchIt: function catchIt (description, fnc) {
    return itFnc(description, function (done) {
      return attachErrorHandlers(fnc, doneFnc || done);
    });
  },

  /**
   *
   * Promise variant of the default before-hook.
   *
   * Handles a returned promise and
   * calls done() to conclude the hook in case of
   * a positive resolution.
   *
   * Fails the the hook if the promise gets rejected.
   *
   */
  before: function promiseBefore(fnc) {
    if (callbackRequiresDone(fnc)) {
      return beforeFnc(fnc);
    }

    return beforeFnc(function (done) {
      return attachPromiseHandlers(fnc, doneFnc || done);
    });
  },

  /**
   *
   * Promise variant of the default beforeEach-hook.
   *
   * Handles a returned promise and
   * calls done() to conclude the hook in case of
   * a positive resolution.
   *
   * Fails the the hook if the promise gets rejected.
   *
   */
  beforeEach: function promiseBeforeEach(fnc) {
    if (callbackRequiresDone(fnc)) {
      return beforeEachFnc(fnc);
    }

    return beforeEachFnc(function (done) {
      return attachPromiseHandlers(fnc, doneFnc || done);
    });
  },

  /**
   *
   * Promise variant of the default after-hook.
   *
   * Handles a returned promise and
   * calls done() to conclude the hook in case of
   * a positive resolution.
   *
   * Fails the the hook if the promise gets rejected.
   *
   */
  after: function promiseAfter(fnc) {
    if (callbackRequiresDone(fnc)) {
      return afterFnc(fnc);
    }

    return afterFnc(function (done) {
      return attachPromiseHandlers(fnc, doneFnc || done);
    });
  },

  /**
   *
   * Promise variant of the default afterEach-hook.
   *
   * Handles a returned promise and
   * calls done() to conclude the hook in case of
   * a positive resolution.
   *
   * Fails the the hook if the promise gets rejected.
   *
   */
  afterEach: function promiseAfterEach(fnc) {
    if (callbackRequiresDone(fnc)) {
      return afterEachFnc(fnc);
    }

    return afterEachFnc(function (done) {
      return attachPromiseHandlers(fnc, doneFnc || done);
    });
  },

  /**
   *
   * Adds all promise hooks as global variables
   *
   */
  global: function makeGlobal () {

    var global;

    try {
      global = GLOBAL;
    } catch (e) {}

    try {
      global = window;
    } catch (e) {}

    if (global) {
      global.it = this.it;
      global.catchIt = this.catchIt;
      global.before = this.before;
      global.beforeEach = this.beforeEach;
      global.after = this.after;
      global.afterEach = this.afterEach;
    }

    return this;
  }

};