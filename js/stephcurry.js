// set the dimensions and margins of the graph
const sc_margin = {top: 30, right: 30, bottom: 70, left: 60},
    sc_width = 650 - sc_margin.left - sc_margin.right,
    sc_height = 400 - sc_margin.top - sc_margin.bottom;

// append the svg object to the body of the page
const sc_svg = d3.select("#steph-page")
    .append("svg")
    .attr("width", sc_width + sc_margin.left + sc_margin.right)
    .attr("height", sc_height + sc_margin.top + sc_margin.bottom)
    .append("g")
    .attr("transform", `translate(${sc_margin.left}, ${sc_margin.top})`);

// Initialize the X axis
const sc_x = d3.scaleBand()
    .range([ 0, sc_width ])
    .padding(1);
const sc_xAxis = sc_svg.append("g")
    .attr("transform", `translate(0, ${sc_height})`)

// Initialize the Y axis
const sc_y = d3.scaleLinear()
    .range([ sc_height, 0]);
const sc_yAxis = sc_svg.append("g")
    .attr("class", "myYaxis")

// Initialize the tooltip
const sc_tooltip = d3.select("#my_dataviz")
    .append("sc_tooltip")
    .attr("class", "tooltip")
    .style("opacity", 0);


// A function that create / update the plot for a given variable:
function sc_update(selectedVar) {

    // Parse the Data
    d3.csv("js/data/currystats.csv").then(function(data) {

        // X axis
        sc_x.domain(data.map(function(d) { return d.SCSeason; }))
        sc_xAxis.transition().duration(1000).call(d3.axisBottom(sc_x))

        // Add Y axis
        sc_y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
        sc_yAxis.transition().duration(1000).call(d3.axisLeft(sc_y));

        // variable u: map data to existing circle
        const sc_ln = sc_svg.selectAll(".myLine")
            .data(data)
        // update lines
        sc_ln
            .join("line")
            .attr("class", "myLine")
            .transition()
            .duration(1000)
            .attr("x1", function(d) { return sc_x(d.SCSeason); })
            .attr("x2", function(d) { return sc_x(d.SCSeason); })
            .attr("x3", function(d) { return sc_x(d.SCSeason); })
            .attr("x4", function(d) { return sc_x(d.SCSeason); })
            .attr("y1", sc_y(0))
            .attr("y2", function(d) { return sc_y(d[selectedVar]); })
            .attr("y3", function(d) { return sc_y(d[selectedVar]); })
            .attr("y4", function(d) { return sc_y(d[selectedVar]); })
            .attr("stroke", "#1D428A")


        // variable u: map data to existing circle
        const sc_circ = sc_svg.selectAll("circle")
            .data(data)
            .on("mouseover", (event, d) => {
                sc_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                sc_tooltip.html(`${d[selectedVar]}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", _ => {
                sc_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", event => {
                sc_tooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px")
            })
        // update bars
        sc_circ
            .join("circle")
            .transition()
            .duration(1000)
            .attr("cx", function(d) { return sc_x(d.SCSeason); })
            .attr("cy", function(d) { return sc_y(d[selectedVar]); })
            .attr("r", 8)
            .attr("fill", "#FFC72C");


    })

}

// Initialize plot
sc_update('SCPTS')
