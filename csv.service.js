const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");

module.exports = {
  saveData: function(source, name = 'results') {
    const csv = JSONToCSV(source, { fields: ["city", "population"]});
    FileSystem.writeFileSync(`./${name}.csv`, csv);
  },
  
  cityAndPopulationCSV: function() {
    return new Promise(resolve => {
      CSVToJSON().fromFile('./worldcities.csv').then(source => {
        resolve(source.map(row => ({city: row.city, population: row.population })))
      })
    })

  }
}