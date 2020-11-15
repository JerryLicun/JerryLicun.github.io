// Reference: https://www.d3-graph-gallery.com/

// LICUN LIU -- 30901235
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg1 = d3.select("#example1")

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/line.csv", function(data) {

  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.code;})
    .entries(data);

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.Month - 0; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.Point; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    
 .range(['#BEC0C1','#E6CDA8','#B3DD75','#FBDE58','#E79FCE','#9FB1D4','#F8A180','#80CCB6	'])

  // Draw the line
  svg.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.Month); })
            .y(function(d) { return y(+d.Point); })
            (d.values)
        })
        
    // create a tooltip
    var Tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
	  .style("width","400px")
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        Tooltip
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        Tooltip
          .html("State: " + d.code  +"<br> Count of Bushfire points: " + d.Point )
          .style("left", (d3.mouse(this)[0]+70) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
      }  
        
       // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "myCircle")
        .attr("cx", function(d) { return x(d.Month) } )
        .attr("cy", function(d) { return y(d.Point) } )
        .attr("r", 5)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        

// Add the lable and legend
  svg.append("circle").attr("cx",30).attr("cy",0).attr("r", 6).style("fill", "#BEC0C1")
  svg.append("circle").attr("cx",30).attr("cy",30).attr("r", 6).style("fill", "#E6CDA8")
  svg.append("circle").attr("cx",30).attr("cy",60).attr("r", 6).style("fill", "#B3DD75")
  svg.append("circle").attr("cx",30).attr("cy",90).attr("r", 6).style("fill", "#FBDE58")
    svg.append("circle").attr("cx",30).attr("cy",120).attr("r", 6).style("fill", "#E79FCE")
  svg.append("circle").attr("cx",30).attr("cy",150).attr("r", 6).style("fill", "#9FB1D4")
  svg.append("circle").attr("cx",30).attr("cy",180).attr("r", 6).style("fill", "#F8A180")
  svg.append("circle").attr("cx",30).attr("cy",210).attr("r", 6).style("fill", "#80CCB6")
 
 
  svg.append("text").attr("x", 45).attr("y", 0).text("ACT").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 45).attr("y", 30).text("NSW").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 45).attr("y", 60).text("NT").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 45).attr("y", 90).text("QLD").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 45).attr("y", 120).text("SA").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 45).attr("y", 150).text("TAS").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 45).attr("y", 180).text("VIC").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 45).attr("y", 210).text("WA").style("font-size", "15px").attr("alignment-baseline","middle")


  svg.append("text").attr("x", 345).attr("y", 373).text("Month").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", -55).attr("y",-1).text("Bushfire").style("font-size", "15px").attr("alignment-baseline","middle")
    
  
})

