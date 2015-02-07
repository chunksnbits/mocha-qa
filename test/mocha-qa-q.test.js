/* jshint node:true */
/* global describe, it, qa.catchIt, before, beforeEach, after, afterEach */
'use strict';

var mocha = {};

mocha.it = it;
mocha.before = before;
mocha.beforeEach = beforeEach;
mocha.after = after;
mocha.afterEach = afterEach;


var qa = require('../mocha-qa.js');

it = qa.it;
before = qa.before;
beforeEach = qa.beforeEach;
after = qa.after;
afterEach = qa.afterEach;


var doneMock = require('./utils/done-mock.js');

var q = require('q');

describe('MochaJS-QA using q promise library', function () {
  describe('and it', function () {

    mocha.it ('will resolve the test on an immediately fullfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      it('it will test a promise', function () {
        return q.resolve();
      });
    });

    mocha.it ('will fail the test on an immediately failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      it('it will test a promise', function () {
        return q.reject(new Error('Fail'));
      });
    });

    mocha.it ('will resolve the test on an deferred fullfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      it('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.resolve();
        }, 0);

        return deferred.promise;
      });
    });

    mocha.it ('will fail the test on an deferred failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      it('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.reject(new Error('Fail'));
        }, 0);

        return deferred.promise;
      });
    });
  });

  describe('and catch', function () {
    mocha.it ('will resolve the test on an immediately failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.catchIt('it will test a promise', function () {
        return q.reject(new Error('Fail'));
      });
    });

    mocha.it ('will fail the test on an immediately fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.catchIt('it will test a promise', function () {
        return q.resolve();
      });
    });

    mocha.it ('will resolve the test on an deferred failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.catchIt('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.reject(new Error('Fail'));
        }, 0);

        return deferred.promise;
      });
    });

    mocha.it ('will fail the test on an deferred fulfilling promise', function (mochaDone) {

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
    mocha.it ('will resolve a before hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      before(function hook () {
        return q.resolve();
      });
    });

    mocha.it ('will resolve a after hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      after(function hook () {
        return q.resolve();
      });
    });

    mocha.it ('will resolve a beforeEach hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      beforeEach(function hook () {
        return q.resolve();
      });
    });

    mocha.it ('will resolve a afterEach hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      afterEach(function hook () {
        return q.resolve();
      });
    });

    mocha.it ('will reject a before hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      before(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    mocha.it ('will reject a after hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      after(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    mocha.it ('will reject a beforeEach hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      beforeEach(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    mocha.it ('will reject a afterEach hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      afterEach(function hook () {
        return q.reject(new Error('Fail'));
      });
    });
  });
});