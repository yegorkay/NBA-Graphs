function returnObj (value) {
  return typeof value === 'object';
}

d3.json('data.json', (mvps) => {

    let arrayFilter = [[], [], [], [], [], [], [], [], [], []];
    let arrayNums = [[], [], [], [], [], [], [], [], [], []];

    for (let i = 0; i < mvps.length; i++) {
      let filteredMvp = mvps[i].data.filter(returnObj); 
      arrayFilter[i].push(filteredMvp);
    }
    
    for (let y = 0; y < arrayFilter.length; y++) {
      for (let x = 0; x < arrayFilter[y][0].length; x++) {
        arrayNums[y].push(parseInt(arrayFilter[y][0][x].points));
      }
    }
  
    function basicStats(index) {

      let player = mvps[index].player;

      let mean = d3.mean(arrayNums[index]);
      let variance = d3.variance(arrayNums[index]);
      let sd = Math.sqrt(variance);

      let scores = arrayNums[index];
      let pdf = arrayNums[index].map((num) => 1 / Math.sqrt((2 * Math.PI * Math.pow(sd, 2))) * Math.pow(Math.E , - ((Math.pow((num - mean), 2)) / (2 * Math.pow(sd, 2)))));
      
      let graphData = [];

      for (let y = 0; y < scores.length ; y++) {
          graphData.push({
          score: scores[y],
          pdf: pdf[y]
        });
        graphData.sort((a, b) => a.score - b.score);
      };
         
      return {
        player: player, 
        mean: mean, 
        variance: variance, 
        sd: sd, 
        plot: graphData
      };

    }

    let stats = basicStats(1);
    // console.log(stats.plot);
    for (let x = 0; x < 10; x++) {
      let stats = basicStats(x);
      console.log(stats);
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
    x.domain([0, d3.max(stats.plot, (d) => d.score + 10)]);
    y.domain([0, d3.max(stats.plot, (d) => d.pdf)]);

    // Add the valueline path.
    let path = svg.append('path')
    .data([stats.plot])
    .attr('class', 'line')
    .attr('d', valueline);

    let totalLength = path.node().getTotalLength();

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

    let playerTitle = document.querySelector('h1');
    playerTitle.innerHTML = stats.player;

    let gpText = document.querySelector('.gp');
    gpText.innerHTML = `Games Played: ${stats.plot.length}`;

    let meanText = document.querySelector('.mean');  
    meanText.innerHTML = `Mean: ${stats.mean.toFixed(1)} PPG`;

});

function toggleCurve() {
  let curve = document.querySelector('.line');
  curve.style.display === 'none' ? (curve.style.display = 'block') : curve.style.display = 'none';
}