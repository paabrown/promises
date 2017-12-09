const Promiss = require('./promise.js');

test('1 - should return a promise', (done) => {  
  expect(
    new Promiss((resolve) => {
      return resolve(null)
    }).constructor
  )
  .toBe(Promiss)

  done();
})

test('2- should handle aynchronous initial function', (done) => {
  const noThenPromise = new Promiss((resolve) => {
    setTimeout(() => {
      expect(3).toBe(3)
      done();
    });
  });
});

test('3 - should handle syncronous returns', (done) => {
  const examplePromise = new Promiss((resolve) => {
    setTimeout(() => resolve(1), 3);
  })
  
  examplePromise
  .then((results) => results + 1)
  .then((results) => results + 2)
  .then((results) => {
    expect(results + 3).toBe(7)
    done();
  })
  
});


test('4 - should handle async returns', (done) => {
  const examplePromise2 = new Promiss((resolve) => {
    setTimeout(() => resolve(1), 3)
  })
  
  const fnThatReturnsPromise = function(num) {
    let promise = new Promiss((resolve) => {
      setTimeout(() => resolve((5 + num)), 2)
    })
    
    return promise;
  }
  
  const fnThatReturnsPromise2 = function(num) {
    let promise = new Promiss((resolve) => {
      setTimeout(() => resolve(9 + num), 1)
    })
    
    return promise;
  }
  
  const fnThatReturnsPromise3 = function(num) {
    let promise = new Promiss((resolve) => {
      setTimeout(() => resolve(9 + num), 1)
    })
    
    return promise;
  }
  
  const fnThatReturnsPromise4 = function(num) {
    let promise = new Promiss((resolve) => {
      setTimeout(() => {
        expect(9 + num).toBe(33)
        resolve(null)
      }, 1)
    })
    
    return promise;
  }
  
  examplePromise2
  .then(fnThatReturnsPromise)
  .then(fnThatReturnsPromise2)
  .then(fnThatReturnsPromise3)
  .then(fnThatReturnsPromise4)
  .then(() => done())
});
  // Test if it can do sync/async
  
test('5 - should handle a mix of sync and async returns', (done) => {
  const fnThatReturnsPromise = function(num) {
    let promise = new Promiss((resolve) => {
      setTimeout(() => resolve((5 + num)), 2)
    })
    
    return promise;
  }
  
  const examplePromise3 = new Promiss((resolve) => {
    setTimeout(() => resolve(1), 3)
  })
  
  examplePromise3
  .then((results) => results + 1)
  .then(fnThatReturnsPromise)
  .then((results) => {
    expect(results + 3).toBe(10)
    done();
  });
  
});

test('6 - should let the same promise be used with .then more than once',(done) => {
  const examplePromise = new Promiss((resolve) => {
    setTimeout(() => resolve(1), 3);
  })

  examplePromise.then((data) => {
    expect(data + 2).toBe(3)
  })

  examplePromise.then((data) => setTimeout(() => {
    expect(data + 5).toBe(6)
    done();
  }, 3))
})


