const expect = require('chai').expect;
const PromiseCache = require('./cache.js');

describe('util/PromiseCache.js tests', () => {
    describe('#cache', () => {
        it('caches promises correctly', (done) => {
            /* counter for work invocations */
            let workInvocations = 0;
            /* work function that returns input * 2 */
            const work = (i) => {
                workInvocations += 1;
                return i * 2;
            };
            /* a function that promises to do work */
            const executeWork = i => new Promise(resolve => resolve(work(i)));
            /* cached version of executeWork */
            const cacheWork = PromiseCache.cache(i => executeWork(i));

            Promise.all([1, 2, 1, 3, 3].map(i => cacheWork(i))).then((results) => {
                /* verify results */
                expect(results).to.deep.equal([2, 4, 2, 6, 6]);
                /* verify work was done only 3 times, once for each different type of input */
                expect(workInvocations).to.equal(3);
                done();
            }).catch(done);
        });
        it('delegates arguments correctly', (done) => {
            const calls = [];
            const doWork = (a, b) => { calls.push([a, b]); return Promise.resolve('ok'); };
            const cache = PromiseCache.cache(doWork);
            cache(1, 2).then(() => {
                expect(calls).to.deep.equal([[1, 2]]);
                done();
            }).catch(done);
        });
    });
});
