/* jshint node:true */
/* global describe, it */
'use strict';

var qa = require('../mocha-qa.js');
var doneMock = require('./utils/done-mock.js');

var q = require('q');

describe('MochaJS-QA using q promise library', function () {
  describe('and promiseIt', function () {

    it ('will resolve the test on an immediately fullfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.promiseIt('it will test a promise', function () {
        return q.resolve();
      });
    });

    it ('will fail the test on an immediately failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.promiseIt('it will test a promise', function () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will resolve the test on an deferred fullfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.promiseIt('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.resolve();
        }, 0);

        return deferred.promise;
      });
    });

    it ('will fail the test on an deferred failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.promiseIt('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.reject(new Error('Fail'));
        }, 0);

        return deferred.promise;
      });
    });
  });

  describe('and catchIt', function () {
    it ('will resolve the test on an immediately failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.catchIt('it will test a promise', function () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will fail the test on an immediately fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.catchIt('it will test a promise', function () {
        return q.resolve();
      });
    });

    it ('will resolve the test on an deferred failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.catchIt('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.reject(new Error('Fail'));
        }, 0);

        return deferred.promise;
      });
    });

    it ('will fail the test on an deferred fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.catchIt('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.resolve();
        }, 0);

        return deferred.promise;
      });
    });
  });

  describe('and using setup hooks', function () {
    it ('will resolve a promiseBefore hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.promiseBefore(function hook () {
        return q.resolve();
      });
    });

    it ('will resolve a promiseAfter hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.promiseAfter(function hook () {
        return q.resolve();
      });
    });

    it ('will resolve a promiseBeforeEach hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.promiseBeforeEach(function hook () {
        return q.resolve();
      });
    });

    it ('will resolve a promiseAfterEach hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.promiseAfterEach(function hook () {
        return q.resolve();
      });
    });

    it ('will reject a promiseBefore hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.promiseBefore(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will reject a promiseAfter hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.promiseAfter(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will reject a promiseBeforeEach hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.promiseBeforeEach(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will reject a promiseAfterEach hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.promiseAfterEach(function hook () {
        return q.reject(new Error('Fail'));
      });
    });
  });
});