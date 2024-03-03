
const assert = require("assert");



/* 
a
b
h
h*/

console.log("Int and float is number type")
console.log(typeof(4))
console.log(typeof(3.16))

console.log("1 is always eq 1.0")
console.log(1 == 1.0)
console.log(1 === 1.0)


console.log("Use === to compare int with string ")
console.log(1 == "1")
console.log(1 === "1")

console.log(17n)

console.log("wrong assert throws an error")
assert.equal(7 + 1, 8);

// add1() has the parameters a and b
function add1(a, b) {
  return a + b;
}
// Calling function add1()
assert(add1(5, 2), 7);

const add2 = (a, b) => { return a + b };
// Calling function add2()
assert.equal(add2(5, 2), 7);

// Equivalent to add2:
const add3 = (a, b) => a + b;


console.log("Object")

const avatarObj = {
    name: "Aang",
    type: "airbender",
    sex: "man",
    
    // no "function" word
    describe() {
        return `Object: Avatar${this.name} - ${this.type} - ${this.sex}`
    }
}

console.log("Who is it?")
console.log(avatarObj.describe())

class Avatar {
  sex = "child";
  
  constructor(name, type, sex) {
    this.name = name;
    this.type = type;
    
    console.log(sex)
    
    if(sex !== undefined) {
        this.sex = sex;
    }
    
  }
  describe() {
    return `Class: Avatar ${this.name} - ${this.type} - ${this.sex}`;
  }
  static describe(avatars) {
    for (const av of avatars) {
      console.log(av.describe());
    }
  }
}

const avatarClsChild = new Avatar("Aang", "airbender")

const avatarClsMan = new Avatar("Aang", "airbender", "man")

Avatar.describe([
  avatarClsChild, avatarClsMan])


console.log("success")