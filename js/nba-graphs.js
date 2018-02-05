d3.json('data.json', (data) => {
    data.sort((a, b) => a.points - b.points);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImQzLmpzb24oJ2RhdGEuanNvbicsIChkYXRhKSA9PiB7XHJcbiAgICBkYXRhLnNvcnQoKGEsIGIpID0+IGEucG9pbnRzIC0gYi5wb2ludHMpO1xyXG4gICAgbGV0IHNjb3JlcyA9IFtdO1xyXG4gICAgLy9yZW1vdmluZyBhbnkgdmFsdWVzIHRoYXQgYXJlIE5hTiAoYWthIEROUCAoRGlkIE5vdCBQbGF5KSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZihpc05hTihkYXRhW2ldLnBvaW50cykgPT0gZmFsc2UpIHtcclxuICAgICAgICBzY29yZXMucHVzaChwYXJzZUludChkYXRhW2ldLnBvaW50cykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBkZkFycmF5ID0gW107XHJcblxyXG4gICAgbGV0IG1lYW4gPSBkMy5tZWFuKHNjb3Jlcyk7XHJcbiAgICBsZXQgdmFyaWFuY2UgPSBkMy52YXJpYW5jZShzY29yZXMpO1xyXG4gICAgbGV0IHNkID0gTWF0aC5zcXJ0KHZhcmlhbmNlKTtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSBzY29yZXMubGVuZ3RoOyB4KyspIHtcclxuICAgICAgaWYoaXNOYU4oc2NvcmVzW3hdKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHBkZkFycmF5LnB1c2goMSAvIE1hdGguc3FydCgoMiAqIE1hdGguUEkgKiBNYXRoLnBvdyhzZCwgMikpKSAqIE1hdGgucG93KE1hdGguRSAsIC0gKChNYXRoLnBvdygoc2NvcmVzW3hdIC0gbWVhbiksIDIpKSAvICgyICogTWF0aC5wb3coc2QsIDIpKSkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBncmFwaERhdGEgPSBbXTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IHBkZkFycmF5Lmxlbmd0aCA7IHkrKykge1xyXG4gICAgICBpZihpc05hTihwZGZBcnJheVt5XSkgPT0gZmFsc2UpIHtcclxuICAgICAgICBncmFwaERhdGEucHVzaCh7XHJcbiAgICAgICAgICBzY29yZTogc2NvcmVzW3ldLFxyXG4gICAgICAgICAgcGRmOiBwZGZBcnJheVt5XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHNldCB0aGUgZGltZW5zaW9ucyBhbmQgbWFyZ2lucyBvZiB0aGUgZ3JhcGhcclxuICAgIGxldCBtYXJnaW4gPSB7dG9wOiA0MCwgcmlnaHQ6IDQwLCBib3R0b206IDYwLCBsZWZ0OiAxMDB9LFxyXG4gICAgd2lkdGggPSA5NjAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcclxuICAgIGhlaWdodCA9IDUwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xyXG5cclxuICAgIC8vIHNldCB0aGUgcmFuZ2VzXHJcbiAgICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdpZHRoXSk7XHJcbiAgICBsZXQgeSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW2hlaWdodCwgMF0pO1xyXG5cclxuICAgIC8vIGRlZmluZSB0aGUgbGluZVxyXG4gICAgbGV0IHZhbHVlbGluZSA9IGQzLmxpbmUoKVxyXG4gICAgLngoKGQpID0+IHgoZC5zY29yZSkpXHJcbiAgICAueSgoZCkgPT4geShkLnBkZikpXHJcbiAgICAuY3VydmUoZDMuY3VydmVNb25vdG9uZVgpO1xyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgc3ZnIG9iZ2VjdCB0byB0aGUgYm9keSBvZiB0aGUgcGFnZVxyXG4gICAgLy8gYXBwZW5kcyBhICdncm91cCcgZWxlbWVudCB0byAnc3ZnJ1xyXG4gICAgLy8gbW92ZXMgdGhlICdncm91cCcgZWxlbWVudCB0byB0aGUgdG9wIGxlZnQgbWFyZ2luXHJcbiAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KCcuY29udGFpbmVyJykuYXBwZW5kKCdzdmcnKVxyXG4gICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcclxuICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcclxuICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7bWFyZ2luLnRvcH0pYCk7IFxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vIFNjYWxlIHRoZSByYW5nZSBvZiB0aGUgZGF0YVxyXG4gICAgeC5kb21haW4oWzAsIGQzLm1heChncmFwaERhdGEsIChkKSA9PiBkLnNjb3JlICsgMTApXSk7XHJcbiAgICB5LmRvbWFpbihbMCwgZDMubWF4KGdyYXBoRGF0YSwgKGQpID0+IGQucGRmKV0pO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgdmFsdWVsaW5lIHBhdGguXHJcbiAgICBsZXQgcGF0aCA9IHN2Zy5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgLmRhdGEoW2dyYXBoRGF0YV0pXHJcbiAgICAuYXR0cignY2xhc3MnLCAnbGluZScpXHJcbiAgICAuYXR0cignZCcsIHZhbHVlbGluZSk7XHJcblxyXG4gICAgdmFyIHRvdGFsTGVuZ3RoID0gcGF0aC5ub2RlKCkuZ2V0VG90YWxMZW5ndGgoKTtcclxuXHJcbiAgICBwYXRoXHJcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgYCR7dG90YWxMZW5ndGh9ICR7dG90YWxMZW5ndGh9YClcclxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgdG90YWxMZW5ndGgpXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oMjI1MClcclxuICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCAwKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIFggQXhpc1xyXG4gICAgc3ZnLmFwcGVuZCgnZycpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke2hlaWdodH0pYCkgXHJcbiAgICAuY2FsbChkMy5heGlzQm90dG9tKHgpKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIFkgQXhpc1xyXG4gICAgc3ZnLmFwcGVuZCgnZycpXHJcbiAgICAuY2FsbChkMy5heGlzTGVmdCh5KSk7XHJcblxyXG5cclxuICAgIC8vQXBwZW5kaW5nIGF4aXMgbGFiZWxzXHJcbiAgICBzdmcuYXBwZW5kKCd0ZXh0JylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxyXG4gICAgLmF0dHIoJ3knLCAwIC0gbWFyZ2luLmxlZnQpXHJcbiAgICAuYXR0cigneCcsIDAgLSAoaGVpZ2h0IC8gMikpXHJcbiAgICAuYXR0cignZHknLCAnMWVtJylcclxuICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIC50ZXh0KCdQcm9iYWJpbGl0eSBEaXN0cmlidXRpb24gKCUpJyk7XHJcblxyXG4gICAgc3ZnLmFwcGVuZCgndGV4dCcpICAgICAgICAgICAgIFxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt3aWR0aC8yfSwgJHtoZWlnaHQgKyBtYXJnaW4udG9wICsgMjB9KWApICAgXHJcbiAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAudGV4dCgnUG9pbnRzIFNjb3JlZCBJbiBHYW1lJyk7XHJcblxyXG4gICAgbGV0IGdwVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncCcpO1xyXG4gICAgbGV0IG1lYW5UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lYW4nKTtcclxuICAgIGdwVGV4dC5pbm5lckhUTUwgPSBgR2FtZXMgUGxheWVkOiAke2dyYXBoRGF0YS5sZW5ndGh9YDtcclxuICAgIG1lYW5UZXh0LmlubmVySFRNTCA9IGBNZWFuOiAke21lYW4udG9GaXhlZCgyKX0gUFBHYDtcclxufSk7XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVDdXJ2ZSgpIHtcclxuICBsZXQgY3VydmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZScpO1xyXG4gIGN1cnZlLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/IChjdXJ2ZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJykgOiBjdXJ2ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59Il0sImZpbGUiOiJuYmEtZ3JhcGhzLmpzIn0=
