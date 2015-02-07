# mocha-qa
A convenience helper for testing promises using the mochaja library

Adds a wrapper function to the [mochajs](http://mochajs.org/) test-runner that will make it easier to handle promise-testing using mochajs.

mocha-qa will automatically pass a test if a returned promise gets resolved and fail it if the promise gets rejected. In cases no promise gets returned, mocha-qa will fallback to the default mocha-style tests concluding the test once all assertions have passed.

Also will proberly report any failed assertions during the test and report them just they way they would be reported running a sequential mocha-test.

Supported methods:

* [it](#itdescription-fnc)
* [catchId](#catchitdescription-fnc)
* [before](#beforefnc)
* [after](#afterfnc)
* [beforeEach](#beforeeach-fnc)
* [afterEach](#aftereach-fnc)

## Usage

### Example

To test a promise use any of the mocha-qa style `it`-functions and return a promise. Whenever the promise is resolved the mochajs done() callback will be executed:

```
it = require('mocha-qa').it;

describe('My test', function () {
  it('will pass on a resolved promise', function () {
    return myPromise
      .then(function () {
        expect(1).to.equal(1);
      });
  });
});

```

### Global namespace

If you'd like to replace all default mocha runners and hooks with the mocha-qa variants you can use the `global()` registration method that will add the promise-enabled `it`, `catchIt`, `before`, `beforeEach`, `after` and `afterEach` functions to the global namespace

```
require('mocha-qa').global();

describe('My test', function () {
  before(function setUp () {
    return asyncSetupFunction()
      .then(function(data) {
        prepareTest();
      });
  });

  after(function tearDown () {
    return asyncCleanupFunction2();
  });


  it('will pass on a resolved promise', function () {
    return myPromise
      .then(function () {
        expect(1).to.equal(1);
      });
  });
});

```

### Mixed test runners

You are able to mix sequential and promise-style-tests using the same methods. In cases no promise gets returned the default mocha-function is applied.

```
require('mocha-qa').global();

describe('My test', function () {

  it('will pass on a resolved promise', function () {
    return myPromise
      .then(function () {
        expect(1).to.equal(1);
      });
  });

  it('will pass on a test ', function () {
    var result = doSomething();
    expect(result.value).to.equal(1);
    // Test passed
  });
});
```

## Methods

### `it(description, fnc)`

The default test runner. Runs the test function, passing it when the returned promise gets resolved. If no promise is returned will fall back to the default `it` behaviour, i.e., once the function execution is completed.

### `catchIt(description, fnc)`

The rejection variant of the `it`-test-runner. Will fail the test on a resolved promise and pass the test, once the promise returned by the test-runner gets rejected.

```
describe('My test', function () {
  catchIt('will pass on a rejected promise', function () {
    var promise = Promise.defer();

    doSomethingAsync()
      .then(function (result) {
        if (result === 42) {
          deferred.reject('This causes the test to pass');
        }
        deferred.resolve();
      });

    return deferred;
  });
});
```

### `before(fnc)`
### `beforeEach(fnc)`
### `after(fnc)`
### `afterEach(fnc)`

Returning a promise on any of the test-hooks will finalize the hook successfully once all promises of the hook are resolved and cause an exception if the promise gets rejected.

```
before = require('mocha-qa').before;

describe('My test', function () {
  before(function () {
    return myDb.find()
      .then(function () {
        populateTestSet();
      });
  });
});

```
