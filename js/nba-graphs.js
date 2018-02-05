d3.json('data.json', (data) => {
    let scores = [];

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

    graphData.sort((a, b) => a.score - b.score);

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

    x.domain([0, d3.max(graphData, (d) => d.score + 10)]);
    y.domain([0, d3.max(graphData, (d) => d.pdf)]);

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

    let gpText = document.querySelector('.gp');
    let meanText = document.querySelector('.mean');
    gpText.innerHTML = `Games Played: ${graphData.length}`;
    meanText.innerHTML = `Mean: ${mean.toFixed(2)} PPG`;
});

function toggleCurve() {
  let curve = document.querySelector('.line');
  curve.style.display === 'none' ? (curve.style.display = 'block') : curve.style.display = 'none';
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImQzLmpzb24oJ2RhdGEuanNvbicsIChkYXRhKSA9PiB7XHJcbiAgICBsZXQgc2NvcmVzID0gW107XHJcbiAgICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAvL3JlbW92aW5nIGFueSB2YWx1ZXMgdGhhdCBhcmUgTmFOIChha2EgRE5QIChEaWQgTm90IFBsYXkpKVxyXG4gICAgICBpZihpc05hTihkYXRhW2ldLnBvaW50cykgPT0gZmFsc2UpIHtcclxuICAgICAgICBzY29yZXMucHVzaChwYXJzZUludChkYXRhW2ldLnBvaW50cykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBkZkFycmF5ID0gW107XHJcblxyXG4gICAgbGV0IG1lYW4gPSBkMy5tZWFuKHNjb3Jlcyk7XHJcbiAgICBsZXQgdmFyaWFuY2UgPSBkMy52YXJpYW5jZShzY29yZXMpO1xyXG4gICAgbGV0IHNkID0gTWF0aC5zcXJ0KHZhcmlhbmNlKTtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSBzY29yZXMubGVuZ3RoOyB4KyspIHtcclxuICAgICAgaWYoaXNOYU4oc2NvcmVzW3hdKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHBkZkFycmF5LnB1c2goMSAvIE1hdGguc3FydCgoMiAqIE1hdGguUEkgKiBNYXRoLnBvdyhzZCwgMikpKSAqIE1hdGgucG93KE1hdGguRSAsIC0gKChNYXRoLnBvdygoc2NvcmVzW3hdIC0gbWVhbiksIDIpKSAvICgyICogTWF0aC5wb3coc2QsIDIpKSkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBncmFwaERhdGEgPSBbXTtcclxuICAgIFxyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gcGRmQXJyYXkubGVuZ3RoIDsgeSsrKSB7XHJcbiAgICAgIGlmKGlzTmFOKHBkZkFycmF5W3ldKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGdyYXBoRGF0YS5wdXNoKHtcclxuICAgICAgICAgIHNjb3JlOiBzY29yZXNbeV0sXHJcbiAgICAgICAgICBwZGY6IHBkZkFycmF5W3ldXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9zb3J0IHNjb3JlcyBsb3cgdG8gaGlnaFxyXG4gICAgZ3JhcGhEYXRhLnNvcnQoKGEsIGIpID0+IGEuc2NvcmUgLSBiLnNjb3JlKTtcclxuXHJcbiAgICAvLyBzZXQgdGhlIGRpbWVuc2lvbnMgYW5kIG1hcmdpbnMgb2YgdGhlIGdyYXBoXHJcbiAgICBsZXQgbWFyZ2luID0ge3RvcDogNDAsIHJpZ2h0OiA0MCwgYm90dG9tOiA2MCwgbGVmdDogMTAwfSxcclxuICAgIHdpZHRoID0gOTYwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXHJcbiAgICBoZWlnaHQgPSA1MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcclxuXHJcbiAgICAvLyBzZXQgdGhlIHJhbmdlc1xyXG4gICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCB3aWR0aF0pO1xyXG4gICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFtoZWlnaHQsIDBdKTtcclxuXHJcbiAgICAvLyBkZWZpbmUgdGhlIGxpbmVcclxuICAgIGxldCB2YWx1ZWxpbmUgPSBkMy5saW5lKClcclxuICAgIC54KChkKSA9PiB4KGQuc2NvcmUpKVxyXG4gICAgLnkoKGQpID0+IHkoZC5wZGYpKVxyXG4gICAgLmN1cnZlKGQzLmN1cnZlTW9ub3RvbmVYKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIHN2ZyBvYmdlY3QgdG8gdGhlIGJvZHkgb2YgdGhlIHBhZ2VcclxuICAgIC8vIGFwcGVuZHMgYSAnZ3JvdXAnIGVsZW1lbnQgdG8gJ3N2ZydcclxuICAgIC8vIG1vdmVzIHRoZSAnZ3JvdXAnIGVsZW1lbnQgdG8gdGhlIHRvcCBsZWZ0IG1hcmdpblxyXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdCgnLmNvbnRhaW5lcicpLmFwcGVuZCgnc3ZnJylcclxuICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXHJcbiAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXHJcbiAgICAuYXBwZW5kKCdnJylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCAke21hcmdpbi50b3B9KWApOyBcclxuICAgIFxyXG4gICAgLy8gU2NhbGUgdGhlIHJhbmdlIG9mIHRoZSBkYXRhXHJcbiAgICB4LmRvbWFpbihbMCwgZDMubWF4KGdyYXBoRGF0YSwgKGQpID0+IGQuc2NvcmUgKyAxMCldKTtcclxuICAgIHkuZG9tYWluKFswLCBkMy5tYXgoZ3JhcGhEYXRhLCAoZCkgPT4gZC5wZGYpXSk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSB2YWx1ZWxpbmUgcGF0aC5cclxuICAgIGxldCBwYXRoID0gc3ZnLmFwcGVuZCgncGF0aCcpXHJcbiAgICAuZGF0YShbZ3JhcGhEYXRhXSlcclxuICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcclxuICAgIC5hdHRyKCdkJywgdmFsdWVsaW5lKTtcclxuXHJcbiAgICB2YXIgdG90YWxMZW5ndGggPSBwYXRoLm5vZGUoKS5nZXRUb3RhbExlbmd0aCgpO1xyXG5cclxuICAgIHBhdGhcclxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBgJHt0b3RhbExlbmd0aH0gJHt0b3RhbExlbmd0aH1gKVxyXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCB0b3RhbExlbmd0aClcclxuICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbigyMjUwKVxyXG4gICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIDApO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgWCBBeGlzXHJcbiAgICBzdmcuYXBwZW5kKCdnJylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7aGVpZ2h0fSlgKSBcclxuICAgIC5jYWxsKGQzLmF4aXNCb3R0b20oeCkpO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgWSBBeGlzXHJcbiAgICBzdmcuYXBwZW5kKCdnJylcclxuICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHkpKTtcclxuXHJcbiAgICAvL0FwcGVuZGluZyBheGlzIGxhYmVsc1xyXG4gICAgc3ZnLmFwcGVuZCgndGV4dCcpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtOTApJylcclxuICAgIC5hdHRyKCd5JywgMCAtIG1hcmdpbi5sZWZ0KVxyXG4gICAgLmF0dHIoJ3gnLCAwIC0gKGhlaWdodCAvIDIpKVxyXG4gICAgLmF0dHIoJ2R5JywgJzFlbScpXHJcbiAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAudGV4dCgnUHJvYmFiaWxpdHkgRGlzdHJpYnV0aW9uICglKScpO1xyXG5cclxuICAgIHN2Zy5hcHBlbmQoJ3RleHQnKSAgICAgICAgICAgICBcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7d2lkdGgvMn0sICR7aGVpZ2h0ICsgbWFyZ2luLnRvcCArIDIwfSlgKSAgIFxyXG4gICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgLnRleHQoJ1BvaW50cyBTY29yZWQgSW4gR2FtZScpO1xyXG5cclxuICAgIGxldCBncFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3AnKTtcclxuICAgIGxldCBtZWFuVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWFuJyk7XHJcbiAgICBncFRleHQuaW5uZXJIVE1MID0gYEdhbWVzIFBsYXllZDogJHtncmFwaERhdGEubGVuZ3RofWA7XHJcbiAgICBtZWFuVGV4dC5pbm5lckhUTUwgPSBgTWVhbjogJHttZWFuLnRvRml4ZWQoMil9IFBQR2A7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ3VydmUoKSB7XHJcbiAgbGV0IGN1cnZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUnKTtcclxuICBjdXJ2ZS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAoY3VydmUuc3R5bGUuZGlzcGxheSA9ICdibG9jaycpIDogY3VydmUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufSJdLCJmaWxlIjoibmJhLWdyYXBocy5qcyJ9
