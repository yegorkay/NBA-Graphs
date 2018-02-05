d3.json('data.json', (data) => {
    data.sort((a, b) => a.points - b.points);
    let scores = [];
    //removing any values that are NaN (aka DNP (Did Not Play))
    for (let i = 0; i < data.length; i++) {
      if(isNaN(data[i].points) == false) {
        scores.push(parseInt(data[i].points));
      }
    }

    let pdfArray = [];

    let mean = d3.mean(scores);
    let variance = d3.variance(scores);
    let sd = Math.sqrt(variance);

    for (let x = 0; x <= scores.length; x++) {
      if(isNaN(scores[x]) == false) {
        pdfArray.push(1 / Math.sqrt((2 * Math.PI * Math.pow(sd, 2))) * Math.pow(Math.E , - ((Math.pow((scores[x] - mean), 2)) / (2 * Math.pow(sd, 2)))));
      }
    }

    let graphData = [];
    for (let y = 0; y <= pdfArray.length ; y++) {
      if(isNaN(pdfArray[y]) == false) {
        graphData.push({
          score: scores[y],
          pdf: pdfArray[y]
        });
      }
    };

    // set the dimensions and margins of the graph
    let margin = {top: 40, right: 40, bottom: 60, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // set the ranges
    let x = d3.scaleLinear().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // define the line
    let valueline = d3.line()
    .x((d) => x(d.score))
    .y((d) => y(d.pdf))
    .curve(d3.curveMonotoneX);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`); 

    

    // Scale the range of the data
    x.domain([0, d3.max(graphData, (d) => d.score + 10)]);
    y.domain([0, d3.max(graphData, (d) => d.pdf)]);

    // Add the valueline path.
    let path = svg.append('path')
    .data([graphData])
    .attr('class', 'line')
    .attr('d', valueline);

    var totalLength = path.node().getTotalLength();

    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
        .duration(2250)
        .attr('stroke-dashoffset', 0);

    // Add the X Axis
    svg.append('g')
    .attr('transform', `translate(0, ${height})`) 
    .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g')
    .call(d3.axisLeft(y));


    //Appending axis labels
    svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Probability Distribution (%)');

    svg.append('text')             
    .attr('transform', `translate(${width/2}, ${height + margin.top + 20})`)   
    .style('text-anchor', 'middle')
    .text('Points Scored In Game');

    let gpText = document.querySelector('.gp');
    let meanText = document.querySelector('.mean');
    gpText.innerHTML = `Games Played: ${graphData.length}`;
    meanText.innerHTML = `Mean: ${mean.toFixed(2)} PPG`;
});

function toggleCurve() {
  let curve = document.querySelector('.line');
  curve.style.display === 'none' ? (curve.style.display = 'block') : curve.style.display = 'none';
}