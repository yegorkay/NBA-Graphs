d3.json('data.json', (data) => {
    let scores = [];
    for (var i = 0; i < data.length; i++) {
      if(isNaN(data[i].points) == false) {
        scores.push(parseInt(data[i].points));
      }
    }

    let pdfArray = [];

    let mean = d3.mean(scores);
    let variance = d3.variance(scores);
    let sd = Math.sqrt(variance);

    for (var x = 0; x <= scores.length; x++) {
      if(isNaN(scores[x]) == false) {
        pdfArray.push(1 / Math.sqrt((2 * Math.PI * Math.pow(sd, 2))) * Math.pow(Math.E , - ((Math.pow((scores[x] - mean), 2)) / (2 * Math.pow(sd, 2)))));
      }
    }

    var graphData = [];
    for (var y = 0; y <= pdfArray.length ; y++) {
      if(isNaN(pdfArray[y]) == false) {
        graphData.push({
          score: scores[y],
          pdf: pdfArray[y]
        });
      }
    };

    console.log(graphData);

    d3.select(".container")
      .selectAll("div")
      .data(scores)
      .enter().append("div")
        .text((d) => `${d} Points`)
        .style('width', function(d) {return (d) + '%'});

    var xScale = d3.scaleLinear().domain([0, 6]).range([0, 81]);
    var yScale = d3.scaleLinear().domain([0, 80]).range([150, 0]);

        var lineGenerator = d3.line()
      .x(function(d, i) {
        return xScale(i);
      })
      .y(function(d) {
        return yScale(d);
      });

        var line = lineGenerator(scores);

    d3.select('g')
      .append('path')
      .attr('d', line);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImQzLmpzb24oJ2RhdGEuanNvbicsIChkYXRhKSA9PiB7XHJcbiAgICAvLyBkYXRhLnNvcnQoKGEsIGIpID0+IGIucG9pbnRzIC0gYS5wb2ludHMpO1xyXG4gICAgbGV0IHNjb3JlcyA9IFtdO1xyXG4gICAgLy9yZW1vdmluZyBhbnkgdmFsdWVzIHRoYXQgYXJlIE5hTiAoYWthIEROUCAoRGlkIE5vdCBQbGF5KSlcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZihpc05hTihkYXRhW2ldLnBvaW50cykgPT0gZmFsc2UpIHtcclxuICAgICAgICBzY29yZXMucHVzaChwYXJzZUludChkYXRhW2ldLnBvaW50cykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBkZkFycmF5ID0gW107XHJcblxyXG4gICAgbGV0IG1lYW4gPSBkMy5tZWFuKHNjb3Jlcyk7XHJcbiAgICBsZXQgdmFyaWFuY2UgPSBkMy52YXJpYW5jZShzY29yZXMpO1xyXG4gICAgbGV0IHNkID0gTWF0aC5zcXJ0KHZhcmlhbmNlKTtcclxuXHJcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8PSBzY29yZXMubGVuZ3RoOyB4KyspIHtcclxuICAgICAgaWYoaXNOYU4oc2NvcmVzW3hdKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHBkZkFycmF5LnB1c2goMSAvIE1hdGguc3FydCgoMiAqIE1hdGguUEkgKiBNYXRoLnBvdyhzZCwgMikpKSAqIE1hdGgucG93KE1hdGguRSAsIC0gKChNYXRoLnBvdygoc2NvcmVzW3hdIC0gbWVhbiksIDIpKSAvICgyICogTWF0aC5wb3coc2QsIDIpKSkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBncmFwaERhdGEgPSBbXTtcclxuICAgIGZvciAodmFyIHkgPSAwOyB5IDw9IHBkZkFycmF5Lmxlbmd0aCA7IHkrKykge1xyXG4gICAgICBpZihpc05hTihwZGZBcnJheVt5XSkgPT0gZmFsc2UpIHtcclxuICAgICAgICBncmFwaERhdGEucHVzaCh7XHJcbiAgICAgICAgICBzY29yZTogc2NvcmVzW3ldLFxyXG4gICAgICAgICAgcGRmOiBwZGZBcnJheVt5XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGdyYXBoRGF0YSk7XHJcblxyXG4gICAgZDMuc2VsZWN0KFwiLmNvbnRhaW5lclwiKVxyXG4gICAgICAuc2VsZWN0QWxsKFwiZGl2XCIpXHJcbiAgICAgIC5kYXRhKHNjb3JlcylcclxuICAgICAgLmVudGVyKCkuYXBwZW5kKFwiZGl2XCIpXHJcbiAgICAgICAgLnRleHQoKGQpID0+IGAke2R9IFBvaW50c2ApXHJcbiAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gKGQpICsgJyUnfSk7XHJcblxyXG4gICAgdmFyIHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFswLCA2XSkucmFuZ2UoWzAsIDgxXSk7XHJcbiAgICB2YXIgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oWzAsIDgwXSkucmFuZ2UoWzE1MCwgMF0pO1xyXG4gICAgXHJcbiAgICB2YXIgbGluZUdlbmVyYXRvciA9IGQzLmxpbmUoKVxyXG4gICAgICAueChmdW5jdGlvbihkLCBpKSB7XHJcbiAgICAgICAgcmV0dXJuIHhTY2FsZShpKTtcclxuICAgICAgfSlcclxuICAgICAgLnkoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiB5U2NhbGUoZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgXHJcbiAgICB2YXIgbGluZSA9IGxpbmVHZW5lcmF0b3Ioc2NvcmVzKTtcclxuICAgIFxyXG4gICAgLy8gQ3JlYXRlIGEgcGF0aCBlbGVtZW50IGFuZCBzZXQgaXRzIGQgYXR0cmlidXRlXHJcbiAgICBkMy5zZWxlY3QoJ2cnKVxyXG4gICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgLmF0dHIoJ2QnLCBsaW5lKTtcclxufSk7Il0sImZpbGUiOiJuYmEtZ3JhcGhzLmpzIn0=
