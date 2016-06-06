var svg, grossScale;
var countries = [];
var zero_countries = [];

var width = 1020,         // dimensions of the visualization 
    height = 1060,
    padding = 3,         // separation between same-color circles
    clusterPadding = 6, // separation between different-color circles
    maxRadius  = 17,      // maximum size of a circle
    medRadius = 13,     // medium radius of a circle
    minRadius = 8,     // minimum size of a circle
    margin = 50;

d3.csv("datasets/2008data.csv", function(data) {
    for (var key in data) {
        console.log(data[key]);
        if ((parseInt(data[key].Refugee) || 0)==0) {
            zero_countries.push(data[key]);
        } else {
            countries.push(data[key]);
        }
    }
    countries.forEach(function(d) {
        d.Refugee = +d.Refugee; // cast the dollar amount from string to integer
        d.Year = +d.Year; // create a new category in the rdata called Decade 
        d.Continent = d.Continent; //continent of country for color classification
        
        if(d.Continent == "Asia")
            color = d3.rgb("#6600ff");
        
        else if(d.Continent == "Europe")
            color = d3.rgb("#0099ff");
        
        else if(d.Continent == "Africa")
            color = d3.rgb("#339966");
        
        else if(d.Continent == "North America")
            color = d3.rgb("#ff66cc");
        
        else if(d.Continent == "South America")
            color = d3.rgb("#ffcc66");
        
        else if(d.Continent == "Oceania")
            color = d3.rgb("#000000");
        
        else(d.Continent == "Australia")
            color = d3.rgb("#ff0000");
        
    });
    initialize("Refugee");
    addScale();
});

d3.csv("datasets/2010data.csv", function(data2) {
    for (var key in data2) {
        console.log(data2[key]);
        if ((parseInt(data2[key].Refugee) || 0)==0) {
            zero_countries.push(data2[key]);
        } else {
            countries.push(data2[key]);
        }
    }
    countries.forEach(function(d) {
        d.Refugee = +d.Refugee; // cast the dollar amount from string to integer
        d.Year = +d.Year; // create a new category in the rdata called Decade 
        d.Continent = d.Continent; //continent of country for color classification
        
        if(d.Continent == "Asia")
            color = d3.rgb("#6600ff");
        
        else if(d.Continent == "Europe")
            color = d3.rgb("#0099ff");
        
        else if(d.Continent == "Africa")
            color = d3.rgb("#339966");
        
        else if(d.Continent == "North America")
            color = d3.rgb("#ff66cc");
        
        else if(d.Continent == "South America")
            color = d3.rgb("#ffcc66");
        
        else if(d.Continent == "Oceania")
            color = d3.rgb("#000000");
        
        else(d.Continent == "Australia")
            color = d3.rgb("#ff0000");
        
    });
    initialize("Refugee");
    addScale();
});

d3.csv("datasets/2012data.csv", function(data3) {
    for (var key in data3) {
        console.log(data3[key]);
        if ((parseInt(data3[key].Refugee) || 0)==0) {
            zero_countries.push(data3[key]);
        } else {
            countries.push(data3[key]);
        }
    }
    countries.forEach(function(d) {
        d.Refugee = +d.Refugee; // cast the dollar amount from string to integer
        d.Year = +d.Year; // create a new category in the rdata called Decade 
        d.Continent = d.Continent; //continent of country for color classification
        
        if(d.Continent == "Asia")
            color = d3.rgb("#6600ff");
        
        else if(d.Continent == "Europe")
            color = d3.rgb("#0099ff");
        
        else if(d.Continent == "Africa")
            color = d3.rgb("#339966");
        
        else if(d.Continent == "North America")
            color = d3.rgb("#ff66cc");
        
        else if(d.Continent == "South America")
            color = d3.rgb("#ffcc66");
        
        else if(d.Continent == "Oceania")
            color = d3.rgb("#000000");
        
        else(d.Continent == "Australia")
            color = d3.rgb("#ff0000");
        
    });
    initialize("Refugee");
    addScale();
});

d3.csv("datasets/2014data.csv", function(data4) {
    for (var key in data4) {
        console.log(data4[key]);
        if ((parseInt(data4[key].Refugee) || 0)==0) {
            zero_countries.push(data4[key]);
        } else {
            countries.push(data4[key]);
        }
    }
    countries.forEach(function(d) {
        d.Refugee = +d.Refugee; // cast the dollar amount from string to integer
        d.Year = +d.Year; // create a new category in the rdata called Decade 
        d.Continent = d.Continent; //continent of country for color classification
        
        if(d.Continent == "Asia")
            color = d3.rgb("#6600ff");
        
        else if(d.Continent == "Europe")
            color = d3.rgb("#0099ff");
        
        else if(d.Continent == "Africa")
            color = d3.rgb("#339966");
        
        else if(d.Continent == "North America")
            color = d3.rgb("#ff66cc");
        
        else if(d.Continent == "South America")
            color = d3.rgb("#ffcc66");
        
        else if(d.Continent == "Oceania")
            color = d3.rgb("#000000");
        
        else(d.Continent == "Australia")
            color = d3.rgb("#ff0000");
        
    });
    initialize("Refugee");
    addScale();
});

/* This function will create the visualization based on the category selected by the user */
function initialize(category){
    
    d3.selectAll("svg").remove(); // first we remove the exising visualization, if there is one
        // the code below will count number of distinct elements in the category 
        // recall that 'category' is a parameter passed to this function, and will
        // depend on which button was clicked in the menu. It could be "Studio" for example
        var categories = d3.map(countries, function(d) { return d.category; });
        var m = 50;
        var n = countries.length; // total number of circles
            
        //var color = d3.scale.category20(); // this is a scale used to map categories to colors// specifyng the colors of the continents
    
        var minGross = d3.min(countries, function(d){ return d.Refugee; });
        var maxGross = d3.max(countries, function(d){ return d.Refugee; });
        /* var radiusScale = d3.scale.linear()
            .domain([minGross, maxGross])
            .range([8,17]); */
        
        var clusters = new Array(m);
        
        var nodes = countries.map(function(currentValue, index) {
                
              if(currentValue.Population < 10000000) {r = 8} 
              else if(currentValue.Population > 10000000 && currentValue.Population <= 50000000) {r = 13}
              else{r = 17}
                 
             
              var i = currentValue[category], 
             // r = radiusScale(currentValue.Refugee),
              d = {cluster: i, 
                   radius: r, 
                   Country: currentValue.Country,
                   Continent: currentValue.Continent,
                   Refugee: currentValue.Refugee,
                   Year: currentValue.Year,
                   Population: currentValue.Population};
          // if this is the largest node for a category, add it to 'clusters' array
          if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
          return d;
        });
        
        var force = d3.layout.force()
            .nodes(nodes)
            .size([width, height])
            .gravity(0)
            .charge(0) //attractive force between nodes. Negative values makes nodes repel
            .on("tick", tick) 
            .start();
        // Create an SVG element of size width x height that contains the graph
        svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
         
        var circle = svg.selectAll("circle")
            .data(nodes)
            .enter().append("circle")   
            .attr("r", function(d) { if(d.Population < 10000000) {return radius = 8} 
                                     if(d.Population > 10000000 && d.Population <= 50000000) {return radius = 13}
                                     if(d.Population > 50000000) {return radius = 17}
                                     else {return d.radius}
                                   ;})

            .style("fill", function(d) { if(d.Continent == "Asia") return d3.rgb("#6600ff");
                                         if(d.Continent == "Europe") return d3.rgb("#0099ff");
                                         if(d.Continent == "Africa") return d3.rgb("#339966");
                                         if(d.Continent == "North America") return d3.rgb("#ff66cc");
                                         if(d.Continent == "South America") return d3.rgb("#ffcc66");
                                         if(d.Continent == "Oceania") return d3.rgb("#000000");
                                        }) // set the color of each circle 
        
        svg.selectAll("circle");
    
        // a simple tooltip from http://bl.ocks.org/biovisualize/1016860
        var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        /* If you want to put a box around the tooltip, comment out the following two lines
         * You may want to change the CSS style of the tooltip further to make it pretty */
        //.style("background-color", "lightgrey")
        //.style("color", "grey")                
        .style("width", "200px")
        .style("height", "60px")
        .style("background", "lightsteelblue")
        .style("border", "0px")
        .style("border-radius", "8px")          
        .style("font-family", "sans-serif"); 
        /* Adding mouseover functions to the tooltip so that it appears
         * only when the user's mouse is over a node, and text changes accordingly
         * to match the movie the user is hovering over
         */
        var div = d3.select("body").append("div")	
         .attr("class", "tooltip")				
         .style("opacity", 0);
    
        svg.selectAll("circle")
            .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9)
            div .html(d.Country + "<br />" + "Population: " + d.Population + "<br />" + "Refugees: " + d.Refugee +  "<br />" + "Year: " + d.Year)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
            })
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px")
                .style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
            });
     
        function tick(e) {
          circle
              .each(clusterGross(10*e.alpha*e.alpha))
              .each(collide(.0002))
              //.each(collide(.1))
              .attr("cx", function(d) { return d.x + 100; })

              .attr("cy", function(d) {if(category == "Continent" && d.Continent == "Oceania" && d.Year == 2014) {return d.y + -80}
                                       if(category == "Continent" && d.Continent == "South America" && d.Year == 2014) {return d.y + 90}
                                       if(category == "Continent" && d.Continent == "North America" && d.Year == 2014) {return d.y + 220}
                                       if(category == "Continent" && d.Continent == "Europe" && d.Year == 2014) {return d.y + 370}
                                       if(category == "Continent" && d.Continent == "Africa" && d.Year == 2014) {return d.y + 510}
                                       if(category == "Continent" && d.Continent == "Asia" && d.Year == 2014) {return d.y +650}
                                       if(category == "Continent" && (d.Year == 2008 || d.Year == 2010 || d.Year == 2012)) {return d.y + 2000}
                                       if(category == "Refugee" && d.Year == 2008) {return d.y + -40}
                                       if(category == "Refugee" && d.Year == 2010) {return d.y + 150}
                                       if(category == "Refugee" && d.Year == 2012) {return d.y + 350}
                                       if(category == "Refugee" && d.Year == 2014) {return d.y + 530}
                                        return d.y;
                                        })
        }
        
    
        function clusterGross(alpha) {
          return function(d) {
            var cluster = {x: grossScale(d.Refugee), 
                           y : (category == "Continent") ? 289 : 289,
                           radius: -d.radius};
              
            var k = .1 * Math.sqrt(d.radius);
            
            var x = d.x - cluster.x,
                y = d.y - cluster.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + cluster.radius;
            if (l != r) {
              l = (l - r) / l * alpha * k;
              d.x -= x *= l;
              d.y -= y *= l;
              cluster.x += x;
              cluster.y += y;
            }
          };
        }
        // Resolves collisions between d and all other circles.
        function collide(alpha) {
          var quadtree = d3.geom.quadtree(nodes);
          return function(d) {
            var r = d.radius + 17 + Math.min(padding, clusterPadding),
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.point.radius + 
                        (d.cluster === quad.point.cluster ? padding : clusterPadding);
                if (l < r) {
                  l = (l - r) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }
};

/* code adapted from https://bl.ocks.org/mbostock/3885304 */
function addScale(){
    svg.selectAll(".legend").remove();
    grossScale = d3.scale.log().domain([300, 1e7]).range([0, width]);

    
    var xAxis = d3.svg.axis()
        .scale(grossScale)
        .orient("bottom")
        .ticks(12, " ");
    grossScale.domain([d3.min(countries, function(d) { return d.Refugee; }), 
              d3.max(countries, function(d) { return d.Refugee; })]);
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+300+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2) + 150)
        .attr("y", 340)
        .style("text-anchor", "end")
        .text("Number of Refugees (2008)");
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+500+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2) + 150)
        .attr("y", 540)
        .style("text-anchor", "end")
        .text("Number of Refugees (2010)");
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+700+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2)+150)
        .attr("y", 740)
        .style("text-anchor", "end")
        .text("Number of Refugees (2012)");
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+910+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2) + 150)
        .attr("y", 950)
        .style("text-anchor", "end")
        .text("Number of Refugees (2014)");
        
    legend();
};
 
/* code adapted from https://bl.ocks.org/mbostock/3885304 */
function addScale2(){
     svg.selectAll(".legend").remove();
    grossScale = d3.scale.log().domain([300, 1e7]).range([0, width]);

    
    var xAxis = d3.svg.axis()
        .scale(grossScale)
        .orient("bottom")
        .ticks(12, " ");
    grossScale.domain([d3.min(countries, function(d) { return d.Refugee; }), 
              d3.max(countries, function(d) { return d.Refugee; })]);
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+250+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2))
        .attr("y", 290)
        .style("text-anchor", "center")
        .text("Oceania (2014)");
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+400+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2))
        .attr("y", 440)
        .style("text-anchor", "center")
        .text("South America (2014)");
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+550+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2))
        .attr("y", 590)
        .style("text-anchor", "center")
        .text("North America (2014)");
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+700+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2))
        .attr("y", 740)
        .style("text-anchor", "center")
        .text("Europe (2014)");
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+850+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2))
        .attr("y", 890)
        .style("text-anchor", "center")
        .text("Africa (2014)");
    
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(100,"+1000+")")
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", (width/2))
        .attr("y", 1050)
        .style("text-anchor", "center")
        .text("Asia (2014)");
    
    legend();
};

function genreClick(elem){
   var buttons = document.getElementsByClassName("menu-item");
    for(i = 0; i < buttons.length; ++i){
        buttons[i].style.backgroundColor="black";
    }
    elem.style.backgroundColor="orange";
    initialize("Continent");
    addScale2();
};

function grossClick(elem){
    var buttons = document.getElementsByClassName("menu-item");
    for(i = 0; i < buttons.length; ++i){
        buttons[i].style.backgroundColor="black";
    }
    elem.style.backgroundColor="orange";
    initialize("Refugee");
    addScale();
};

function legend(){
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 0)
       .attr("width", 10)
       .attr("height", 10)
       .attr("fill", "#339966")
       .style("stroke-size", "1px");
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", 100)
        .attr("y",10)
        .style("text-anchor", "end")
        .text("Africa");
    
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 20)
       .attr("width", 10)
       .attr("height", 10)
       .attr("fill", "#6600ff")
       .style("stroke-size", "1px");
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", 100)
        .attr("y", 30)
        .style("text-anchor", "end")
        .text("Asia");
    
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 40)
       .attr("width", 10)
       .attr("height", 10)
       .attr("fill", "#ff66cc")
       .style("stroke-size", "1px");
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", 120)
        .attr("y", 50)
        .style("text-anchor", "end")
        .text("North America");
    
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 60)
       .attr("width", 10)
       .attr("height", 10)
       .attr("fill", "#ffcc66")
       .style("stroke-size", "1px");
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", 120)
        .attr("y", 70)
        .style("text-anchor", "end")
        .text("South America");
    
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 80)
       .attr("width", 10)
       .attr("height", 10)
       .attr("fill", "#0099ff")
       .style("stroke-size", "1px");
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", 100)
        .attr("y", 90)
        .style("text-anchor", "end")
        .text("Europe");
    
    svg.append("rect")
       .attr("x", 0)
       .attr("y", 100)
       .attr("width", 10)
       .attr("height", 10)
       .attr("fill", "#000000")
       .style("stroke-size", "1px"); 
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", 100)
        .attr("y", 110)
        .style("text-anchor", "end")
        .text("Oceania");
    //Start of a Legend
    svg.append("rect")
        .attr("x", width-220)
        .attr("y", 0)
        .attr("width", 220)
        .attr("height", 130)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 8)
        .attr("cx", width-170)
        .attr("cy", 10)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-170)
        .attr("cy", 40)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 17)
        .attr("cx", width-170)
        .attr("cy", 80)
        .style("fill", "white");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width-20)
        .attr("y", 15)
        .style("text-anchor", "end")
        .text("1 to 10 Million");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width-20)
        .attr("y", 45)
        .style("text-anchor", "end")
        .text("10 to 50 Million");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width-20)
        .attr("y", 85)
        .style("text-anchor", "end")
        .text("Above 50 Million");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -100)
        .attr("y", 120)
        .style("text-anchor", "middle")
        .style("fill", "Green") 
        .attr("font-size", "20px")
        .text("Population"); 
}