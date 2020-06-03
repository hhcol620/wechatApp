function createComparisonFunction (propertyName) {
  return function(obj1, obj2) {
    let value1=obj1[propertyName]
    let value2=obj2[propertyName]
    if (value1 > value2) {
      return -1
    } else if(value1 < value2) {
      return 1
    } else {
      return 0
    }
  }
}

module.exports = {
  createComparisonFunction
}