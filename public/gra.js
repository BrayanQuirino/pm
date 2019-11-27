let data =d3.csv('/public/tab.csv');
const svg= d3.select('#dona').append('svg')
            .attr('width',500)
            .attr('height',500)
            .style('background-color', 'green');
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
        .attr('periodo', function(d){return d.Periodo;})
        .attr('cx', function(d){return d.Total;})
        .attr('cy', function(d){return d.Total;})
        .attr('r', function(d){return d.Total;})
        .attr('fill', function(d){return 'gray';})
    .append('svg: title')
        .text(function(d){return 'Circle: '+d.periodo;});
