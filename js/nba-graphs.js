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
    for (let x = 0; x < 10; x++) {
      let stats = basicStats(x);
      console.log(stats);
    };

    let margin = {top: 40, right: 40, bottom: 60, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    let x = d3.scaleLinear().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    let valueline = d3.line()
    .x((d) => x(d.score))
    .y((d) => y(d.pdf))
    .curve(d3.curveMonotoneX);

    let svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`); 

    x.domain([0, d3.max(stats.plot, (d) => d.score + 10)]);
    y.domain([0, d3.max(stats.plot, (d) => d.pdf)]);

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

    svg.append('g')
    .attr('transform', `translate(0, ${height})`) 
    .call(d3.axisBottom(x));

    svg.append('g')
    .call(d3.axisLeft(y));

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJldHVybk9iaiAodmFsdWUpIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxufVxyXG5cclxuZDMuanNvbignZGF0YS5qc29uJywgKG12cHMpID0+IHtcclxuXHJcbiAgICBsZXQgYXJyYXlGaWx0ZXIgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xyXG4gICAgbGV0IGFycmF5TnVtcyA9IFtbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXV07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdnBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBmaWx0ZXJlZE12cCA9IG12cHNbaV0uZGF0YS5maWx0ZXIocmV0dXJuT2JqKTsgXHJcbiAgICAgIGFycmF5RmlsdGVyW2ldLnB1c2goZmlsdGVyZWRNdnApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGFycmF5RmlsdGVyLmxlbmd0aDsgeSsrKSB7XHJcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgYXJyYXlGaWx0ZXJbeV1bMF0ubGVuZ3RoOyB4KyspIHtcclxuICAgICAgICBhcnJheU51bXNbeV0ucHVzaChwYXJzZUludChhcnJheUZpbHRlclt5XVswXVt4XS5wb2ludHMpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgZnVuY3Rpb24gYmFzaWNTdGF0cyhpbmRleCkge1xyXG5cclxuICAgICAgbGV0IHBsYXllciA9IG12cHNbaW5kZXhdLnBsYXllcjtcclxuXHJcbiAgICAgIGxldCBtZWFuID0gZDMubWVhbihhcnJheU51bXNbaW5kZXhdKTtcclxuICAgICAgbGV0IHZhcmlhbmNlID0gZDMudmFyaWFuY2UoYXJyYXlOdW1zW2luZGV4XSk7XHJcbiAgICAgIGxldCBzZCA9IE1hdGguc3FydCh2YXJpYW5jZSk7XHJcblxyXG4gICAgICBsZXQgc2NvcmVzID0gYXJyYXlOdW1zW2luZGV4XTtcclxuICAgICAgbGV0IHBkZiA9IGFycmF5TnVtc1tpbmRleF0ubWFwKChudW0pID0+IDEgLyBNYXRoLnNxcnQoKDIgKiBNYXRoLlBJICogTWF0aC5wb3coc2QsIDIpKSkgKiBNYXRoLnBvdyhNYXRoLkUgLCAtICgoTWF0aC5wb3coKG51bSAtIG1lYW4pLCAyKSkgLyAoMiAqIE1hdGgucG93KHNkLCAyKSkpKSk7XHJcbiAgICAgIFxyXG4gICAgICBsZXQgZ3JhcGhEYXRhID0gW107XHJcblxyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHNjb3Jlcy5sZW5ndGggOyB5KyspIHtcclxuICAgICAgICAgIGdyYXBoRGF0YS5wdXNoKHtcclxuICAgICAgICAgIHNjb3JlOiBzY29yZXNbeV0sXHJcbiAgICAgICAgICBwZGY6IHBkZlt5XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdyYXBoRGF0YS5zb3J0KChhLCBiKSA9PiBhLnNjb3JlIC0gYi5zY29yZSk7XHJcbiAgICAgIH07XHJcbiAgICAgICAgIFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBsYXllcjogcGxheWVyLCBcclxuICAgICAgICBtZWFuOiBtZWFuLCBcclxuICAgICAgICB2YXJpYW5jZTogdmFyaWFuY2UsIFxyXG4gICAgICAgIHNkOiBzZCwgXHJcbiAgICAgICAgcGxvdDogZ3JhcGhEYXRhXHJcbiAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxldCBzdGF0cyA9IGJhc2ljU3RhdHMoMSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhzdGF0cy5wbG90KTtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xyXG4gICAgICBsZXQgc3RhdHMgPSBiYXNpY1N0YXRzKHgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhzdGF0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHNldCB0aGUgZGltZW5zaW9ucyBhbmQgbWFyZ2lucyBvZiB0aGUgZ3JhcGhcclxuICAgIGxldCBtYXJnaW4gPSB7dG9wOiA0MCwgcmlnaHQ6IDQwLCBib3R0b206IDYwLCBsZWZ0OiAxMDB9LFxyXG4gICAgd2lkdGggPSA5NjAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcclxuICAgIGhlaWdodCA9IDUwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xyXG5cclxuICAgIC8vIHNldCB0aGUgcmFuZ2VzXHJcbiAgICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdpZHRoXSk7XHJcbiAgICBsZXQgeSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW2hlaWdodCwgMF0pO1xyXG5cclxuICAgIC8vIGRlZmluZSB0aGUgbGluZVxyXG4gICAgbGV0IHZhbHVlbGluZSA9IGQzLmxpbmUoKVxyXG4gICAgLngoKGQpID0+IHgoZC5zY29yZSkpXHJcbiAgICAueSgoZCkgPT4geShkLnBkZikpXHJcbiAgICAuY3VydmUoZDMuY3VydmVNb25vdG9uZVgpO1xyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgc3ZnIG9iZ2VjdCB0byB0aGUgYm9keSBvZiB0aGUgcGFnZVxyXG4gICAgLy8gYXBwZW5kcyBhICdncm91cCcgZWxlbWVudCB0byAnc3ZnJ1xyXG4gICAgLy8gbW92ZXMgdGhlICdncm91cCcgZWxlbWVudCB0byB0aGUgdG9wIGxlZnQgbWFyZ2luXHJcbiAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KCcuY29udGFpbmVyJykuYXBwZW5kKCdzdmcnKVxyXG4gICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcclxuICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcclxuICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7bWFyZ2luLnRvcH0pYCk7IFxyXG4gICAgXHJcbiAgICAvLyBTY2FsZSB0aGUgcmFuZ2Ugb2YgdGhlIGRhdGFcclxuICAgIHguZG9tYWluKFswLCBkMy5tYXgoc3RhdHMucGxvdCwgKGQpID0+IGQuc2NvcmUgKyAxMCldKTtcclxuICAgIHkuZG9tYWluKFswLCBkMy5tYXgoc3RhdHMucGxvdCwgKGQpID0+IGQucGRmKV0pO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgdmFsdWVsaW5lIHBhdGguXHJcbiAgICBsZXQgcGF0aCA9IHN2Zy5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgLmRhdGEoW3N0YXRzLnBsb3RdKVxyXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxyXG4gICAgLmF0dHIoJ2QnLCB2YWx1ZWxpbmUpO1xyXG5cclxuICAgIGxldCB0b3RhbExlbmd0aCA9IHBhdGgubm9kZSgpLmdldFRvdGFsTGVuZ3RoKCk7XHJcblxyXG4gICAgcGF0aFxyXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIGAke3RvdGFsTGVuZ3RofSAke3RvdGFsTGVuZ3RofWApXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIHRvdGFsTGVuZ3RoKVxyXG4gICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgLmR1cmF0aW9uKDIyNTApXHJcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgMCk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBYIEF4aXNcclxuICAgIHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHtoZWlnaHR9KWApIFxyXG4gICAgLmNhbGwoZDMuYXhpc0JvdHRvbSh4KSk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBZIEF4aXNcclxuICAgIHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgLmNhbGwoZDMuYXhpc0xlZnQoeSkpO1xyXG5cclxuICAgIC8vQXBwZW5kaW5nIGF4aXMgbGFiZWxzXHJcbiAgICBzdmcuYXBwZW5kKCd0ZXh0JylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxyXG4gICAgLmF0dHIoJ3knLCAwIC0gbWFyZ2luLmxlZnQpXHJcbiAgICAuYXR0cigneCcsIDAgLSAoaGVpZ2h0IC8gMikpXHJcbiAgICAuYXR0cignZHknLCAnMWVtJylcclxuICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIC50ZXh0KCdQcm9iYWJpbGl0eSBEaXN0cmlidXRpb24gKCUpJyk7XHJcblxyXG4gICAgc3ZnLmFwcGVuZCgndGV4dCcpICAgICAgICAgICAgIFxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt3aWR0aC8yfSwgJHtoZWlnaHQgKyBtYXJnaW4udG9wICsgMjB9KWApICAgXHJcbiAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAudGV4dCgnUG9pbnRzIFNjb3JlZCBJbiBHYW1lJyk7XHJcblxyXG4gICAgbGV0IHBsYXllclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKTtcclxuICAgIHBsYXllclRpdGxlLmlubmVySFRNTCA9IHN0YXRzLnBsYXllcjtcclxuXHJcbiAgICBsZXQgZ3BUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdwJyk7XHJcbiAgICBncFRleHQuaW5uZXJIVE1MID0gYEdhbWVzIFBsYXllZDogJHtzdGF0cy5wbG90Lmxlbmd0aH1gO1xyXG5cclxuICAgIGxldCBtZWFuVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWFuJyk7ICBcclxuICAgIG1lYW5UZXh0LmlubmVySFRNTCA9IGBNZWFuOiAke3N0YXRzLm1lYW4udG9GaXhlZCgxKX0gUFBHYDtcclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ3VydmUoKSB7XHJcbiAgbGV0IGN1cnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUnKTtcclxuICBjdXJ2ZS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAoY3VydmUuc3R5bGUuZGlzcGxheSA9ICdibG9jaycpIDogY3VydmUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufSJdLCJmaWxlIjoibmJhLWdyYXBocy5qcyJ9
