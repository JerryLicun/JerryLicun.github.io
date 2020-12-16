// Reference: https://www.d3-graph-gallery.com/

// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
  
// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
    .center([135, -28])                // GPS of location to zoom on
    .scale(420)                       // This is like the zoom
    .translate([ width/2, height/2 ])


// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([12, 16, 20, 24, 28,32, 36,40])
  .range(d3.schemeOranges[9]);




// Listen to the slider?
d3.select("#mySlider").on("change", function(d){
  var selectedValue = this.value

})



// Load external data and boot
d3.queue()
  .defer(d3.json, "data/states.geojson")
  .defer(d3.csv, "data/start_data.csv", function(d) { data.set(d.code, +d.pop); })
  .await(ready);


function ready(error, topo) {

 

  // Draw the map
  svg.append("g")
    .selectAll("path")
    
    .data(topo.features)
    
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      .attr("x", 1300 )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.properties.STATE_NAME) || 0;
        return colorScale(d.total);
      })
       .attr("class", function(d){ return "city" } )
      .style("opacity", .8)

    }










function name_doc(name) {
	
var fil = "data/"
var abc = fil.concat(name)
var s2 = abc.concat(".csv");  //concat()


// Load external data and boot
d3.queue()
  .defer(d3.json, "data/states.geojson")
  .defer(d3.csv, s2, function(d) { data.set(d.code, +d.pop); })
  .await(ready);


function ready(error, topo) {
  // Draw the map
  svg.append("g")
    .selectAll("path")
    
    .data(topo.features)
    
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.properties.STATE_NAME) || 0;
        return colorScale(d.total);
      })
       .attr("class", function(d){ return "city" } )
      .style("opacity", .4)

   }
}




	
d3.csv("data/points.csv", function(data1) {
d3.json("data/states.geojson", function(data2){
    // Filter data
  //  data.features = data.features.filter( function(d){return d.properties.name=="France"} )
// Listen to the slider?




function update(nBin) {
    // Add circles:
    
    
    svg
      .selectAll("myCircles")
      .data(data1)
      .enter()
      .append("circle")
        .filter(function(d){return d.no === nBin})
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", 4)
        .attr("class", "circle")
        .style("fill", "8E0E0E")
        .attr("stroke", "080808")
        .attr("stroke-width", 3)
        .attr("fill-opacity", 1)
     
     

}

// Listen to the slider?
d3.select("#mySlider").on("change", function(d){
  selectedValue = this.value

  update(selectedValue)
	name_doc(selectedValue)
    
 if (selectedValue<30) {
				var month = "September"
				var day = selectedValue
				var year = "2019"
 } else if (selectedValue<61) {
  	var month = "October"
  	var day = selectedValue - 30
		var year = "2019"
}  else if (selectedValue<92) {
  	var month = "November"
  	var day = selectedValue - 61
		var year = "2019"
}  else if (selectedValue<122) {
  	var month = "December"
  	var day = selectedValue - 92
		var year = "2019"
} else if (selectedValue<153) {
  	var month = "January"
  	var day = selectedValue - 122
		var year = "2020"
}
    
  
  svg.append("text").attr("x", 5).attr("y", 270).text(day+"-"+month+"-"+year).style("font-size", "25px").attr("alignment-baseline","middle")
   
})




})

})

	