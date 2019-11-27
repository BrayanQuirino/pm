
let data;
(async function(){
    data = await d3.csv('/public/tab.csv');
    svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
        .attr('id', function(d){return d.Periodo;})
        .attr('cx', function(d){return 20*d.i;})
        .attr('cy', function(d){return 5*d.Total;})
        .attr('r', function(d){return d.Total;})
        .attr('fill', function(d){return 'rgb(125,'+d.Total*100+','+d.Total*200+',100)';})
    .append('svg:title')
        .text(function(d){return 'Circle: '+d.Periodo;});
})()
const svg= d3.select('#dona').append('svg')
            .attr('width',500)
            .attr('height',500)
            .style('background-color', 'green');