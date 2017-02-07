/**
 * A simple promise caching utility class
 */
class PromiseCache {
    /**
     * Given a function that returns a promise, return a function that delegates calls to the
     * supplied function but caches all returned promises by supplied arguments.
     *
     * Useful for avoiding doing the same work multiple times.  For example:
     *
     * @example
     * var work = input => ...;
     * var executeWork = input => new Promise((resolve,reject) => work(input));
     * var cacheWork = PromiseCache.cache(input => executeWork(input));
     *
     * Promise.all([1,1,1]).map(i => executeWork(i))) //executes work 3 times
     * Promise.all([1,1,1]).map(i => cacheWork(i))) //executes work 1 time
     * Promise.all([1,2,2]).map(i => cacheWork(i))) //executes work 2 times
     *
     *
     * @param {function} promiseFn a function that returns a promise
     * @returns {function} a function that caches promises returned by original function by args
     */
    static cache(promiseFn) {
        const cacheByArgs = {};
        return (...args) => {
            const key = JSON.stringify([].slice.call(args));
            return cacheByArgs[key] || (cacheByArgs[key] = promiseFn.apply(promiseFn, args));
        };
    }
}
module.exports = PromiseCache;
