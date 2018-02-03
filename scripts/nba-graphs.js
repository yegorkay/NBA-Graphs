d3.json('data.json', (data) => {
    // data.sort((a, b) => b.points - a.points);
    let scores = [];
    //removing any values that are NaN (aka DNP (Did Not Play))
    for (var i = 0; i < data.length; i++) {
      if(isNaN(data[i].points) == false) {
        scores.push(parseInt(data[i].points));
      }
    }

    let pdfArray = [];

    let mean = d3.mean(scores);
    let variance = d3.variance(scores);
    let sd = Math.sqrt(variance);

    for (var x = 0; x <= scores.length; x++) {
      if(isNaN(scores[x]) == false) {
        pdfArray.push(1 / Math.sqrt((2 * Math.PI * Math.pow(sd, 2))) * Math.pow(Math.E , - ((Math.pow((scores[x] - mean), 2)) / (2 * Math.pow(sd, 2)))));
      }
    }

    var graphData = [];
    for (var y = 0; y <= pdfArray.length ; y++) {
      if(isNaN(pdfArray[y]) == false) {
        graphData.push({
          score: scores[y],
          pdf: pdfArray[y]
        });
      }
    };

    console.log(graphData);

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