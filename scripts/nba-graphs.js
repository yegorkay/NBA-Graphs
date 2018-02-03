d3.json("data.json", (data) => {
    // data.sort((a, b) => b.points - a.points);
    let scores = [];
    //removing any values that are NaN (aka DNP (Did Not Play))
    for (var i = 0; i < data.length; i++) {
      if(isNaN(data[i].points) == false) {
        scores.push(parseInt(data[i].points));
      }
    }

    let mean = d3.mean(scores);
    let variance = d3.variance(scores);
    let sd = Math.sqrt(variance);

    let pdf = 1 / Math.sqrt((2 * Math.PI * Math.pow(sd, 2))) * Math.pow(Math.E , - ((Math.pow((22 /*replace 22 with score*/ - mean), 2)) / (2 * Math.pow(sd, 2))));

    console.log(pdf);

    d3.select(".container")
      .selectAll("div")
      .data(scores)
      .enter().append("div")
        .text((d) => `${d} Points`)
        .style('width', function(d) {return (d) + '%'});

    var xScale = d3.scaleLinear().domain([0, 6]).range([0, 81]);
    var yScale = d3.scaleLinear().domain([0, 80]).range([150, 0]);
    
    var lineGenerator = d3.line()
      .x(function(d, i) {
        return xScale(i);
      })
      .y(function(d) {
        return yScale(d);
      });
    
    var line = lineGenerator(scores);
    
    // Create a path element and set its d attribute
    d3.select('g')
      .append('path')
      .attr('d', line);
});