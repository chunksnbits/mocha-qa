# mocha-qa
A convenience helper for testing promises using the mochaja library

Adds a wrapper function to the mocha `it`-test-runner-function, that will automatically pass the test on a resolved promise and fail it, if the promise gets rejected.

Also will handle any failed test that happens during the rejection and report the reason for the failure.

## Usage

To test a promise use any of the mocha-qa style `promiseIt`-functions and return a promise. Whenever the promise is resolved the mochajs done() callback will be executed:

```
var qa = require('mocha-qa');

describe('My test', function () {
  qa.promiseIt('will pass on a resolved promise', function () {
    return myPromise
      .then(function () {
        expect(1).to.equal(1);
      });
  });
});

```

This equals the following test using plain mochajs.

```
var qa = require('mocha-qa');

describe('My test', function () {
  it('will pass on a resolved promise', function (done) {
    return myPromise
      .then(function () {
        expect(1).to.equal(1);
        done();
      })
      .catch(function () {
        done(error);
      });
  });
});

```