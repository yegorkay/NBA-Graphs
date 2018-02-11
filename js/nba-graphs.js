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

  let maxScore = [];
  let maxPdf = [];

  cleanData.forEach((el, pos) =>
    el.data.forEach((d) => 
      maxPdf.push(d.pdf) && maxScore.push(d.score)
    )
  );

  let margin = {top: 40, right: 40, bottom: 60, left: 100},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  let valueline = d3.line()
  .x((d) => x(d.score))
  .y((d) => y(d.pdf))
  .curve(d3.curveMonotoneX);

  x.domain([0, Math.max.apply(null, maxScore) + 5]);
  y.domain([0, Math.max.apply(null, maxPdf) + 0.005]);
  let svg = d3.select('.container').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`); 

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

  cleanData.forEach(function(dataset, i) {  
    let path = svg.append('path')
    .data([dataset.data])
    .attr('class', 'line')
    .attr('d', valueline);

      let totalLength = path.node().getTotalLength();

      path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
        .duration(2250)
        .attr('stroke-dashoffset', 0)
        .attr("stroke", () => `hsl(0, 100%, ${Math.random() * 80}%)`);
  });

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJldHVybk9iaiAodmFsdWUpIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ3VydmUoKSB7XHJcbiAgbGV0IGN1cnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUnKTtcclxuICBjdXJ2ZS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAoY3VydmUuc3R5bGUuZGlzcGxheSA9ICdibG9jaycpIDogY3VydmUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufVxyXG5cclxuZDMuanNvbignZGF0YS5qc29uJywgKG12cHMpID0+IHtcclxuXHJcbiAgbGV0IGFycmF5RmlsdGVyID0gW107XHJcbiAgbGV0IGNsZWFuRGF0YSA9IFtdO1xyXG5cclxuICBsZXQgZmlsdGVyUmVzdWx0ID0gbXZwcy5tYXAoYSA9PiBhcnJheUZpbHRlci5wdXNoKGEuZGF0YS5maWx0ZXIocmV0dXJuT2JqKSkpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlclJlc3VsdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICBsZXQgaW50ZWdlcnMgPSBhcnJheUZpbHRlcltpXS5tYXAoYiA9PiBwYXJzZUludChiLnBvaW50cykpLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICBsZXQgbWVhbiA9IGQzLm1lYW4oaW50ZWdlcnMpO1xyXG4gICAgbGV0IHZhcmlhbmNlID0gZDMudmFyaWFuY2UoaW50ZWdlcnMpO1xyXG4gICAgbGV0IHNkID0gTWF0aC5zcXJ0KHZhcmlhbmNlKTtcclxuXHJcbiAgICBsZXQgZ3JhcGhEYXRhID0gW107XHJcblxyXG4gICAgaW50ZWdlcnMuZm9yRWFjaCgobnVtKSA9PiBncmFwaERhdGEucHVzaCh7IFxyXG4gICAgICBzY29yZTogbnVtLCBcclxuICAgICAgcGRmOiAxIC8gTWF0aC5zcXJ0KCgyICogTWF0aC5QSSAqIE1hdGgucG93KHNkLCAyKSkpICogTWF0aC5wb3coTWF0aC5FICwgLSAoKE1hdGgucG93KChudW0gLSBtZWFuKSwgMikpIC8gKDIgKiBNYXRoLnBvdyhzZCwgMikpKSlcclxuICAgIH0pKTtcclxuXHJcbiAgICBjbGVhbkRhdGEucHVzaCh7XHJcbiAgICAgIHBsYXllcjogbXZwc1tpXS5wbGF5ZXIsXHJcbiAgICAgIGRhdGE6IGdyYXBoRGF0YSxcclxuICAgICAgbWVhbjogbWVhbixcclxuICAgICAgdmFyaWFuY2U6IHZhcmlhbmNlLFxyXG4gICAgICBzZDogc2RcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cclxuICBsZXQgbWF4U2NvcmUgPSBbXTtcclxuICBsZXQgbWF4UGRmID0gW107XHJcblxyXG4gIGNsZWFuRGF0YS5mb3JFYWNoKChlbCwgcG9zKSA9PlxyXG4gICAgZWwuZGF0YS5mb3JFYWNoKChkKSA9PiBcclxuICAgICAgbWF4UGRmLnB1c2goZC5wZGYpICYmIG1heFNjb3JlLnB1c2goZC5zY29yZSlcclxuICAgIClcclxuICApO1xyXG5cclxuICAvLyBzZXQgdGhlIGRpbWVuc2lvbnMgYW5kIG1hcmdpbnMgb2YgdGhlIGdyYXBoXHJcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjAsIGxlZnQ6IDEwMH0sXHJcbiAgd2lkdGggPSA5NjAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcclxuICBoZWlnaHQgPSA1MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcclxuXHJcbiAgLy8gc2V0IHRoZSByYW5nZXNcclxuICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdpZHRoXSk7XHJcbiAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFtoZWlnaHQsIDBdKTtcclxuXHJcbiAgLy8gZGVmaW5lIHRoZSBsaW5lXHJcbiAgbGV0IHZhbHVlbGluZSA9IGQzLmxpbmUoKVxyXG4gIC54KChkKSA9PiB4KGQuc2NvcmUpKVxyXG4gIC55KChkKSA9PiB5KGQucGRmKSlcclxuICAuY3VydmUoZDMuY3VydmVNb25vdG9uZVgpO1xyXG5cclxuICAvLyBTY2FsZSB0aGUgcmFuZ2Ugb2YgdGhlIGRhdGFcclxuICB4LmRvbWFpbihbMCwgTWF0aC5tYXguYXBwbHkobnVsbCwgbWF4U2NvcmUpICsgNV0pO1xyXG4gIHkuZG9tYWluKFswLCBNYXRoLm1heC5hcHBseShudWxsLCBtYXhQZGYpICsgMC4wMDVdKTtcclxuICAvLyBhcHBlbmQgdGhlIHN2ZyBvYmdlY3QgdG8gdGhlIGJvZHkgb2YgdGhlIHBhZ2VcclxuICAvLyBhcHBlbmRzIGEgJ2dyb3VwJyBlbGVtZW50IHRvICdzdmcnXHJcbiAgLy8gbW92ZXMgdGhlICdncm91cCcgZWxlbWVudCB0byB0aGUgdG9wIGxlZnQgbWFyZ2luXHJcbiAgbGV0IHN2ZyA9IGQzLnNlbGVjdCgnLmNvbnRhaW5lcicpLmFwcGVuZCgnc3ZnJylcclxuICAuYXR0cignd2lkdGgnLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxyXG4gIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcclxuICAuYXBwZW5kKCdnJylcclxuICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgJHttYXJnaW4udG9wfSlgKTsgXHJcbiAgXHJcbiAgLy8gQWRkIHRoZSBYIEF4aXNcclxuICBzdmcuYXBwZW5kKCdnJylcclxuICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke2hlaWdodH0pYCkgXHJcbiAgLmNhbGwoZDMuYXhpc0JvdHRvbSh4KSk7XHJcblxyXG4gIC8vIEFkZCB0aGUgWSBBeGlzXHJcbiAgc3ZnLmFwcGVuZCgnZycpXHJcbiAgLmNhbGwoZDMuYXhpc0xlZnQoeSkpO1xyXG5cclxuICAvL0FwcGVuZGluZyBheGlzIGxhYmVsc1xyXG4gIHN2Zy5hcHBlbmQoJ3RleHQnKVxyXG4gIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxyXG4gIC5hdHRyKCd5JywgMCAtIG1hcmdpbi5sZWZ0KVxyXG4gIC5hdHRyKCd4JywgMCAtIChoZWlnaHQgLyAyKSlcclxuICAuYXR0cignZHknLCAnMWVtJylcclxuICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgLnRleHQoJ1Byb2JhYmlsaXR5IERpc3RyaWJ1dGlvbiAoJSknKTtcclxuXHJcbiAgc3ZnLmFwcGVuZCgndGV4dCcpICAgICAgICAgICAgIFxyXG4gIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7d2lkdGgvMn0sICR7aGVpZ2h0ICsgbWFyZ2luLnRvcCArIDIwfSlgKSAgIFxyXG4gIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAudGV4dCgnUG9pbnRzIFNjb3JlZCBJbiBHYW1lJyk7XHJcblxyXG4gIGNsZWFuRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGRhdGFzZXQsIGkpIHsgIFxyXG4gICAgLy8gQWRkIHRoZSB2YWx1ZWxpbmUgcGF0aC5cclxuICAgIGxldCBwYXRoID0gc3ZnLmFwcGVuZCgncGF0aCcpXHJcbiAgICAuZGF0YShbZGF0YXNldC5kYXRhXSlcclxuICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcclxuICAgIC5hdHRyKCdkJywgdmFsdWVsaW5lKTtcclxuICBcclxuICAgIGxldCB0b3RhbExlbmd0aCA9IHBhdGgubm9kZSgpLmdldFRvdGFsTGVuZ3RoKCk7XHJcbiAgXHJcbiAgICBwYXRoXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgYCR7dG90YWxMZW5ndGh9ICR7dG90YWxMZW5ndGh9YClcclxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgdG90YWxMZW5ndGgpXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oMjI1MClcclxuICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCAwKVxyXG4gICAgICAgIC5hdHRyKFwic3Ryb2tlXCIsICgpID0+IGBoc2woMCwgMTAwJSwgJHtNYXRoLnJhbmRvbSgpICogODB9JSlgKTtcclxuICB9KTtcclxuXHJcbn0pOyJdLCJmaWxlIjoibmJhLWdyYXBocy5qcyJ9
