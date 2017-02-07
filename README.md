# promise-cache

Tiny cache for promise producing functions.

Basic usage:
```js
const PromiseCache = require('promise-cache');
...
var work = input => ...;
var executeWork = input => new Promise((resolve,reject) => work(input));
var cacheWork = PromiseCache.cache(input => executeWork(input));

Promise.all([1,1,1]).map(i => executeWork(i))) //executes work 3 times
Promise.all([1,1,1]).map(i => cacheWork(i))) //executes work 1 time
Promise.all([1,2,2]).map(i => cacheWork(i))) //executes work 2 times
```

# Documentation

Documentation is available [here](https://professoreugene.github.io/promise-cache/PromiseCache.html)