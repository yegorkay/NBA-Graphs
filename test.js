var osmosis = require("osmosis");

const fs = require("fs");
let savedData = [];

var url =
  "https://www.basketball-reference.com/friv/mvp.html";
osmosis
  .get(url)
  .find("tbody tr")
  .follow('td[data-stat="player"] @href')
  .set({
    player: 'h1',
    data: [
      osmosis
      .find('tr.full_table:last-child()')
      .follow('th.left:first-child() @href')
      .find("tbody tr")
      .set({
        points: 'td[data-stat="pts"]'
      })
    ]
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
