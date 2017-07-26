function deepEqual(obj1, obj2)  {
  if (typeof obj1 === 'object') {
    console.log("in deepEqual object")
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false
      }
      for (var i = 0; i < obj1.length; i++) {
        if (obj1[i] !== obj2[i]) {
          return false
        }
      }
      return true
    } else if (!Array.isArray(obj1) && !Array.isArray(obj2)) {
      for (var key in obj1) {
        if (!obj2[key]) {
          return false
        } else if (obj2[key] !== obj1[key]) {
          return false
        }
      }
      return true
    }
    return false
  }
  return false
}

const expect = (actual, expected, outputType) => {
  if (outputType === "Number" || outputType === "Boolean") {
    return Math.fround(actual) === Math.fround(expected)
    ? true
    : [actual]
  } else if (outputType === "String") {
    return actual === expected ? true : [actual]
  } else if (outputType === "Array") {
    var equal = true
    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) {
        equal =  false
      }
      for (var i = 0; i < actual.length; i++) {
        if (actual[i] !== expected[i]) {
          equal = false
        }
      }
    }
    return equal ? true : [actual]
  } else {
    return ["DataType Not Supported"]
  }
}

export default expect
