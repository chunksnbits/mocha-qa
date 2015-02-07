/* jshint node:true */
/* global describe, it */
'use strict';

var qa = require('../mocha-qa.js');
var doneMock = require('./utils/done-mock.js');

var q = require('q');

describe('MochaJS-QA using q promise library', function () {
  describe('and it', function () {

    it ('will resolve the test on an immediately fullfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.it('it will test a promise', function () {
        return q.resolve();
      });
    });

    it ('will fail the test on an immediately failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.it('it will test a promise', function () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will resolve the test on an deferred fullfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.it('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.resolve();
        }, 0);

        return deferred.promise;
      });
    });

    it ('will fail the test on an deferred failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.it('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.reject(new Error('Fail'));
        }, 0);

        return deferred.promise;
      });
    });
  });

  describe('and catch', function () {
    it ('will resolve the test on an immediately failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.catch('it will test a promise', function () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will fail the test on an immediately fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.catch('it will test a promise', function () {
        return q.resolve();
      });
    });

    it ('will resolve the test on an deferred failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.catch('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.reject(new Error('Fail'));
        }, 0);

        return deferred.promise;
      });
    });

    it ('will fail the test on an deferred fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.catch('it will test a promise', function () {
        var deferred = q.defer();

        setTimeout(function () {
          deferred.resolve();
        }, 0);

        return deferred.promise;
      });
    });
  });

  describe('and using setup hooks', function () {
    it ('will resolve a before hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.before(function hook () {
        return q.resolve();
      });
    });

    it ('will resolve a after hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.after(function hook () {
        return q.resolve();
      });
    });

    it ('will resolve a beforeEach hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.beforeEach(function hook () {
        return q.resolve();
      });
    });

    it ('will resolve a afterEach hook on a fulfilling promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnDone(mochaDone));

      qa.afterEach(function hook () {
        return q.resolve();
      });
    });

    it ('will reject a before hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.before(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will reject a after hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.after(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will reject a beforeEach hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.beforeEach(function hook () {
        return q.reject(new Error('Fail'));
      });
    });

    it ('will reject a afterEach hook on a failing promise', function (mochaDone) {

      qa._test(doneMock.it, doneMock.resolveOnError(mochaDone));

      qa.afterEach(function hook () {
        return q.reject(new Error('Fail'));
      });
    });
  });
});