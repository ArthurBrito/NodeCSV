const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");

CSVToJSON().fromFile("./worldcities.csv").then(source => {
  const data = source.map(row => ({city: row.city, population: row.population }))

  console.log('The average population is:', calculateAveragePopulation(data)) 
  console.log('The smallest city is:', findSmallestPopulation(data)) 
  console.log('The Biggest city is:', findBiggestPopulation(data))
  saveData(data)
})

function calculateAveragePopulation(data) {
  data = data.filter(data => data.population) // remove cities that don't have population
  const total = data.map(row => parseInt(row.population)).reduce((acc, value) => acc + value)
  return Math.round(total/data.length)
}

function findSmallestPopulation(data) {
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
}

function findBiggestPopulation(data) {
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

function saveData(source) {
  const csv = JSONToCSV(source, { fields: ["city", "population"]});
  FileSystem.writeFileSync("./result.csv", csv);
}