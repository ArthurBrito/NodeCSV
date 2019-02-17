const ps = require('./population.service')
const csv = require('./csv.service')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

csv.cityAndPopulationCSV().then(data => menu(data))

function menu(data) {
  readline.question(
  `Type
    a - Average
    s - Smallest city population
    b - Biggest city population
    f - Save file
    Default - All infos
  `, key => {
    switch (key) {
      case 'a':
        console.log('The average population is:', ps.calculateAveragePopulation(data)) 
        readline.close()
        break;

      case 's':
        console.log('The smallest city is:', ps.findSmallestPopulation(data)) 
        readline.close()
        break;

      case 'b':
        console.log('The Biggest city is:', ps.findBiggestPopulation(data))
        readline.close()
        break;

      case 'f':
        readline.question(`
          What is the name of the file?
          `, name => {
            csv.saveData(data, name)
            readline.close()
          })
        break;
    
      default:
        console.log('The average population is:', ps.calculateAveragePopulation(data)) 
        console.log('The smallest city is:', ps.findSmallestPopulation(data)) 
        console.log('The Biggest city is:', ps.findBiggestPopulation(data))
        csv.saveData(data)
        readline.close()
        break;
    }  
  })
}