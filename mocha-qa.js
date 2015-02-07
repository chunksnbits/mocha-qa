/* jshint node:true */
/* global it, before, beforeEach, after, afterEach */
'use strict';


/**
 *
 * Attaches then / catch callbacks to a given promise.
 *
 * Will call done() on promise resolution and done(error)
 * on rejection.
 *
 */
function attachPromiseHandlers (promise, done) {
  return promise
    .then(function () {
      done();
    })
    .catch(function (error) {
      done(error);
    });
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
function attachErrorHandlers (promise, done) {
  return promise
    .then(function () {
      done(new Error('Test failed. Expected promise to be rejected.'));
    })
    .catch(function (error) {
      done();
    });
}

/**
 *
 * Promise wrapper around the mocha.js library.
 *
 * Adds a number of convenience methods for handling
 * promises as results of tests.
 *
 */
module.exports = {

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
  promiseIt: function promiseIt (description, fnc) {
    return it(description, function (done) {
      return attachPromiseHandlers(fnc.apply(null, arguments), done);
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
    return it(description, function (done) {
      return attachErrorHandlers(fnc.apply(null, arguments), done);
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
  promiseBefore: function promiseBefore(fnc) {
    return before(function (done) {
      return attachPromiseHandlers(fnc.apply(null, arguments), done);
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
  promiseBeforeEach: function promiseBeforeEach(fnc) {
    return beforeEach(function (done) {
      return attachPromiseHandlers(fnc.apply(null, arguments), done);
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
  promiseAfter: function promiseAfter(fnc) {
    return after(function (done) {
      return attachPromiseHandlers(fnc.apply(null, arguments), done);
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
  promiseAfterEach: function promiseAfterEach(fnc) {
    return afterEach(function (done) {
      return attachPromiseHandlers(fnc.apply(null, arguments), done);
    });
  },

  /**
   *
   * Convenience version of the default it handler.
   *
   * Triggers the callback right away. This method
   * is mainly added for completeness reasons.
   *
   */
  it: function (description, fnc) {
    return it(description, fnc);
  },

  /**
   *
   * Convenience version of the default before handler.
   *
   * Triggers the callback right away. This method
   * is mainly added for completeness reasons.
   *
   */
  before: function (description, fnc) {
    return before(description, fnc);
  },

  /**
   *
   * Convenience version of the default beforeEach handler.
   *
   * Triggers the callback right away. This method
   * is mainly added for completeness reasons.
   *
   */
  beforeEach: function (description, fnc) {
    return beforeEach(description, fnc);
  },

  /**
   *
   * Convenience version of the default after handler.
   *
   * Triggers the callback right away. This method
   * is mainly added for completeness reasons.
   *
   */
  after: function (description, fnc) {
    return after(description, fnc);
  },

  /**
   *
   * Convenience version of the default afterEach handler.
   *
   * Triggers the callback right away. This method
   * is mainly added for completeness reasons.
   *
   */
  afterEach: function (description, fnc) {
    return afterEach(description, fnc);
  }
};