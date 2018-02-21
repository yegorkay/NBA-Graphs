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

  filterResult(info).forEach((el, i) => {
    let integers = stringToNumber(arrayFilter[i]);
    let mean = d3.mean(integers);
    let variance = d3.variance(integers);
    let sd = Math.sqrt(variance);

    let graphData = [];
    integers.forEach(num =>
      graphData.push({
        score: num,
        pdf:
          1 /
          Math.sqrt(2 * Math.PI * Math.pow(sd, 2)) *
          Math.pow(Math.E, -(Math.pow(num - mean, 2) / (2 * Math.pow(sd, 2))))
      })
    );
    cleanData.push({
      player: info[i].player,
      data: graphData,
      mean: mean,
      variance: variance,
      sd: sd
    });
  });
};
let margin = { top: 40, right: 40, bottom: 60, left: 100 },
  width = window.outerWidth * 0.85 - margin.left - margin.right,
  height = window.outerHeight * 0.85 - margin.top - margin.bottom;

let x = d3.scaleLinear().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

d3.json('data.json', mvps => {
  manageInfo(mvps);
  returnMax(cleanData);

  let valueline = d3
    .line()
    .x(d => x(d.score))
    .y(d => y(d.pdf))
    .curve(d3.curveMonotoneX);

  x.domain([0, Math.ceil(Math.max.apply(null, maxScore) / 10) * 10 + 5]);
  y.domain([0, Math.ceil(Math.max.apply(null, maxPdf) / 0.001) * 0.001 + 0.005]);
  let svg = d3
    .select('.container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append('g').call(d3.axisLeft(y));

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5CQSBUZWFtIENvbG9ycyAoaHNsIHZhbHVlcylcclxuY29uc3QgY29sb3JzID0gW1xyXG4gIFsyMjYsIDYwLCAzNV0sXHJcbiAgWzM0NSwgODUsIDQ0XSxcclxuICBbMjI2LCA2MCwgMzVdLFxyXG4gIFs0MSwgMTAwLCA1Nl0sXHJcbiAgWzE0MywgMTAwLCAxNF0sXHJcbiAgWzM0NSwgODUsIDQ0XSxcclxuICBbOTQsIDUwLCA1MV0sXHJcbiAgWzQxLCAzOCwgNTNdLFxyXG4gIFsxNTMsIDEwMCwgMjZdLFxyXG4gIFsyMDIsIDEwMCwgMzhdXHJcbl07XHJcblxyXG5sZXQgY2xlYW5EYXRhID0gW107XHJcbmxldCBhcnJheUZpbHRlciA9IFtdO1xyXG5sZXQgbWF4U2NvcmUgPSBbXTtcclxubGV0IG1heFBkZiA9IFtdO1xyXG5cclxuY29uc3QgcmV0dXJuT2JqID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxuXHJcbmNvbnN0IGZpbHRlclJlc3VsdCA9IGpzb24gPT5cclxuICBqc29uLm1hcChhID0+IGFycmF5RmlsdGVyLnB1c2goYS5kYXRhLmZpbHRlcihyZXR1cm5PYmopKSk7XHJcblxyXG5jb25zdCBzdHJpbmdUb051bWJlciA9IHN0cmluZyA9PlxyXG4gIHN0cmluZy5tYXAoYiA9PiBwYXJzZUludChiLnBvaW50cykpLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbmNvbnN0IHJldHVybk1heCA9IGFyciA9PlxyXG4gIGFyci5mb3JFYWNoKChlbCwgcG9zKSA9PlxyXG4gICAgZWwuZGF0YS5mb3JFYWNoKGQgPT4gbWF4UGRmLnB1c2goZC5wZGYpICYmIG1heFNjb3JlLnB1c2goZC5zY29yZSkpXHJcbiAgKTtcclxuXHJcbmNvbnN0IG1hbmFnZUluZm8gPSBpbmZvID0+IHtcclxuICAvLyBOb2RlIFdlYiBTY3JhcGVyIHBpY2tlZCB1cCBzb21lIGVycm91bmVvdXMgc3RyaW5nIGRhdGEsIHNvIHdlIG5lZWQgdG8gZmlsdGVyIHRoZSBkYXRhXHJcblxyXG4gIGZpbHRlclJlc3VsdChpbmZvKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgbGV0IGludGVnZXJzID0gc3RyaW5nVG9OdW1iZXIoYXJyYXlGaWx0ZXJbaV0pO1xyXG4gICAgbGV0IG1lYW4gPSBkMy5tZWFuKGludGVnZXJzKTtcclxuICAgIGxldCB2YXJpYW5jZSA9IGQzLnZhcmlhbmNlKGludGVnZXJzKTtcclxuICAgIGxldCBzZCA9IE1hdGguc3FydCh2YXJpYW5jZSk7XHJcblxyXG4gICAgbGV0IGdyYXBoRGF0YSA9IFtdO1xyXG4gICAgLy8gQ3JlYXRpbmcgb3VyIHggYW5kIHkgY29vcmRpbmF0ZXMgZm9yIHRoZSBncmFwaFxyXG4gICAgaW50ZWdlcnMuZm9yRWFjaChudW0gPT5cclxuICAgICAgZ3JhcGhEYXRhLnB1c2goe1xyXG4gICAgICAgIHNjb3JlOiBudW0sXHJcbiAgICAgICAgcGRmOlxyXG4gICAgICAgICAgMSAvXHJcbiAgICAgICAgICBNYXRoLnNxcnQoMiAqIE1hdGguUEkgKiBNYXRoLnBvdyhzZCwgMikpICpcclxuICAgICAgICAgIE1hdGgucG93KE1hdGguRSwgLShNYXRoLnBvdyhudW0gLSBtZWFuLCAyKSAvICgyICogTWF0aC5wb3coc2QsIDIpKSkpXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgLy8gQ3JlYXRpbmcgb3VyIGNsZWFuIGFycmF5IHdpdGggbnVtYmVycyBhbmQgcmVsZXZhbnQgc3RhdGlzdGljc1xyXG4gICAgY2xlYW5EYXRhLnB1c2goe1xyXG4gICAgICBwbGF5ZXI6IGluZm9baV0ucGxheWVyLFxyXG4gICAgICBkYXRhOiBncmFwaERhdGEsXHJcbiAgICAgIG1lYW46IG1lYW4sXHJcbiAgICAgIHZhcmlhbmNlOiB2YXJpYW5jZSxcclxuICAgICAgc2Q6IHNkXHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuLy8gc2V0IHRoZSBkaW1lbnNpb25zIGFuZCBtYXJnaW5zIG9mIHRoZSBncmFwaFxyXG5sZXQgbWFyZ2luID0geyB0b3A6IDQwLCByaWdodDogNDAsIGJvdHRvbTogNjAsIGxlZnQ6IDEwMCB9LFxyXG4gIHdpZHRoID0gd2luZG93Lm91dGVyV2lkdGggKiAwLjg1IC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXHJcbiAgaGVpZ2h0ID0gd2luZG93Lm91dGVySGVpZ2h0ICogMC44NSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xyXG5cclxuLy8gc2V0IHRoZSByYW5nZXNcclxubGV0IHggPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCB3aWR0aF0pO1xyXG5sZXQgeSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW2hlaWdodCwgMF0pO1xyXG5cclxuZDMuanNvbignZGF0YS5qc29uJywgbXZwcyA9PiB7XHJcbiAgbWFuYWdlSW5mbyhtdnBzKTtcclxuICByZXR1cm5NYXgoY2xlYW5EYXRhKTtcclxuXHJcbiAgLy8gZGVmaW5lIHRoZSBsaW5lXHJcbiAgbGV0IHZhbHVlbGluZSA9IGQzXHJcbiAgICAubGluZSgpXHJcbiAgICAueChkID0+IHgoZC5zY29yZSkpXHJcbiAgICAueShkID0+IHkoZC5wZGYpKVxyXG4gICAgLmN1cnZlKGQzLmN1cnZlTW9ub3RvbmVYKTtcclxuXHJcbiAgLy8gU2NhbGUgdGhlIHJhbmdlIG9mIHRoZSBkYXRhXHJcbiAgeC5kb21haW4oWzAsIE1hdGguY2VpbChNYXRoLm1heC5hcHBseShudWxsLCBtYXhTY29yZSkgLyAxMCkgKiAxMCArIDVdKTtcclxuICB5LmRvbWFpbihbMCwgTWF0aC5jZWlsKE1hdGgubWF4LmFwcGx5KG51bGwsIG1heFBkZikgLyAwLjAwMSkgKiAwLjAwMSArIDAuMDA1XSk7XHJcbiAgLy8gYXBwZW5kIHRoZSBzdmcgb2JnZWN0IHRvIHRoZSBib2R5IG9mIHRoZSBwYWdlXHJcbiAgbGV0IHN2ZyA9IGQzXHJcbiAgICAuc2VsZWN0KCcuY29udGFpbmVyJylcclxuICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAuYXR0cignd2lkdGgnLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxyXG4gICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxyXG4gICAgLmFwcGVuZCgnZycpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgJHttYXJnaW4udG9wfSlgKTtcclxuXHJcbiAgLy8gQWRkIHRoZSBYIEF4aXNcclxuICBzdmdcclxuICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHtoZWlnaHR9KWApXHJcbiAgICAuY2FsbChkMy5heGlzQm90dG9tKHgpKTtcclxuXHJcbiAgLy8gQWRkIHRoZSBZIEF4aXNcclxuICBzdmcuYXBwZW5kKCdnJykuY2FsbChkMy5heGlzTGVmdCh5KSk7XHJcblxyXG4gIC8vQXBwZW5kaW5nIGF4aXMgbGFiZWxzXHJcbiAgc3ZnXHJcbiAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxyXG4gICAgLmF0dHIoJ3knLCAwIC0gbWFyZ2luLmxlZnQpXHJcbiAgICAuYXR0cigneCcsIDAgLSBoZWlnaHQgLyAyKVxyXG4gICAgLmF0dHIoJ2R5JywgJzFlbScpXHJcbiAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAudGV4dCgnUHJvYmFiaWxpdHkgRGlzdHJpYnV0aW9uICglKScpO1xyXG5cclxuICBzdmdcclxuICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt3aWR0aCAvIDJ9LCAke2hlaWdodCArIG1hcmdpbi50b3AgKyAyMH0pYClcclxuICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIC50ZXh0KCdQb2ludHMgU2NvcmVkIEluIEdhbWUnKTtcclxuXHJcbiAgY2xlYW5EYXRhLmZvckVhY2goKGRhdGFzZXQsIGkpID0+IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGRlZywgc2F0LCBsaWdodClcclxuICAgIGQzXHJcbiAgICAgIC5zZWxlY3QoJy5sZWdlbmQnKVxyXG4gICAgICAuYXBwZW5kKCdkaXYnKVxyXG4gICAgICAuY2xhc3NlZCgnbGVnZW5kX19wbGF5ZXInLCB0cnVlKVxyXG4gICAgICAuc3R5bGUoXHJcbiAgICAgICAgJ2JhY2tncm91bmQnLFxyXG4gICAgICAgIGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIGhzbCgke2NvbG9yc1tpXVswXX0sICR7Y29sb3JzW2ldWzFdfSUsIFxyXG4gICAgICAgICAgJHtjb2xvcnNbaV1bMl19JSkgMCUsIGhzbCgke2NvbG9yc1tpXVswXSAtIDEwfSwgJHtjb2xvcnNbaV1bMV0gLSA1fSUsIFxyXG4gICAgICAgICAgJHtjb2xvcnNbaV1bMl0gLSA2fSUpIDUxJSwgaHNsKCR7Y29sb3JzW2ldWzBdIC0gMTB9LCBcclxuICAgICAgICAgICR7Y29sb3JzW2ldWzFdIC0gMTB9JSwgJHtjb2xvcnNbaV1bMl0gLSAxMH0lKSA3NSUpYFxyXG4gICAgICApXHJcbiAgICAgIC5hcHBlbmQoJ3AnKVxyXG4gICAgICAudGV4dChbZGF0YXNldC5wbGF5ZXJdKTtcclxuICAgIC8vIEFkZCB0aGUgdmFsdWVsaW5lIHBhdGguXHJcbiAgICBsZXQgcGF0aCA9IHN2Z1xyXG4gICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgLmRhdGEoW2RhdGFzZXQuZGF0YV0pXHJcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcclxuICAgICAgLmF0dHIoJ2QnLCB2YWx1ZWxpbmUpO1xyXG5cclxuICAgIGxldCB0b3RhbExlbmd0aCA9IHBhdGgubm9kZSgpLmdldFRvdGFsTGVuZ3RoKCk7XHJcblxyXG4gICAgcGF0aFxyXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIGAke3RvdGFsTGVuZ3RofSAke3RvdGFsTGVuZ3RofWApXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIHRvdGFsTGVuZ3RoKVxyXG4gICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgIC5kdXJhdGlvbigzMjUwKVxyXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCAwKVxyXG4gICAgICAuYXR0cihcclxuICAgICAgICAnc3Ryb2tlJyxcclxuICAgICAgICBgaHNsKCR7Y29sb3JzW2ldWzBdfSwgJHtjb2xvcnNbaV1bMV19JSwgJHtjb2xvcnNbaV1bMl19JSlgXHJcbiAgICAgICk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxubGV0IHRvZ2dsZVZpc2libGUgPSAoKSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sZWdlbmRfX3BsYXllclwiKS5mb3JFYWNoKChlLCBpKSA9PiBlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBsZXQgbGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saW5lJylcclxuICAgIGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgZS5jbGFzc05hbWUgKz0gJyBub25lJztcclxuICAgIGxpbmVbaV0uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgfVxyXG4gICkpICAgXHJcbn1cclxuXHJcbnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gIHRvZ2dsZVZpc2libGUoKVxyXG59LCA1MCk7XHJcbiJdLCJmaWxlIjoibmJhLWdyYXBocy5qcyJ9
