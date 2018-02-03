d3.json('data.json', (data) => {
    data.sort((a, b) => b.points - a.points);
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

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
    .x((d) => x(d.score))
    .y((d) => y(d.pdf))
    .curve(d3.curveMonotoneX);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the range of the data
    x.domain(d3.extent(graphData, (d) => d.score));
    y.domain([0, d3.max(graphData, (d) => d.pdf)]);

    // Add the valueline path.
    svg.append('path')
    .data([graphData])
    .attr('class', 'line')
    .attr('d', valueline);

    // Add the X Axis
    svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g')
    .call(d3.axisLeft(y));
});