//let d3 = require('d3');
//var svg= d3.select('#dona').append('svg');
//svg.append('rect').attr('x', 50).attr('y', 50).attr('width', 200).attr('height', 100) .attr('fill', 'green');
data = d3.csv("tab.csv");
console.log(data);
//var bar = d3.select('#dona').selectAll('rect').data(data).enter().append('rect').attr('width', function(d) {  return d; }).attr('height', barHeight - 1).attr('transform', function(d, i) {return "translate(0," + i * barHeight + ")";});

