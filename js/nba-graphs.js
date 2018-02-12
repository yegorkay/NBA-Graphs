function returnObj (value) {
  return typeof value === 'object';
}

function toggleCurve() {
  let curve = document.querySelector('.line');
  curve.style.display === 'none' ? (curve.style.display = 'block') : curve.style.display = 'none';
}

const colors = [
  '#243E90', '#CE1141', '#243E90', '#FFB81C','#00471B',
  '#CD1141', '#7AC143', '#B4975A','#008248','#007AC1'
]

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
  width = (window.outerWidth * .85) - margin.left - margin.right,
  height = (window.outerHeight * .85) - margin.top - margin.bottom;

  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  let valueline = d3.line()
  .x((d) => x(d.score))
  .y((d) => y(d.pdf))
  .curve(d3.curveMonotoneX);

  x.domain([0, (Math.ceil(Math.max.apply(null, maxScore) / 10) * 10) + 5]);
  y.domain([0, (Math.ceil(Math.max.apply(null, maxPdf) / .001) * .001) + .005]);
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
        .duration(3250)
        .attr('stroke-dashoffset', 0)
        .attr('stroke', colors[i]);
  });

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJldHVybk9iaiAodmFsdWUpIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ3VydmUoKSB7XHJcbiAgbGV0IGN1cnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUnKTtcclxuICBjdXJ2ZS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAoY3VydmUuc3R5bGUuZGlzcGxheSA9ICdibG9jaycpIDogY3VydmUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufVxyXG5cclxuLy8gTkJBIFRlYW0gQ29sb3JzXHJcbmNvbnN0IGNvbG9ycyA9IFtcclxuICAnIzI0M0U5MCcsICcjQ0UxMTQxJywgJyMyNDNFOTAnLCAnI0ZGQjgxQycsJyMwMDQ3MUInLFxyXG4gICcjQ0QxMTQxJywgJyM3QUMxNDMnLCAnI0I0OTc1QScsJyMwMDgyNDgnLCcjMDA3QUMxJ1xyXG5dXHJcblxyXG5kMy5qc29uKCdkYXRhLmpzb24nLCAobXZwcykgPT4ge1xyXG5cclxuICBsZXQgYXJyYXlGaWx0ZXIgPSBbXTtcclxuICBsZXQgY2xlYW5EYXRhID0gW107XHJcblxyXG4gIC8vIE5vZGUgV2ViIFNjcmFwZXIgcGlja2VkIHVwIHNvbWUgZXJyb3VuZW91cyBzdHJpbmcgZGF0YSwgc28gd2UgbmVlZCB0byBmaWx0ZXIgdGhlIGRhdGFcclxuICBsZXQgZmlsdGVyUmVzdWx0ID0gbXZwcy5tYXAoYSA9PiBhcnJheUZpbHRlci5wdXNoKGEuZGF0YS5maWx0ZXIocmV0dXJuT2JqKSkpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlclJlc3VsdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAvLyBDb252ZXJ0IHBvaW50IHN0cmluZ3MgdG8gbnVtYmVyc1xyXG4gICAgbGV0IGludGVnZXJzID0gYXJyYXlGaWx0ZXJbaV0ubWFwKGIgPT4gcGFyc2VJbnQoYi5wb2ludHMpKS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcblxyXG4gICAgbGV0IG1lYW4gPSBkMy5tZWFuKGludGVnZXJzKTtcclxuICAgIGxldCB2YXJpYW5jZSA9IGQzLnZhcmlhbmNlKGludGVnZXJzKTtcclxuICAgIGxldCBzZCA9IE1hdGguc3FydCh2YXJpYW5jZSk7XHJcblxyXG4gICAgbGV0IGdyYXBoRGF0YSA9IFtdO1xyXG5cclxuICAgIC8vIENyZWF0aW5nIG91ciB4IGFuZCB5IGNvb3JkaW5hdGVzIGZvciB0aGUgZ3JhcGhcclxuICAgIGludGVnZXJzLmZvckVhY2goKG51bSkgPT4gZ3JhcGhEYXRhLnB1c2goeyBcclxuICAgICAgc2NvcmU6IG51bSwgXHJcbiAgICAgIHBkZjogMSAvIE1hdGguc3FydCgoMiAqIE1hdGguUEkgKiBNYXRoLnBvdyhzZCwgMikpKSAqIE1hdGgucG93KE1hdGguRSAsIC0gKChNYXRoLnBvdygobnVtIC0gbWVhbiksIDIpKSAvICgyICogTWF0aC5wb3coc2QsIDIpKSkpXHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgb3VyIGNsZWFuIGFycmF5IHdpdGggbnVtYmVycyBhbmQgcmVsZXZhbnQgc3RhdGlzdGljc1xyXG4gICAgY2xlYW5EYXRhLnB1c2goe1xyXG4gICAgICBwbGF5ZXI6IG12cHNbaV0ucGxheWVyLFxyXG4gICAgICBkYXRhOiBncmFwaERhdGEsXHJcbiAgICAgIG1lYW46IG1lYW4sXHJcbiAgICAgIHZhcmlhbmNlOiB2YXJpYW5jZSxcclxuICAgICAgc2Q6IHNkXHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgbGV0IG1heFNjb3JlID0gW107XHJcbiAgbGV0IG1heFBkZiA9IFtdO1xyXG4gIFxyXG4gIC8vIEZpbmRpbmcgdGhlIG1heGltdW0gcG9pbnRzIHNjb3JlZCBhbmQgbWF4aW11bSBQREYgKFByb2JhYmlsaXR5IERpc3RyaWJ1dGlvbiBGdW5jdGlvbikgaW4gdGhlIGVudGlyZSBkYXRhIHNldFxyXG4gIGNsZWFuRGF0YS5mb3JFYWNoKChlbCwgcG9zKSA9PlxyXG4gICAgZWwuZGF0YS5mb3JFYWNoKChkKSA9PiBcclxuICAgICAgbWF4UGRmLnB1c2goZC5wZGYpICYmIG1heFNjb3JlLnB1c2goZC5zY29yZSlcclxuICAgIClcclxuICApO1xyXG5cclxuICAvLyBzZXQgdGhlIGRpbWVuc2lvbnMgYW5kIG1hcmdpbnMgb2YgdGhlIGdyYXBoXHJcbiAgbGV0IG1hcmdpbiA9IHt0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjAsIGxlZnQ6IDEwMH0sXHJcbiAgd2lkdGggPSAod2luZG93Lm91dGVyV2lkdGggKiAuODUpIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXHJcbiAgaGVpZ2h0ID0gKHdpbmRvdy5vdXRlckhlaWdodCAqIC44NSkgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcclxuXHJcbiAgLy8gc2V0IHRoZSByYW5nZXNcclxuICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdpZHRoXSk7XHJcbiAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFtoZWlnaHQsIDBdKTtcclxuXHJcbiAgLy8gZGVmaW5lIHRoZSBsaW5lXHJcbiAgbGV0IHZhbHVlbGluZSA9IGQzLmxpbmUoKVxyXG4gIC54KChkKSA9PiB4KGQuc2NvcmUpKVxyXG4gIC55KChkKSA9PiB5KGQucGRmKSlcclxuICAuY3VydmUoZDMuY3VydmVNb25vdG9uZVgpO1xyXG5cclxuICAvLyBTY2FsZSB0aGUgcmFuZ2Ugb2YgdGhlIGRhdGFcclxuICB4LmRvbWFpbihbMCwgKE1hdGguY2VpbChNYXRoLm1heC5hcHBseShudWxsLCBtYXhTY29yZSkgLyAxMCkgKiAxMCkgKyA1XSk7XHJcbiAgeS5kb21haW4oWzAsIChNYXRoLmNlaWwoTWF0aC5tYXguYXBwbHkobnVsbCwgbWF4UGRmKSAvIC4wMDEpICogLjAwMSkgKyAuMDA1XSk7XHJcbiAgLy8gYXBwZW5kIHRoZSBzdmcgb2JnZWN0IHRvIHRoZSBib2R5IG9mIHRoZSBwYWdlXHJcbiAgLy8gYXBwZW5kcyBhICdncm91cCcgZWxlbWVudCB0byAnc3ZnJ1xyXG4gIC8vIG1vdmVzIHRoZSAnZ3JvdXAnIGVsZW1lbnQgdG8gdGhlIHRvcCBsZWZ0IG1hcmdpblxyXG4gIGxldCBzdmcgPSBkMy5zZWxlY3QoJy5jb250YWluZXInKS5hcHBlbmQoJ3N2ZycpXHJcbiAgLmF0dHIoJ3dpZHRoJywgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcclxuICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXHJcbiAgLmFwcGVuZCgnZycpXHJcbiAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7bWFyZ2luLnRvcH0pYCk7IFxyXG4gIFxyXG4gIC8vIEFkZCB0aGUgWCBBeGlzXHJcbiAgc3ZnLmFwcGVuZCgnZycpXHJcbiAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHtoZWlnaHR9KWApIFxyXG4gIC5jYWxsKGQzLmF4aXNCb3R0b20oeCkpO1xyXG5cclxuICAvLyBBZGQgdGhlIFkgQXhpc1xyXG4gIHN2Zy5hcHBlbmQoJ2cnKVxyXG4gIC5jYWxsKGQzLmF4aXNMZWZ0KHkpKTtcclxuXHJcbiAgLy9BcHBlbmRpbmcgYXhpcyBsYWJlbHNcclxuICBzdmcuYXBwZW5kKCd0ZXh0JylcclxuICAuYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtOTApJylcclxuICAuYXR0cigneScsIDAgLSBtYXJnaW4ubGVmdClcclxuICAuYXR0cigneCcsIDAgLSAoaGVpZ2h0IC8gMikpXHJcbiAgLmF0dHIoJ2R5JywgJzFlbScpXHJcbiAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gIC50ZXh0KCdQcm9iYWJpbGl0eSBEaXN0cmlidXRpb24gKCUpJyk7XHJcblxyXG4gIHN2Zy5hcHBlbmQoJ3RleHQnKSAgICAgICAgICAgICBcclxuICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3dpZHRoLzJ9LCAke2hlaWdodCArIG1hcmdpbi50b3AgKyAyMH0pYCkgICBcclxuICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgLnRleHQoJ1BvaW50cyBTY29yZWQgSW4gR2FtZScpO1xyXG5cclxuICBjbGVhbkRhdGEuZm9yRWFjaChmdW5jdGlvbihkYXRhc2V0LCBpKSB7ICAgXHJcbiAgICAvLyBBZGQgdGhlIHZhbHVlbGluZSBwYXRoLlxyXG4gICAgbGV0IHBhdGggPSBzdmcuYXBwZW5kKCdwYXRoJylcclxuICAgIC5kYXRhKFtkYXRhc2V0LmRhdGFdKVxyXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxyXG4gICAgLmF0dHIoJ2QnLCB2YWx1ZWxpbmUpO1xyXG4gIFxyXG4gICAgbGV0IHRvdGFsTGVuZ3RoID0gcGF0aC5ub2RlKCkuZ2V0VG90YWxMZW5ndGgoKTtcclxuICBcclxuICAgIHBhdGhcclxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBgJHt0b3RhbExlbmd0aH0gJHt0b3RhbExlbmd0aH1gKVxyXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCB0b3RhbExlbmd0aClcclxuICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbigzMjUwKVxyXG4gICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIDApXHJcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGNvbG9yc1tpXSk7XHJcbiAgfSk7XHJcblxyXG59KTsiXSwiZmlsZSI6Im5iYS1ncmFwaHMuanMifQ==
