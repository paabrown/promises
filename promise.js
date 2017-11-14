function defer(fn, thisVal, ...args) {
  setTimeout(() => fn.apply(thisVal, args), 0)
}

class Promiss {
  constructor(fn) {
    this.initialFn = fn;
    this.isLastInChain = true;
  
    defer(this.execute, this);
  }

  then(fn) {
    this.isLastInChain = false;
    return new Promiss((resolve) => {
      this.initialFn((results) => {
        let answer = fn(results);
        if (answer.constructor === Promiss) {
          answer.then((val) => resolve(val));
        } else {
          resolve(answer);
        }
      });
    })
  }

  execute() {
    if (this.isLastInChain) {
      this.initialFn(() => {})
    } 
  }
}



// ~~~~~~~~~~ TESTING ~~~~~~~~~~ //

 // Test if it can do sync
var examplePromise = new Promiss((resolve) => {
  setTimeout(() => resolve(1), 3)
})

examplePromise
.then((results) => results + 1)
.then((results) => results + 1)
.then((results) => console.log('test 1 should be 4. result:', results + 1))


 // Test if it can do sync2
 
var noThenPromise = new Promiss((resolve) => {
  setTimeout(() => console.log('test 2 passed. hi!'), 3)
})

 // Test if it can do promises / async

var examplePromise2 = new Promiss((resolve) => {
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
    setTimeout(() => resolve(console.log('test 3 should be 33, result is:', 9 + num)), 1)
  })
  
  return promise;
}

examplePromise2
.then(fnThatReturnsPromise)
.then(fnThatReturnsPromise2)
.then(fnThatReturnsPromise3)
.then(fnThatReturnsPromise4)

// Test if it can do sync/async

var examplePromise3 = new Promiss((resolve) => {
  setTimeout(() => resolve(1), 3)
})

examplePromise3
.then((results) => results + 1)
.then(fnThatReturnsPromise)
.then((results) => console.log('should log 10. result:', results + 3))

// should console log 10

