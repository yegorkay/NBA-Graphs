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
  let filteredArray = filterResult(info);

  filteredArray.forEach((el, i) => {
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
  y.domain([
    0,
    Math.ceil(Math.max.apply(null, maxPdf) / 0.001) * 0.001 + 0.005
  ]);
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
        `linear-gradient(141deg, hsl(${colors[i][0]}, ${colors[i][1]}%, 
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5CQSBUZWFtIENvbG9ycyAoaHNsIHZhbHVlcylcclxuY29uc3QgY29sb3JzID0gW1xyXG4gIFsyMjYsIDYwLCAzNV0sXHJcbiAgWzM0NSwgODUsIDQ0XSxcclxuICBbMjI2LCA2MCwgMzVdLFxyXG4gIFs0MSwgMTAwLCA1Nl0sXHJcbiAgWzE0MywgMTAwLCAxNF0sXHJcbiAgWzM0NSwgODUsIDQ0XSxcclxuICBbOTQsIDUwLCA1MV0sXHJcbiAgWzQxLCAzOCwgNTNdLFxyXG4gIFsxNTMsIDEwMCwgMjZdLFxyXG4gIFsyMDIsIDEwMCwgMzhdXHJcbl07XHJcblxyXG5sZXQgY2xlYW5EYXRhID0gW107XHJcbmxldCBhcnJheUZpbHRlciA9IFtdO1xyXG5sZXQgbWF4U2NvcmUgPSBbXTtcclxubGV0IG1heFBkZiA9IFtdO1xyXG5cclxuY29uc3QgcmV0dXJuT2JqID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxuXHJcbmNvbnN0IGZpbHRlclJlc3VsdCA9IGpzb24gPT5cclxuICBqc29uLm1hcChhID0+IGFycmF5RmlsdGVyLnB1c2goYS5kYXRhLmZpbHRlcihyZXR1cm5PYmopKSk7XHJcblxyXG5jb25zdCBzdHJpbmdUb051bWJlciA9IHN0cmluZyA9PlxyXG4gIHN0cmluZy5tYXAoYiA9PiBwYXJzZUludChiLnBvaW50cykpLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbmNvbnN0IHJldHVybk1heCA9IGFyciA9PlxyXG4gIGFyci5mb3JFYWNoKChlbCwgcG9zKSA9PlxyXG4gICAgZWwuZGF0YS5mb3JFYWNoKGQgPT4gbWF4UGRmLnB1c2goZC5wZGYpICYmIG1heFNjb3JlLnB1c2goZC5zY29yZSkpXHJcbiAgKTtcclxuXHJcbmNvbnN0IG1hbmFnZUluZm8gPSBpbmZvID0+IHtcclxuICAvLyBOb2RlIFdlYiBTY3JhcGVyIHBpY2tlZCB1cCBzb21lIGVycm91bmVvdXMgc3RyaW5nIGRhdGEsIHNvIHdlIG5lZWQgdG8gZmlsdGVyIHRoZSBkYXRhXHJcbiAgbGV0IGZpbHRlcmVkQXJyYXkgPSBmaWx0ZXJSZXN1bHQoaW5mbyk7XHJcblxyXG4gIGZpbHRlcmVkQXJyYXkuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgIGxldCBpbnRlZ2VycyA9IHN0cmluZ1RvTnVtYmVyKGFycmF5RmlsdGVyW2ldKTtcclxuICAgIGxldCBtZWFuID0gZDMubWVhbihpbnRlZ2Vycyk7XHJcbiAgICBsZXQgdmFyaWFuY2UgPSBkMy52YXJpYW5jZShpbnRlZ2Vycyk7XHJcbiAgICBsZXQgc2QgPSBNYXRoLnNxcnQodmFyaWFuY2UpO1xyXG5cclxuICAgIGxldCBncmFwaERhdGEgPSBbXTtcclxuICAgIC8vIENyZWF0aW5nIG91ciB4IGFuZCB5IGNvb3JkaW5hdGVzIGZvciB0aGUgZ3JhcGhcclxuICAgIGludGVnZXJzLmZvckVhY2gobnVtID0+XHJcbiAgICAgIGdyYXBoRGF0YS5wdXNoKHtcclxuICAgICAgICBzY29yZTogbnVtLFxyXG4gICAgICAgIHBkZjpcclxuICAgICAgICAgIDEgL1xyXG4gICAgICAgICAgTWF0aC5zcXJ0KDIgKiBNYXRoLlBJICogTWF0aC5wb3coc2QsIDIpKSAqXHJcbiAgICAgICAgICBNYXRoLnBvdyhNYXRoLkUsIC0oTWF0aC5wb3cobnVtIC0gbWVhbiwgMikgLyAoMiAqIE1hdGgucG93KHNkLCAyKSkpKVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIC8vIENyZWF0aW5nIG91ciBjbGVhbiBhcnJheSB3aXRoIG51bWJlcnMgYW5kIHJlbGV2YW50IHN0YXRpc3RpY3NcclxuICAgIGNsZWFuRGF0YS5wdXNoKHtcclxuICAgICAgcGxheWVyOiBpbmZvW2ldLnBsYXllcixcclxuICAgICAgZGF0YTogZ3JhcGhEYXRhLFxyXG4gICAgICBtZWFuOiBtZWFuLFxyXG4gICAgICB2YXJpYW5jZTogdmFyaWFuY2UsXHJcbiAgICAgIHNkOiBzZFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcbi8vIHNldCB0aGUgZGltZW5zaW9ucyBhbmQgbWFyZ2lucyBvZiB0aGUgZ3JhcGhcclxubGV0IG1hcmdpbiA9IHsgdG9wOiA0MCwgcmlnaHQ6IDQwLCBib3R0b206IDYwLCBsZWZ0OiAxMDAgfSxcclxuICB3aWR0aCA9IHdpbmRvdy5vdXRlcldpZHRoICogMC44NSAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxyXG4gIGhlaWdodCA9IHdpbmRvdy5vdXRlckhlaWdodCAqIDAuODUgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcclxuXHJcbi8vIHNldCB0aGUgcmFuZ2VzXHJcbmxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2lkdGhdKTtcclxubGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFtoZWlnaHQsIDBdKTtcclxuXHJcbmQzLmpzb24oJ2RhdGEuanNvbicsIG12cHMgPT4ge1xyXG4gIG1hbmFnZUluZm8obXZwcyk7XHJcbiAgcmV0dXJuTWF4KGNsZWFuRGF0YSk7XHJcblxyXG4gIC8vIGRlZmluZSB0aGUgbGluZVxyXG4gIGxldCB2YWx1ZWxpbmUgPSBkM1xyXG4gICAgLmxpbmUoKVxyXG4gICAgLngoZCA9PiB4KGQuc2NvcmUpKVxyXG4gICAgLnkoZCA9PiB5KGQucGRmKSlcclxuICAgIC5jdXJ2ZShkMy5jdXJ2ZU1vbm90b25lWCk7XHJcblxyXG4gIC8vIFNjYWxlIHRoZSByYW5nZSBvZiB0aGUgZGF0YVxyXG4gIHguZG9tYWluKFswLCBNYXRoLmNlaWwoTWF0aC5tYXguYXBwbHkobnVsbCwgbWF4U2NvcmUpIC8gMTApICogMTAgKyA1XSk7XHJcbiAgeS5kb21haW4oW1xyXG4gICAgMCxcclxuICAgIE1hdGguY2VpbChNYXRoLm1heC5hcHBseShudWxsLCBtYXhQZGYpIC8gMC4wMDEpICogMC4wMDEgKyAwLjAwNVxyXG4gIF0pO1xyXG4gIC8vIGFwcGVuZCB0aGUgc3ZnIG9iZ2VjdCB0byB0aGUgYm9keSBvZiB0aGUgcGFnZVxyXG4gIGxldCBzdmcgPSBkM1xyXG4gICAgLnNlbGVjdCgnLmNvbnRhaW5lcicpXHJcbiAgICAuYXBwZW5kKCdzdmcnKVxyXG4gICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcclxuICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcclxuICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7bWFyZ2luLnRvcH0pYCk7XHJcblxyXG4gIC8vIEFkZCB0aGUgWCBBeGlzXHJcbiAgc3ZnXHJcbiAgICAuYXBwZW5kKCdnJylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7aGVpZ2h0fSlgKVxyXG4gICAgLmNhbGwoZDMuYXhpc0JvdHRvbSh4KSk7XHJcblxyXG4gIC8vIEFkZCB0aGUgWSBBeGlzXHJcbiAgc3ZnLmFwcGVuZCgnZycpLmNhbGwoZDMuYXhpc0xlZnQoeSkpO1xyXG5cclxuICAvL0FwcGVuZGluZyBheGlzIGxhYmVsc1xyXG4gIHN2Z1xyXG4gICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtOTApJylcclxuICAgIC5hdHRyKCd5JywgMCAtIG1hcmdpbi5sZWZ0KVxyXG4gICAgLmF0dHIoJ3gnLCAwIC0gaGVpZ2h0IC8gMilcclxuICAgIC5hdHRyKCdkeScsICcxZW0nKVxyXG4gICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgLnRleHQoJ1Byb2JhYmlsaXR5IERpc3RyaWJ1dGlvbiAoJSknKTtcclxuXHJcbiAgc3ZnXHJcbiAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHtoZWlnaHQgKyBtYXJnaW4udG9wICsgMjB9KWApXHJcbiAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAudGV4dCgnUG9pbnRzIFNjb3JlZCBJbiBHYW1lJyk7XHJcblxyXG4gIGNsZWFuRGF0YS5mb3JFYWNoKChkYXRhc2V0LCBpKSA9PiB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhkZWcsIHNhdCwgbGlnaHQpXHJcbiAgICBkM1xyXG4gICAgICAuc2VsZWN0KCcubGVnZW5kJylcclxuICAgICAgLmFwcGVuZCgnZGl2JylcclxuICAgICAgLmNsYXNzZWQoJ2xlZ2VuZF9fcGxheWVyJywgdHJ1ZSlcclxuICAgICAgLnN0eWxlKFxyXG4gICAgICAgICdiYWNrZ3JvdW5kJyxcclxuICAgICAgICBgbGluZWFyLWdyYWRpZW50KDE0MWRlZywgaHNsKCR7Y29sb3JzW2ldWzBdfSwgJHtjb2xvcnNbaV1bMV19JSwgXHJcbiAgICAgICAgICAke2NvbG9yc1tpXVsyXX0lKSAwJSwgaHNsKCR7Y29sb3JzW2ldWzBdIC0gMTB9LCAke2NvbG9yc1tpXVsxXSAtIDV9JSwgXHJcbiAgICAgICAgICAke2NvbG9yc1tpXVsyXSAtIDZ9JSkgNTElLCBoc2woJHtjb2xvcnNbaV1bMF0gLSAxMH0sIFxyXG4gICAgICAgICAgJHtjb2xvcnNbaV1bMV0gLSAxMH0lLCAke2NvbG9yc1tpXVsyXSAtIDEwfSUpIDc1JSlgXHJcbiAgICAgIClcclxuICAgICAgLmFwcGVuZCgncCcpXHJcbiAgICAgIC50ZXh0KFtkYXRhc2V0LnBsYXllcl0pO1xyXG4gICAgLy8gQWRkIHRoZSB2YWx1ZWxpbmUgcGF0aC5cclxuICAgIGxldCBwYXRoID0gc3ZnXHJcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAuZGF0YShbZGF0YXNldC5kYXRhXSlcclxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxyXG4gICAgICAuYXR0cignZCcsIHZhbHVlbGluZSk7XHJcblxyXG4gICAgbGV0IHRvdGFsTGVuZ3RoID0gcGF0aC5ub2RlKCkuZ2V0VG90YWxMZW5ndGgoKTtcclxuXHJcbiAgICBwYXRoXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgYCR7dG90YWxMZW5ndGh9ICR7dG90YWxMZW5ndGh9YClcclxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgdG90YWxMZW5ndGgpXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKDMyNTApXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIDApXHJcbiAgICAgIC5hdHRyKFxyXG4gICAgICAgICdzdHJva2UnLFxyXG4gICAgICAgIGBoc2woJHtjb2xvcnNbaV1bMF19LCAke2NvbG9yc1tpXVsxXX0lLCAke2NvbG9yc1tpXVsyXX0lKWBcclxuICAgICAgKTtcclxuICB9KTtcclxufSk7Il0sImZpbGUiOiJuYmEtZ3JhcGhzLmpzIn0=
