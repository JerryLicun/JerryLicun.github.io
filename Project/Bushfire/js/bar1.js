// Reference: https://www.d3-graph-gallery.com/

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("data/bar1.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.month)}).keys()

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 550000])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(d3.schemeSet2);

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)




  // ----------------
  // Highlight a specific subgroup when hovered
  // ----------------

  

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .attr("class", function(d){ return "myRect " + d.key }) // Add a class to each subgroup: their name
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.month); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
        .attr("stroke", "grey")


})


// Add the lable and legend

  svg.append("circle").attr("cx",30).attr("cy",0).attr("r", 6).style("fill", "#B3DD75")
  svg.append("circle").attr("cx",30).attr("cy",30).attr("r", 6).style("fill", "#E79FCE")
  svg.append("circle").attr("cx",30).attr("cy",60).attr("r", 6).style("fill", "#9FB1D4")
  svg.append("circle").attr("cx",30).attr("cy",90).attr("r", 6).style("fill", "#F8A180")
  svg.append("circle").attr("cx",30).attr("cy",120).attr("r", 6).style("fill", "#80CCB6")
 
 
  svg.append("text").attr("x", 45).attr("y", 0).text("Jan-20").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 45).attr("y", 30).text("Dec-19").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 45).attr("y", 60).text("Nov-19").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 45).attr("y", 90).text("Oct-19").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 45).attr("y", 120).text("Sept-19").style("font-size", "15px").attr("alignment-baseline","middle")
