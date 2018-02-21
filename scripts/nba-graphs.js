// NBA Team Colors (hsl values)
const colors = [
  [226, 60, 35],
  [345, 85, 44],
  [226, 60, 35],
  [41, 100, 56],
  [143, 100, 14],
  [345, 85, 44],
  [94, 50, 51],
  [41, 38, 53],
  [153, 100, 26],
  [202, 100, 38]
];

let cleanData = [];
let arrayFilter = [];
let maxScore = [];
let maxPdf = [];

const returnObj = value => typeof value === 'object';

const filterResult = json =>
  json.map(a => arrayFilter.push(a.data.filter(returnObj)));

const stringToNumber = string =>
  string.map(b => parseInt(b.points)).sort((a, b) => a - b);

const returnMax = arr =>
  arr.forEach((el, pos) =>
    el.data.forEach(d => maxPdf.push(d.pdf) && maxScore.push(d.score))
  );

const manageInfo = info => {
  // Node Web Scraper picked up some errouneous string data, so we need to filter the data

  filterResult(info).forEach((el, i) => {
    let integers = stringToNumber(arrayFilter[i]);
    let mean = d3.mean(integers);
    let variance = d3.variance(integers);
    let sd = Math.sqrt(variance);

    let graphData = [];
    // Creating our x and y coordinates for the graph
    integers.forEach(num =>
      graphData.push({
        score: num,
        pdf:
          1 /
          Math.sqrt(2 * Math.PI * Math.pow(sd, 2)) *
          Math.pow(Math.E, -(Math.pow(num - mean, 2) / (2 * Math.pow(sd, 2))))
      })
    );
    // Creating our clean array with numbers and relevant statistics
    cleanData.push({
      player: info[i].player,
      data: graphData,
      mean: mean,
      variance: variance,
      sd: sd
    });
  });
};
// set the dimensions and margins of the graph
let margin = { top: 40, right: 40, bottom: 60, left: 100 },
  width = window.outerWidth * 0.85 - margin.left - margin.right,
  height = window.outerHeight * 0.85 - margin.top - margin.bottom;

// set the ranges
let x = d3.scaleLinear().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

d3.json('data.json', mvps => {
  manageInfo(mvps);
  returnMax(cleanData);

  // define the line
  let valueline = d3
    .line()
    .x(d => x(d.score))
    .y(d => y(d.pdf))
    .curve(d3.curveMonotoneX);

  // Scale the range of the data
  x.domain([0, Math.ceil(Math.max.apply(null, maxScore) / 10) * 10 + 5]);
  y.domain([0, Math.ceil(Math.max.apply(null, maxPdf) / 0.001) * 0.001 + 0.005]);
  // append the svg obgect to the body of the page
  let svg = d3
    .select('.container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Add the X Axis
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append('g').call(d3.axisLeft(y));

  //Appending axis labels
  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Probability Distribution (%)');

  svg
    .append('text')
    .attr('transform', `translate(${width / 2}, ${height + margin.top + 20})`)
    .style('text-anchor', 'middle')
    .text('Points Scored In Game');

  cleanData.forEach((dataset, i) => {
    // console.log(deg, sat, light)
    d3
      .select('.legend')
      .append('div')
      .classed('legend__player', true)
      .style(
        'background',
        `linear-gradient(90deg, hsl(${colors[i][0]}, ${colors[i][1]}%, 
          ${colors[i][2]}%) 0%, hsl(${colors[i][0] - 10}, ${colors[i][1] - 5}%, 
          ${colors[i][2] - 6}%) 51%, hsl(${colors[i][0] - 10}, 
          ${colors[i][1] - 10}%, ${colors[i][2] - 10}%) 75%)`
      )
      .append('p')
      .text([dataset.player]);
    // Add the valueline path.
    let path = svg
      .append('path')
      .data([dataset.data])
      .attr('class', 'line')
      .attr('d', valueline);

    let totalLength = path.node().getTotalLength();

    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(3250)
      .attr('stroke-dashoffset', 0)
      .attr(
        'stroke',
        `hsl(${colors[i][0]}, ${colors[i][1]}%, ${colors[i][2]}%)`
      );
  });
});

let toggleVisible = () => {
  document.querySelectorAll(".legend__player").forEach((e, i) => e.addEventListener("click", () => {
    let line = document.querySelectorAll('.line')
    e.style.opacity = "1";
    e.className += ' none';
    line[i].style.opacity = "1";
    }
  ))   
}

setTimeout(() => {
  toggleVisible()
}, 50);
