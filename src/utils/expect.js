const expect = (actual, expected) =>
  Math.fround(actual) === Math.fround(expected)
  ? true
  : [actual]

export default expect
