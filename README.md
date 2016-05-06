Webworker Run
=========

Simplified Webworker runner for one off tasks

## Installation

For now just copy `index.js` from `src` folder to your project
I am still working on publishing this.

## Usage
  // to create a worker pass WebWorker a function

  var worker = WebWorker(function(input) {
    var to = setTimeout(function() {
      clearTimeout(to);
      // wrk -> is a namespace inside worker
      // wrk.done is an alias for self.postMessage
      // @todo handle Typed arrays copy
      wrk.done(input);  
    }, 1000);
  });

  function success(result) {
    console.log(result);
  }

  function failure(reason) {
    throw new Error(reason);
  }

  // worker returns a promise use it for xhrHttpRequest work

  worker.run('arguments').then(success, failure);

## Tests

  npm test

## Contributing

Will be using [airbnb style guide](https://github.com/airbnb/javascript) for this project with [eslint](http://eslint.org/). 

Stay away from es6 until babel transpiler added.

## Release History

* 0.1.0 Initial release

## Road-map

* add babel builder for packaging
* come up with safe wrk.done abstraction
* cleaner /safer Worker(func) parser
* ...
* publish