// set the dimensions and margins of the graph
const dg_margin = {top: 30, right: 30, bottom: 70, left: 60},
    dg_width = 650 - dg_margin.left - dg_margin.right,
    dg_height = 400 - dg_margin.top - dg_margin.bottom;

// append the svg object to the body of the page
const dg_svg = d3.select("#page-5-dray")
    .append("svg")
    .attr("width", dg_width + dg_margin.left + dg_margin.right)
    .attr("height", dg_height + dg_margin.top + dg_margin.bottom)
    .append("g")
    .attr("transform", `translate(${dg_margin.left}, ${dg_margin.top})`);

// Initialize the X axis
const dg_x = d3.scaleBand()
    .range([ 0, dg_width ])
    .padding(1);
const dg_xAxis = dg_svg.append("g")
    .attr("transform", `translate(0, ${dg_height})`)

// Initialize the Y axis
const dg_y = d3.scaleLinear()
    .range([ dg_height, 0]);
const dg_yAxis = dg_svg.append("g")
    .attr("class", "myYaxis")

// A function that create / update the plot for a given variable:
function dg_update(selectedVar) {

    // Parse the Data
    d3.csv("js/data/draystats.csv").then(function(data) {

        // X axis
        dg_x.domain(data.map(function(d) { return d.DGSeason; }))
        dg_xAxis.transition().duration(1000).call(d3.axisBottom(dg_x))

        // Add Y axis
        dg_y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
        dg_yAxis.transition().duration(1000).call(d3.axisLeft(dg_y));

        // variable u: map data to existing circle
        const dg_ln = dg_svg.selectAll(".myLine")
            .data(data)
        // update lines
        dg_ln
            .join("line")
            .attr("class", "myLine")
            .transition()
            .duration(1000)
            .attr("x1", function(d) { return dg_x(d.DGSeason); })
            .attr("x2", function(d) { return dg_x(d.DGSeason); })
            .attr("x3", function(d) { return dg_x(d.DGSeason); })
            .attr("x4", function(d) { return dg_x(d.DGSeason); })
            .attr("y1", dg_y(0))
            .attr("y2", function(d) { return dg_y(d[selectedVar]); })
            .attr("y3", function(d) { return dg_y(d[selectedVar]); })
            .attr("y4", function(d) { return dg_y(d[selectedVar]); })
            .attr("stroke", "#1D428A")


        // variable u: map data to existing circle
        const dg_circ = dg_svg.selectAll("circle")
            .data(data)
        // update bars
        dg_circ
            .join("circle")
            .transition()
            .duration(1000)
            .attr("cx", function(d) { return dg_x(d.DGSeason); })
            .attr("cy", function(d) { return dg_y(d[selectedVar]); })
            .attr("r", 8)
            .attr("fill", "#FFC72C");


    })

}

// Initialize plot
dg_update('DGAST')
