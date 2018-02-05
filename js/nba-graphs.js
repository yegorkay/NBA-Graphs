d3.json('data.json', (data) => {
    data.sort((a, b) => b.points - a.points);
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

    let margin = {top: 20, right: 20, bottom: 30, left: 50},
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

    svg.append('path')
    .data([graphData])
    .attr('class', 'line')
    .attr('d', valueline);

    svg.append('g')
    .attr('transform', `translate(0, ${height})`) 
    .call(d3.axisBottom(x));

    svg.append('g')
    .call(d3.axisLeft(y));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImQzLmpzb24oJ2RhdGEuanNvbicsIChkYXRhKSA9PiB7XHJcbiAgICBkYXRhLnNvcnQoKGEsIGIpID0+IGIucG9pbnRzIC0gYS5wb2ludHMpO1xyXG4gICAgbGV0IHNjb3JlcyA9IFtdO1xyXG4gICAgLy9yZW1vdmluZyBhbnkgdmFsdWVzIHRoYXQgYXJlIE5hTiAoYWthIEROUCAoRGlkIE5vdCBQbGF5KSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZihpc05hTihkYXRhW2ldLnBvaW50cykgPT0gZmFsc2UpIHtcclxuICAgICAgICBzY29yZXMucHVzaChwYXJzZUludChkYXRhW2ldLnBvaW50cykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBkZkFycmF5ID0gW107XHJcblxyXG4gICAgbGV0IG1lYW4gPSBkMy5tZWFuKHNjb3Jlcyk7XHJcbiAgICBsZXQgdmFyaWFuY2UgPSBkMy52YXJpYW5jZShzY29yZXMpO1xyXG4gICAgbGV0IHNkID0gTWF0aC5zcXJ0KHZhcmlhbmNlKTtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSBzY29yZXMubGVuZ3RoOyB4KyspIHtcclxuICAgICAgaWYoaXNOYU4oc2NvcmVzW3hdKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHBkZkFycmF5LnB1c2goMSAvIE1hdGguc3FydCgoMiAqIE1hdGguUEkgKiBNYXRoLnBvdyhzZCwgMikpKSAqIE1hdGgucG93KE1hdGguRSAsIC0gKChNYXRoLnBvdygoc2NvcmVzW3hdIC0gbWVhbiksIDIpKSAvICgyICogTWF0aC5wb3coc2QsIDIpKSkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBncmFwaERhdGEgPSBbXTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IHBkZkFycmF5Lmxlbmd0aCA7IHkrKykge1xyXG4gICAgICBpZihpc05hTihwZGZBcnJheVt5XSkgPT0gZmFsc2UpIHtcclxuICAgICAgICBncmFwaERhdGEucHVzaCh7XHJcbiAgICAgICAgICBzY29yZTogc2NvcmVzW3ldLFxyXG4gICAgICAgICAgcGRmOiBwZGZBcnJheVt5XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHNldCB0aGUgZGltZW5zaW9ucyBhbmQgbWFyZ2lucyBvZiB0aGUgZ3JhcGhcclxuICAgIGxldCBtYXJnaW4gPSB7dG9wOiAyMCwgcmlnaHQ6IDIwLCBib3R0b206IDMwLCBsZWZ0OiA1MH0sXHJcbiAgICB3aWR0aCA9IDk2MCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxyXG4gICAgaGVpZ2h0ID0gNTAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XHJcblxyXG4gICAgLy8gc2V0IHRoZSByYW5nZXNcclxuICAgIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2lkdGhdKTtcclxuICAgIGxldCB5ID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbaGVpZ2h0LCAwXSk7XHJcblxyXG4gICAgLy8gZGVmaW5lIHRoZSBsaW5lXHJcbiAgICBsZXQgdmFsdWVsaW5lID0gZDMubGluZSgpXHJcbiAgICAueCgoZCkgPT4geChkLnNjb3JlKSlcclxuICAgIC55KChkKSA9PiB5KGQucGRmKSlcclxuICAgIC5jdXJ2ZShkMy5jdXJ2ZU1vbm90b25lWCk7XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBzdmcgb2JnZWN0IHRvIHRoZSBib2R5IG9mIHRoZSBwYWdlXHJcbiAgICAvLyBhcHBlbmRzIGEgJ2dyb3VwJyBlbGVtZW50IHRvICdzdmcnXHJcbiAgICAvLyBtb3ZlcyB0aGUgJ2dyb3VwJyBlbGVtZW50IHRvIHRoZSB0b3AgbGVmdCBtYXJnaW5cclxuICAgIGxldCBzdmcgPSBkMy5zZWxlY3QoJy5jb250YWluZXInKS5hcHBlbmQoJ3N2ZycpXHJcbiAgICAuYXR0cignd2lkdGgnLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxyXG4gICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxyXG4gICAgLmFwcGVuZCgnZycpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgJHttYXJnaW4udG9wfSlgKTsgXHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gU2NhbGUgdGhlIHJhbmdlIG9mIHRoZSBkYXRhXHJcbiAgICB4LmRvbWFpbihbMCwgZDMubWF4KGdyYXBoRGF0YSwgKGQpID0+IGQuc2NvcmUgKyAxMCldKTtcclxuICAgIHkuZG9tYWluKFswLCBkMy5tYXgoZ3JhcGhEYXRhLCAoZCkgPT4gZC5wZGYpXSk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSB2YWx1ZWxpbmUgcGF0aC5cclxuICAgIHN2Zy5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgLmRhdGEoW2dyYXBoRGF0YV0pXHJcbiAgICAuYXR0cignY2xhc3MnLCAnbGluZScpXHJcbiAgICAuYXR0cignZCcsIHZhbHVlbGluZSk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBYIEF4aXNcclxuICAgIHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHtoZWlnaHR9KWApIFxyXG4gICAgLmNhbGwoZDMuYXhpc0JvdHRvbSh4KSk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBZIEF4aXNcclxuICAgIHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgLmNhbGwoZDMuYXhpc0xlZnQoeSkpO1xyXG59KTsiXSwiZmlsZSI6Im5iYS1ncmFwaHMuanMifQ==
