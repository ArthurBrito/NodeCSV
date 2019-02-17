module.exports = {
  
  calculateAveragePopulation: function (data) {
    data = data.filter(data => data.population) // remove cities that don't have population
    const total = data.map(row => parseInt(row.population)).reduce((acc, value) => acc + value)
    return Math.round(total/data.length)
  },

  findSmallestPopulation: function(data) {
    let lowestNumber
    let lowestCity

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element.population === '')
        continue
      if(parseInt(element.population) < lowestNumber || lowestNumber === undefined) {
        lowestNumber = parseInt(element.population)
        lowestCity = element.city
      }
    }
    return lowestCity
  },

  findBiggestPopulation: function (data) {
    let highestNumber
    let biggestCity

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element.population === '')
        continue
      if(parseInt(element.population) > highestNumber || highestNumber === undefined) {
        highestNumber = parseInt(element.population)
        biggestCity = element.city
      }
    }
    return biggestCity
  }
}