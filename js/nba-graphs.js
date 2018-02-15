const colors = [
  '#243E90', '#CE1141', '#243E90', '#FFB81C', '#00471B',
  '#CD1141', '#7AC143', '#B4975A', '#008248', '#007AC1'
];

let cleanData = [];
let arrayFilter = [];
let maxScore = [];
let maxPdf = [];

const returnObj = (value) => typeof value === 'object';

const filterResult = (json) =>
  json.map(a => arrayFilter.push(a.data.filter(returnObj)));

const stringToNumber = (string) =>
  string.map(b => parseInt(b.points)).sort((a, b) => a - b);

const returnMax = (arr) =>
  arr.forEach((el, pos) =>
    el.data.forEach(d => maxPdf.push(d.pdf) && maxScore.push(d.score))
  );

const manageInfo = (info) => {
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

d3.json('data.json', (mvps) => {
  manageInfo(mvps);
  returnMax(cleanData);
  let margin = { top: 40, right: 40, bottom: 60, left: 100 },
    width = window.outerWidth * 0.85 - margin.left - margin.right,
    height = window.outerHeight * 0.85 - margin.top - margin.bottom;

  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

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
      .attr('stroke', colors[i]);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5CQSBUZWFtIENvbG9yc1xyXG5jb25zdCBjb2xvcnMgPSBbXHJcbiAgJyMyNDNFOTAnLCAnI0NFMTE0MScsICcjMjQzRTkwJywgJyNGRkI4MUMnLCAnIzAwNDcxQicsXHJcbiAgJyNDRDExNDEnLCAnIzdBQzE0MycsICcjQjQ5NzVBJywgJyMwMDgyNDgnLCAnIzAwN0FDMSdcclxuXTtcclxuXHJcbmxldCBjbGVhbkRhdGEgPSBbXTtcclxubGV0IGFycmF5RmlsdGVyID0gW107XHJcbmxldCBtYXhTY29yZSA9IFtdO1xyXG5sZXQgbWF4UGRmID0gW107XHJcblxyXG5jb25zdCByZXR1cm5PYmogPSAodmFsdWUpID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XHJcblxyXG5jb25zdCBmaWx0ZXJSZXN1bHQgPSAoanNvbikgPT5cclxuICBqc29uLm1hcChhID0+IGFycmF5RmlsdGVyLnB1c2goYS5kYXRhLmZpbHRlcihyZXR1cm5PYmopKSk7XHJcblxyXG5jb25zdCBzdHJpbmdUb051bWJlciA9IChzdHJpbmcpID0+XHJcbiAgc3RyaW5nLm1hcChiID0+IHBhcnNlSW50KGIucG9pbnRzKSkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG5cclxuY29uc3QgcmV0dXJuTWF4ID0gKGFycikgPT5cclxuICBhcnIuZm9yRWFjaCgoZWwsIHBvcykgPT5cclxuICAgIGVsLmRhdGEuZm9yRWFjaChkID0+IG1heFBkZi5wdXNoKGQucGRmKSAmJiBtYXhTY29yZS5wdXNoKGQuc2NvcmUpKVxyXG4gICk7XHJcblxyXG5jb25zdCBtYW5hZ2VJbmZvID0gKGluZm8pID0+IHtcclxuICAvLyBOb2RlIFdlYiBTY3JhcGVyIHBpY2tlZCB1cCBzb21lIGVycm91bmVvdXMgc3RyaW5nIGRhdGEsIHNvIHdlIG5lZWQgdG8gZmlsdGVyIHRoZSBkYXRhXHJcbiAgbGV0IGZpbHRlcmVkQXJyYXkgPSBmaWx0ZXJSZXN1bHQoaW5mbyk7XHJcblxyXG4gIGZpbHRlcmVkQXJyYXkuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgIGxldCBpbnRlZ2VycyA9IHN0cmluZ1RvTnVtYmVyKGFycmF5RmlsdGVyW2ldKTtcclxuICAgIGxldCBtZWFuID0gZDMubWVhbihpbnRlZ2Vycyk7XHJcbiAgICBsZXQgdmFyaWFuY2UgPSBkMy52YXJpYW5jZShpbnRlZ2Vycyk7XHJcbiAgICBsZXQgc2QgPSBNYXRoLnNxcnQodmFyaWFuY2UpO1xyXG5cclxuICAgIGxldCBncmFwaERhdGEgPSBbXTtcclxuICAgIC8vIENyZWF0aW5nIG91ciB4IGFuZCB5IGNvb3JkaW5hdGVzIGZvciB0aGUgZ3JhcGhcclxuICAgIGludGVnZXJzLmZvckVhY2gobnVtID0+XHJcbiAgICAgIGdyYXBoRGF0YS5wdXNoKHtcclxuICAgICAgICBzY29yZTogbnVtLFxyXG4gICAgICAgIHBkZjpcclxuICAgICAgICAgIDEgL1xyXG4gICAgICAgICAgTWF0aC5zcXJ0KDIgKiBNYXRoLlBJICogTWF0aC5wb3coc2QsIDIpKSAqXHJcbiAgICAgICAgICBNYXRoLnBvdyhNYXRoLkUsIC0oTWF0aC5wb3cobnVtIC0gbWVhbiwgMikgLyAoMiAqIE1hdGgucG93KHNkLCAyKSkpKVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIC8vIENyZWF0aW5nIG91ciBjbGVhbiBhcnJheSB3aXRoIG51bWJlcnMgYW5kIHJlbGV2YW50IHN0YXRpc3RpY3NcclxuICAgIGNsZWFuRGF0YS5wdXNoKHtcclxuICAgICAgcGxheWVyOiBpbmZvW2ldLnBsYXllcixcclxuICAgICAgZGF0YTogZ3JhcGhEYXRhLFxyXG4gICAgICBtZWFuOiBtZWFuLFxyXG4gICAgICB2YXJpYW5jZTogdmFyaWFuY2UsXHJcbiAgICAgIHNkOiBzZFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5kMy5qc29uKCdkYXRhLmpzb24nLCAobXZwcykgPT4ge1xyXG4gIG1hbmFnZUluZm8obXZwcyk7XHJcbiAgcmV0dXJuTWF4KGNsZWFuRGF0YSk7XHJcbiAgLy8gc2V0IHRoZSBkaW1lbnNpb25zIGFuZCBtYXJnaW5zIG9mIHRoZSBncmFwaFxyXG4gIGxldCBtYXJnaW4gPSB7IHRvcDogNDAsIHJpZ2h0OiA0MCwgYm90dG9tOiA2MCwgbGVmdDogMTAwIH0sXHJcbiAgICB3aWR0aCA9IHdpbmRvdy5vdXRlcldpZHRoICogMC44NSAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxyXG4gICAgaGVpZ2h0ID0gd2luZG93Lm91dGVySGVpZ2h0ICogMC44NSAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xyXG5cclxuICAvLyBzZXQgdGhlIHJhbmdlc1xyXG4gIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2lkdGhdKTtcclxuICBsZXQgeSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW2hlaWdodCwgMF0pO1xyXG5cclxuICAvLyBkZWZpbmUgdGhlIGxpbmVcclxuICBsZXQgdmFsdWVsaW5lID0gZDNcclxuICAgIC5saW5lKClcclxuICAgIC54KGQgPT4geChkLnNjb3JlKSlcclxuICAgIC55KGQgPT4geShkLnBkZikpXHJcbiAgICAuY3VydmUoZDMuY3VydmVNb25vdG9uZVgpO1xyXG5cclxuICAvLyBTY2FsZSB0aGUgcmFuZ2Ugb2YgdGhlIGRhdGFcclxuICB4LmRvbWFpbihbMCwgTWF0aC5jZWlsKE1hdGgubWF4LmFwcGx5KG51bGwsIG1heFNjb3JlKSAvIDEwKSAqIDEwICsgNV0pO1xyXG4gIHkuZG9tYWluKFswLCBNYXRoLmNlaWwoTWF0aC5tYXguYXBwbHkobnVsbCwgbWF4UGRmKSAvIDAuMDAxKSAqIDAuMDAxICsgMC4wMDVdKTtcclxuICAvLyBhcHBlbmQgdGhlIHN2ZyBvYmdlY3QgdG8gdGhlIGJvZHkgb2YgdGhlIHBhZ2VcclxuICBsZXQgc3ZnID0gZDNcclxuICAgIC5zZWxlY3QoJy5jb250YWluZXInKVxyXG4gICAgLmFwcGVuZCgnc3ZnJylcclxuICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXHJcbiAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXHJcbiAgICAuYXBwZW5kKCdnJylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCAke21hcmdpbi50b3B9KWApO1xyXG5cclxuICAvLyBBZGQgdGhlIFggQXhpc1xyXG4gIHN2Z1xyXG4gICAgLmFwcGVuZCgnZycpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke2hlaWdodH0pYClcclxuICAgIC5jYWxsKGQzLmF4aXNCb3R0b20oeCkpO1xyXG5cclxuICAvLyBBZGQgdGhlIFkgQXhpc1xyXG4gIHN2Zy5hcHBlbmQoJ2cnKS5jYWxsKGQzLmF4aXNMZWZ0KHkpKTtcclxuXHJcbiAgLy9BcHBlbmRpbmcgYXhpcyBsYWJlbHNcclxuICBzdmdcclxuICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXHJcbiAgICAuYXR0cigneScsIDAgLSBtYXJnaW4ubGVmdClcclxuICAgIC5hdHRyKCd4JywgMCAtIGhlaWdodCAvIDIpXHJcbiAgICAuYXR0cignZHknLCAnMWVtJylcclxuICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIC50ZXh0KCdQcm9iYWJpbGl0eSBEaXN0cmlidXRpb24gKCUpJyk7XHJcblxyXG4gIHN2Z1xyXG4gICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3dpZHRoIC8gMn0sICR7aGVpZ2h0ICsgbWFyZ2luLnRvcCArIDIwfSlgKVxyXG4gICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgLnRleHQoJ1BvaW50cyBTY29yZWQgSW4gR2FtZScpO1xyXG5cclxuICBjbGVhbkRhdGEuZm9yRWFjaCgoZGF0YXNldCwgaSkgPT4ge1xyXG4gICAgLy8gQWRkIHRoZSB2YWx1ZWxpbmUgcGF0aC5cclxuICAgIGxldCBwYXRoID0gc3ZnXHJcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAuZGF0YShbZGF0YXNldC5kYXRhXSlcclxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxyXG4gICAgICAuYXR0cignZCcsIHZhbHVlbGluZSk7XHJcblxyXG4gICAgbGV0IHRvdGFsTGVuZ3RoID0gcGF0aC5ub2RlKCkuZ2V0VG90YWxMZW5ndGgoKTtcclxuXHJcbiAgICBwYXRoXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgYCR7dG90YWxMZW5ndGh9ICR7dG90YWxMZW5ndGh9YClcclxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgdG90YWxMZW5ndGgpXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKDMyNTApXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIDApXHJcbiAgICAgIC5hdHRyKCdzdHJva2UnLCBjb2xvcnNbaV0pO1xyXG4gIH0pO1xyXG59KTsiXSwiZmlsZSI6Im5iYS1ncmFwaHMuanMifQ==
