function returnObj (value) {
  return typeof value === 'object';
}

function toggleCurve() {
  let curve = document.querySelector('.line');
  curve.style.display === 'none' ? (curve.style.display = 'block') : curve.style.display = 'none';
}

d3.json('data.json', (mvps) => {

  let arrayFilter = [];
  let cleanData = [];

  let filterResult = mvps.map(a => arrayFilter.push(a.data.filter(returnObj)));

    for (let i = 0; i < filterResult.length; i ++) {

    let integers = arrayFilter[i].map(b => parseInt(b.points)).sort((a, b) => a - b);

    let mean = d3.mean(integers);
    let variance = d3.variance(integers);
    let sd = Math.sqrt(variance);

    let graphData = [];

    integers.forEach((num) => graphData.push({ 
      score: num, 
      pdf: 1 / Math.sqrt((2 * Math.PI * Math.pow(sd, 2))) * Math.pow(Math.E , - ((Math.pow((num - mean), 2)) / (2 * Math.pow(sd, 2))))
    }));

    cleanData.push({
      player: mvps[i].player,
      data: graphData,
      mean: mean,
      variance: variance,
      sd: sd
    });

  };

  let stats = cleanData[1];

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

  x.domain([0, d3.max(stats.data, (d) => d.score + 10)]);
  y.domain([0, d3.max(stats.data, (d) => d.pdf)]);

  let path = svg.append('path')
  .data([stats.data])
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
  gpText.innerHTML = `Games Played: ${stats.data.length}`;

  let meanText = document.querySelector('.mean');  
  meanText.innerHTML = `Mean: ${stats.mean.toFixed(1)} PPG`;

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJldHVybk9iaiAodmFsdWUpIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ3VydmUoKSB7XHJcbiAgbGV0IGN1cnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUnKTtcclxuICBjdXJ2ZS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAoY3VydmUuc3R5bGUuZGlzcGxheSA9ICdibG9jaycpIDogY3VydmUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufVxyXG5cclxuZDMuanNvbignZGF0YS5qc29uJywgKG12cHMpID0+IHtcclxuXHJcbiAgbGV0IGFycmF5RmlsdGVyID0gW107XHJcbiAgbGV0IGNsZWFuRGF0YSA9IFtdO1xyXG5cclxuICBsZXQgZmlsdGVyUmVzdWx0ID0gbXZwcy5tYXAoYSA9PiBhcnJheUZpbHRlci5wdXNoKGEuZGF0YS5maWx0ZXIocmV0dXJuT2JqKSkpO1xyXG4gIFxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyUmVzdWx0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgIGxldCBpbnRlZ2VycyA9IGFycmF5RmlsdGVyW2ldLm1hcChiID0+IHBhcnNlSW50KGIucG9pbnRzKSkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG5cclxuICAgIGxldCBtZWFuID0gZDMubWVhbihpbnRlZ2Vycyk7XHJcbiAgICBsZXQgdmFyaWFuY2UgPSBkMy52YXJpYW5jZShpbnRlZ2Vycyk7XHJcbiAgICBsZXQgc2QgPSBNYXRoLnNxcnQodmFyaWFuY2UpO1xyXG5cclxuICAgIGxldCBncmFwaERhdGEgPSBbXTtcclxuXHJcbiAgICBpbnRlZ2Vycy5mb3JFYWNoKChudW0pID0+IGdyYXBoRGF0YS5wdXNoKHsgXHJcbiAgICAgIHNjb3JlOiBudW0sIFxyXG4gICAgICBwZGY6IDEgLyBNYXRoLnNxcnQoKDIgKiBNYXRoLlBJICogTWF0aC5wb3coc2QsIDIpKSkgKiBNYXRoLnBvdyhNYXRoLkUgLCAtICgoTWF0aC5wb3coKG51bSAtIG1lYW4pLCAyKSkgLyAoMiAqIE1hdGgucG93KHNkLCAyKSkpKVxyXG4gICAgfSkpO1xyXG5cclxuICAgIGNsZWFuRGF0YS5wdXNoKHtcclxuICAgICAgcGxheWVyOiBtdnBzW2ldLnBsYXllcixcclxuICAgICAgZGF0YTogZ3JhcGhEYXRhLFxyXG4gICAgICBtZWFuOiBtZWFuLFxyXG4gICAgICB2YXJpYW5jZTogdmFyaWFuY2UsXHJcbiAgICAgIHNkOiBzZFxyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcblxyXG4gIGxldCBzdGF0cyA9IGNsZWFuRGF0YVsxXTtcclxuXHJcbiAgLy8gc2V0IHRoZSBkaW1lbnNpb25zIGFuZCBtYXJnaW5zIG9mIHRoZSBncmFwaFxyXG4gIGxldCBtYXJnaW4gPSB7dG9wOiA0MCwgcmlnaHQ6IDQwLCBib3R0b206IDYwLCBsZWZ0OiAxMDB9LFxyXG4gIHdpZHRoID0gOTYwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXHJcbiAgaGVpZ2h0ID0gNTAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XHJcblxyXG4gIC8vIHNldCB0aGUgcmFuZ2VzXHJcbiAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCB3aWR0aF0pO1xyXG4gIGxldCB5ID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbaGVpZ2h0LCAwXSk7XHJcblxyXG4gIC8vIGRlZmluZSB0aGUgbGluZVxyXG4gIGxldCB2YWx1ZWxpbmUgPSBkMy5saW5lKClcclxuICAueCgoZCkgPT4geChkLnNjb3JlKSlcclxuICAueSgoZCkgPT4geShkLnBkZikpXHJcbiAgLmN1cnZlKGQzLmN1cnZlTW9ub3RvbmVYKTtcclxuXHJcbiAgLy8gYXBwZW5kIHRoZSBzdmcgb2JnZWN0IHRvIHRoZSBib2R5IG9mIHRoZSBwYWdlXHJcbiAgLy8gYXBwZW5kcyBhICdncm91cCcgZWxlbWVudCB0byAnc3ZnJ1xyXG4gIC8vIG1vdmVzIHRoZSAnZ3JvdXAnIGVsZW1lbnQgdG8gdGhlIHRvcCBsZWZ0IG1hcmdpblxyXG4gIGxldCBzdmcgPSBkMy5zZWxlY3QoJy5jb250YWluZXInKS5hcHBlbmQoJ3N2ZycpXHJcbiAgLmF0dHIoJ3dpZHRoJywgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcclxuICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXHJcbiAgLmFwcGVuZCgnZycpXHJcbiAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7bWFyZ2luLnRvcH0pYCk7IFxyXG4gIFxyXG4gIC8vIFNjYWxlIHRoZSByYW5nZSBvZiB0aGUgZGF0YVxyXG4gIHguZG9tYWluKFswLCBkMy5tYXgoc3RhdHMuZGF0YSwgKGQpID0+IGQuc2NvcmUgKyAxMCldKTtcclxuICB5LmRvbWFpbihbMCwgZDMubWF4KHN0YXRzLmRhdGEsIChkKSA9PiBkLnBkZildKTtcclxuXHJcbiAgLy8gQWRkIHRoZSB2YWx1ZWxpbmUgcGF0aC5cclxuICBsZXQgcGF0aCA9IHN2Zy5hcHBlbmQoJ3BhdGgnKVxyXG4gIC5kYXRhKFtzdGF0cy5kYXRhXSlcclxuICAuYXR0cignY2xhc3MnLCAnbGluZScpXHJcbiAgLmF0dHIoJ2QnLCB2YWx1ZWxpbmUpO1xyXG5cclxuICBsZXQgdG90YWxMZW5ndGggPSBwYXRoLm5vZGUoKS5nZXRUb3RhbExlbmd0aCgpO1xyXG5cclxuICBwYXRoXHJcbiAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIGAke3RvdGFsTGVuZ3RofSAke3RvdGFsTGVuZ3RofWApXHJcbiAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCB0b3RhbExlbmd0aClcclxuICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKDIyNTApXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIDApO1xyXG5cclxuICAvLyBBZGQgdGhlIFggQXhpc1xyXG4gIHN2Zy5hcHBlbmQoJ2cnKVxyXG4gIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7aGVpZ2h0fSlgKSBcclxuICAuY2FsbChkMy5heGlzQm90dG9tKHgpKTtcclxuXHJcbiAgLy8gQWRkIHRoZSBZIEF4aXNcclxuICBzdmcuYXBwZW5kKCdnJylcclxuICAuY2FsbChkMy5heGlzTGVmdCh5KSk7XHJcblxyXG4gIC8vQXBwZW5kaW5nIGF4aXMgbGFiZWxzXHJcbiAgc3ZnLmFwcGVuZCgndGV4dCcpXHJcbiAgLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXHJcbiAgLmF0dHIoJ3knLCAwIC0gbWFyZ2luLmxlZnQpXHJcbiAgLmF0dHIoJ3gnLCAwIC0gKGhlaWdodCAvIDIpKVxyXG4gIC5hdHRyKCdkeScsICcxZW0nKVxyXG4gIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAudGV4dCgnUHJvYmFiaWxpdHkgRGlzdHJpYnV0aW9uICglKScpO1xyXG5cclxuICBzdmcuYXBwZW5kKCd0ZXh0JykgICAgICAgICAgICAgXHJcbiAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt3aWR0aC8yfSwgJHtoZWlnaHQgKyBtYXJnaW4udG9wICsgMjB9KWApICAgXHJcbiAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gIC50ZXh0KCdQb2ludHMgU2NvcmVkIEluIEdhbWUnKTtcclxuXHJcbiAgbGV0IHBsYXllclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKTtcclxuICBwbGF5ZXJUaXRsZS5pbm5lckhUTUwgPSBzdGF0cy5wbGF5ZXI7XHJcblxyXG4gIGxldCBncFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3AnKTtcclxuICBncFRleHQuaW5uZXJIVE1MID0gYEdhbWVzIFBsYXllZDogJHtzdGF0cy5kYXRhLmxlbmd0aH1gO1xyXG5cclxuICBsZXQgbWVhblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVhbicpOyAgXHJcbiAgbWVhblRleHQuaW5uZXJIVE1MID0gYE1lYW46ICR7c3RhdHMubWVhbi50b0ZpeGVkKDEpfSBQUEdgO1xyXG5cclxufSk7Il0sImZpbGUiOiJuYmEtZ3JhcGhzLmpzIn0=
