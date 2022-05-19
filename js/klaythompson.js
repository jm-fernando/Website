//Set the dimensions and margins of the graph
const kt_margin = {top: 30, right: -700, bottom: 70, left: 600},
    kt_width = 650 - kt_margin.left - kt_margin.right,
    kt_height = 400 - kt_margin.top - kt_margin.bottom;

//Append the svg object to the body of the page
const kt_svg = d3.select("#klay-page")
    .append("svg")
    .attr("width", kt_width + kt_margin.left + kt_margin.right + 800)
    .attr("height", kt_height + kt_margin.top + kt_margin.bottom)
    .append("g")
    .attr("transform", `translate(${kt_margin.left}, ${kt_margin.top})`);

//Initialize the X axis
const kt_x = d3.scaleBand()
    .range([ 0, kt_width ])
    .padding(1);
const kt_xAxis = kt_svg.append("g")
    .style("font", "14px times")
    .attr("transform", `translate(0, ${kt_height})`)

//Initialize the Y axis
const kt_y = d3.scaleLinear()
    .range([ kt_height, 0]);
const kt_yAxis = kt_svg.append("g")
    .style("font", "14px times")
    .attr("class", "myYaxis")

//Initialize the tooltip
const kt_tooltip = d3.select("#klay-page")
    .append("kt_tooltip")
    .attr("class", "tooltip")
    .style("opacity", 0);

//Creating side note for Klay's injuries
kt_svg.append("text")
    .attr("transform", "translate(-10, 290)")
    .attr("x", 100)
    .attr("y", 50)
    .attr("font-size", "10px")
    .text("*Thompson did not play during the 2019-2020 and 2020-2021 seasons due to injury")


//Creates / updates the plot for a given variable:
function kt_update(selectedVar) {

    //Parse the Data
    d3.csv("js/data/klaystats.csv").then(function(data) {

        //X axis
        kt_x.domain(data.map(function(d) { return d.KTSeason; }))
        kt_xAxis.transition().duration(1000).call(d3.axisBottom(kt_x))

        //Y axis
        kt_y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
        kt_yAxis.transition().duration(1000).call(d3.axisLeft(kt_y));

        //Map data to existing circle
        const kt_ln = kt_svg.selectAll(".myLine")
            .data(data)
            
        //Update lines
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


        //Map data to existing circle and implement tooltip
        const kt_circ = kt_svg.selectAll("circle")
            .data(data)
            .on("mouseover", (event, d) => {
                kt_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                kt_tooltip.html(`${d[selectedVar]}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", _ => {
                kt_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("mousemove", event => {
                kt_tooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px")
            })

        //Update bars
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

//Initialize plot
kt_update('KTPTS')
