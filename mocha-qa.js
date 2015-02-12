/* jshint node:true */
/* global it, before, beforeEach, after, afterEach */
'use strict';


var _ = require('lodash');


function createError (message, error) {
  return new Error([
    message,
    'Error was:',
    JSON.stringify(error, null, 2)
  ].join(' '));
}

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
    if (!_.isError(error)) {
      error = createError('Test failed. Expected promise to be resolved.', error);
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
      error = createError('Test failed. Expected promise to be rejected.', error);
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