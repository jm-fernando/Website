// set the dimensions and margins of the graph
const kt_margin = {top: 30, right: 30, bottom: 70, left: 60},
    kt_width = 650 - kt_margin.left - kt_margin.right,
    kt_height = 400 - kt_margin.top - kt_margin.bottom;

// append the svg object to the body of the page
const kt_svg = d3.select("#page-5-klay")
    .append("svg")
    .attr("width", kt_width + kt_margin.left + kt_margin.right)
    .attr("height", kt_height + kt_margin.top + kt_margin.bottom)
    .append("g")
    .attr("transform", `translate(${kt_margin.left}, ${kt_margin.top})`);

// Initialize the X axis
const kt_x = d3.scaleBand()
    .range([ 0, kt_width ])
    .padding(1);
const kt_xAxis = kt_svg.append("g")
    .attr("transform", `translate(0, ${kt_height})`)

// Initialize the Y axis
const kt_y = d3.scaleLinear()
    .range([ kt_height, 0]);
const kt_yAxis = kt_svg.append("g")
    .attr("class", "myYaxis")

//Creating title for page
kt_svg.append("text")
    .attr("transform", "translate(-10, 290)")
    .attr("x", 100)
    .attr("y", 50)
    .attr("font-size", "10px")
    .text("*Thompson did not play during the 2019-2020 and 2020-2021 seasons due to injury")


// A function that create / update the plot for a given variable:
function kt_update(selectedVar) {

    // Parse the Data
    d3.csv("js/data/klaystats.csv").then(function(data) {

        // X axis
        kt_x.domain(data.map(function(d) { return d.KTSeason; }))
        kt_xAxis.transition().duration(1000).call(d3.axisBottom(kt_x))

        // Add Y axis
        kt_y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
        kt_yAxis.transition().duration(1000).call(d3.axisLeft(kt_y));

        // variable u: map data to existing circle
        const kt_ln = kt_svg.selectAll(".myLine")
            .data(data)
        // update lines
        kt_ln
            .join("line")
            .attr("class", "myLine")
            .transition()
            .duration(1000)
            .attr("x1", function(d) { return kt_x(d.KTSeason); })
            .attr("x2", function(d) { return kt_x(d.KTSeason); })
            .attr("x3", function(d) { return kt_x(d.KTSeason); })
            .attr("x4", function(d) { return kt_x(d.KTSeason); })
            .attr("y1", kt_y(0))
            .attr("y2", function(d) { return kt_y(d[selectedVar]); })
            .attr("y3", function(d) { return kt_y(d[selectedVar]); })
            .attr("y4", function(d) { return kt_y(d[selectedVar]); })
            .attr("stroke", "#1D428A")


        // variable u: map data to existing circle
        const kt_circ = kt_svg.selectAll("circle")
            .data(data)
        // update bars
        kt_circ
            .join("circle")
            .transition()
            .duration(1000)
            .attr("cx", function(d) { return kt_x(d.KTSeason); })
            .attr("cy", function(d) { return kt_y(d[selectedVar]); })
            .attr("r", 8)
            .attr("fill", "#FFC72C");


    })

}

// Initialize plot
kt_update('KTPTS')
