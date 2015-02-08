/* jshint node:true */
/* global describe, it, catchIt, before, beforeEach, after, afterEach */
'use strict';

var mocha = {};

mocha.it = it;
mocha.before = before;
mocha.beforeEach = beforeEach;
mocha.after = after;
mocha.afterEach = afterEach;


var qa = require('../mocha-qa.js').global();

var doneMock = require('./utils/done-mock.js');

var jquery = require('jquery-deferred');

describe('MochaJS-QA using jquery promises  ', function () {
  describe('and it', function () {

    mocha.it ('will resolve the test on an immediately fullfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      it('it will test a promise', function () {
        return jquery.Deferred().resolve().promise();
      });
    });

    mocha.it ('will fail the test on an immediately failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      it('it will test a promise', function () {
        return jquery.Deferred().reject(new Error('Fail')).promise();
      });
    });

    mocha.it ('will resolve the test on an deferred fullfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      it('it will test a promise', function () {
        var deferred = jquery.Deferred();

        setTimeout(function () {
          deferred.resolve();
        }, 0);

        return deferred.promise();
      });
    });

    mocha.it ('will fail the test on an deferred failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      it('it will test a promise', function () {
        var deferred = jquery.Deferred();

        setTimeout(function () {
          deferred.reject(new Error('Fail'));
        }, 0);

        return deferred.promise();
      });
    });
  });

  describe('and catch', function () {
    mocha.it ('will resolve the test on an immediately failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      catchIt('it will test a promise', function () {
        return jquery.reject(new Error('Fail'));
      });
    });

    mocha.it ('will fail the test on an immediately fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      catchIt('it will test a promise', function () {
        return jquery.Deferred().resolve().promise();
      });
    });

    mocha.it ('will resolve the test on an deferred failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      catchIt('it will test a promise', function () {
        var deferred = jquery.Deferred();

        setTimeout(function () {
          deferred.reject(new Error('Fail'));
        }, 0);

        return deferred.promise();
      });
    });

    mocha.it ('will fail the test on an deferred fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      catchIt('it will test a promise', function () {
        var deferred = jquery.Deferred();

        setTimeout(function () {
          deferred.resolve();
        }, 0);

        return deferred.promise();
      });
    });
  });

  describe('and using setup hooks', function () {
    mocha.it ('will resolve a before hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      before(function hook () {
        return jquery.Deferred().resolve().promise();
      });
    });

    mocha.it ('will resolve a after hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      after(function hook () {
        return jquery.Deferred().resolve().promise();
      });
    });

    mocha.it ('will resolve a beforeEach hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      beforeEach(function hook () {
        return jquery.Deferred().resolve().promise();
      });
    });

    mocha.it ('will resolve a afterEach hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      afterEach(function hook () {
        return jquery.Deferred().resolve().promise();
      });
    });

    mocha.it ('will reject a before hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      before(function hook () {
        return jquery.reject(new Error('Fail'));
      });
    });

    mocha.it ('will reject a after hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      after(function hook () {
        return jquery.reject(new Error('Fail'));
      });
    });

    mocha.it ('will reject a beforeEach hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      beforeEach(function hook () {
        return jquery.reject(new Error('Fail'));
      });
    });

    mocha.it ('will reject a afterEach hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      afterEach(function hook () {
        return jquery.reject(new Error('Fail'));
      });
    });
  });
});