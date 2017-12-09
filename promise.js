
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

module.exports = Promiss;
