(function() {
    d3.select('body').style('background-color', 'white');
    const menorA5 = '#97EDBA',
          entre5Y2M = '#8FE039',
          entre2MY4M = '#45BF55',
          entre4MY6M = '#1F9C10',
          entre6MY8M= '#167F39',
          entre8MY10M = '#044C29',
          mayorA10M = '#00261C';
    var height = 600;
    var width = 900;
    var year=2000;
    var projection = d3.geo.mercator();
    var map = void 0;
    var mexico = void 0;
    var hover = function(d) {
        //console.log('d', d, 'event', event);
        var div = document.getElementById('tooltip');
        div.style.left = event.pageX +'px';
        div.style.top = event.pageY + 'px';
        div.innerHTML = d.properties.NAME_1;
    };
    var path = d3.geo.path().projection(projection);
    var svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    var title = svg.append("text")
        .attr("class", "title")
        .attr("dy", ".71em")
        .attr("x","730")
        .text(year);
    d3.json('/public/map/states.json', function(data) {
        var states = topojson.feature(data, data.objects.MEX_adm1);
        console.log('states: '+ JSON.stringify(states.features[0].properties.NAME_1));
        var b, s, t;
        projection.scale(1).translate([0, 0]);
        var b = path.bounds(states);
        var s = .9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
        projection.scale(s).translate(t);
        map = svg.append('g').attr('class', 'boundary');
        //d3.csv('/public/map/map'+year+'.csv',function(data){
        d3.csv('/public/map/map1990.csv', function(data){
            var year0 = d3.min(data, function(d) { return d.year; }),
            year1 = d3.max(data, function(d) { return d.year; });
            mexico = map.selectAll('path').data(states.features);
            //mexico[0][0].attr('fill',mayorA10M);
            window.focus();
            update();
            d3.select(window).on("keydown", function() {
                switch (d3.event.keyCode) {
                case 37: year = Math.max(year0, year - 5); break;
                case 39: year = Math.min(year1, year + 5); break;
                }
            update();
            });
            async function update() {
                //mexico = await map.selectAll('path').data(states.features);
                mexico.enter()
                .append('path')
                .attr('d', path)
                .attr('fill',menorA5)
                .on("mouseover", hover);
                if (busqueda(year)){
                    title.text(year);
                }else{
                    return;
                }
                for(i =0; i<data.length; i++){
                    data[i].population=+data[i].population;
                    data[i].year=+data[i].year;
                    let aux;
                    if(data[i].year==year){
                        if(i>31 && i<64){
                            aux=i-32
                        }else if(i>=64 && i<96){
                            aux=i-64;
                        }else if(i>=96 && i<128){
                            aux=i-96;
                        }else if(i>=128 && i<160){
                            aux=i-128;
                        }else{
                            aux=i;
                        }
                        if(data[i].population <=500000){
                            mexico[0][aux].attributes.fill.value= menorA5;
                        }else if(data[i].population >500000 && data[i].population <=2000000){
                            mexico[0][aux].attributes.fill.value= entre5Y2M;
                        }else if(data[i].population >2000000 && data[i].population <=4000000){
                            mexico[0][aux].attributes.fill.value= entre2MY4M;
                        }else if(data[i].population >4000000 && data[i].population <=6000000){
                            mexico[0][aux].attributes.fill.value= entre4MY6M;
                        }else if(data[i].population >6000000 && data[i].population <=8000000){
                            mexico[0][aux].attributes.fill.value= entre6MY8M;
                        }else if(data[i].population >8000000 && data[i].population <=10000000){
                            mexico[0][aux].attributes.fill.value= entre8MY10M;
                        }else if(data[i].population >10000000){
                            mexico[0][aux].attributes.fill.value= mayorA10M;
                        }
                    }
                }
                mexico.exit().remove();
            }
            async function busqueda(y){
                for(var z=0; z<data.length; z++){
                    data[z].year= await +data[z].year;
                    if(y == data[z].year){
                        return true;
                        break;
                    }else{
                        return false;
                        break;
                    }
                 }
            }
        })
    });

    })();