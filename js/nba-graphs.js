d3.json("data.json", (data) => {
    let scores = [];
    for (var i = 0; i < data.length; i++) {
      if(isNaN(data[i].points) == false) {
        scores.push(parseInt(data[i].points));
      }
    }

    let mean = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    let low = Math.min(...scores);
    let high = Math.max(...scores);
    console.log(`Mean: ${mean}, Low: ${low}, High: ${high}`);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuYmEtZ3JhcGhzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImQzLmpzb24oXCJkYXRhLmpzb25cIiwgKGRhdGEpID0+IHtcclxuICAgIC8vIGRhdGEuc29ydCgoYSwgYikgPT4gYi5wb2ludHMgLSBhLnBvaW50cyk7XHJcbiAgICBsZXQgc2NvcmVzID0gW107XHJcbiAgICAvL3JlbW92aW5nIGFueSB2YWx1ZXMgdGhhdCBhcmUgTmFOIChha2EgRE5QIChEaWQgTm90IFBsYXkpKVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmKGlzTmFOKGRhdGFbaV0ucG9pbnRzKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHNjb3Jlcy5wdXNoKHBhcnNlSW50KGRhdGFbaV0ucG9pbnRzKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWVhbiA9IE1hdGgucm91bmQoc2NvcmVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApIC8gc2NvcmVzLmxlbmd0aCk7XHJcbiAgICBsZXQgbG93ID0gTWF0aC5taW4oLi4uc2NvcmVzKTtcclxuICAgIGxldCBoaWdoID0gTWF0aC5tYXgoLi4uc2NvcmVzKTtcclxuICAgIGNvbnNvbGUubG9nKGBNZWFuOiAke21lYW59LCBMb3c6ICR7bG93fSwgSGlnaDogJHtoaWdofWApO1xyXG4gICAgLy8gY29uc29sZS5sb2coc2NvcmVzKTtcclxuXHJcbiAgICBkMy5zZWxlY3QoXCIuY29udGFpbmVyXCIpXHJcbiAgICAgIC5zZWxlY3RBbGwoXCJkaXZcIilcclxuICAgICAgLmRhdGEoc2NvcmVzKVxyXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoXCJkaXZcIilcclxuICAgICAgICAudGV4dCgoZCkgPT4gYCR7ZH0gUG9pbnRzYClcclxuICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24oZCkge3JldHVybiAoZCkgKyAnJSd9KTtcclxuXHJcbiAgICB2YXIgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oWzAsIDZdKS5yYW5nZShbMCwgODFdKTtcclxuICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbMCwgODBdKS5yYW5nZShbMTUwLCAwXSk7XHJcbiAgICBcclxuICAgIHZhciBsaW5lR2VuZXJhdG9yID0gZDMubGluZSgpXHJcbiAgICAgIC54KGZ1bmN0aW9uKGQsIGkpIHtcclxuICAgICAgICByZXR1cm4geFNjYWxlKGkpO1xyXG4gICAgICB9KVxyXG4gICAgICAueShmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIHlTY2FsZShkKTtcclxuICAgICAgfSk7XHJcbiAgICBcclxuICAgIHZhciBsaW5lID0gbGluZUdlbmVyYXRvcihzY29yZXMpO1xyXG4gICAgXHJcbiAgICAvLyBDcmVhdGUgYSBwYXRoIGVsZW1lbnQgYW5kIHNldCBpdHMgZCBhdHRyaWJ1dGVcclxuICAgIGQzLnNlbGVjdCgnZycpXHJcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAuYXR0cignZCcsIGxpbmUpO1xyXG59KTsiXSwiZmlsZSI6Im5iYS1ncmFwaHMuanMifQ==
