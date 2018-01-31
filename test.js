var osmosis = require("osmosis");

const fs = require("fs");
let savedData = [];

var url =
  "https://www.basketball-reference.com/players/h/hardeja01/gamelog/2017/";
osmosis
  .get(url)
  .find("tbody tr")
  .set({
    gameNumber: 'th[data-stat="ranker"]',
    date: 'td[data-stat="date_game"]',
    points: 'td[data-stat="pts"]'
  })
  .log(console.log)
  .data(function(data) {
    console.log(data);
    savedData.push(data);
  })
  .done(function() {
    fs.writeFile("data.json", JSON.stringify(savedData, null, 4), function(
      err
    ) {
      if (err) console.error(err);
      else console.log("Data Saved to data.json file");
    });
  });
