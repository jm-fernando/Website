// set the dimensions and margins of the graph
const margin5 = {top: 10, right: -300, bottom: 30, left: 300},
    width5 = 460 - margin5.left - margin5.right,
    height5 = 400 - margin5.top - margin5.bottom;

// append the svg object to the body of the page
const svg5 = d3.select("#page-2")
    .append("svg")
    .attr("width", width5 + margin5.left + margin5.right + 1200)
    .attr("height", height5 + margin5.top + margin5.bottom)
    .append("g")
    .attr("transform", `translate(${margin5.left},${margin5.top})`);

//Creating title for page
svg5.append("text")
    .attr("transform", "translate(-10, -20)")
    .attr("x", 60)
    .attr("y", 22)
    .attr("font-size", "18px")
    .text("Team Offensive Rating vs. League Average")

svg5.append("circle")
    .attr("cx",80)
    .attr("cy",20)
    .attr("r", 6)
    .style("fill", "#FFC72C")

svg5.append("circle")
    .attr("cx",220)
    .attr("cy",20)
    .attr("r", 6)
    .style("fill", "#1D428A")

svg5.append("text")
    .attr("x", 90)
    .attr("y", 20)
    .text("Coach Jackson")
    .style("font-size", "12px")
    .attr("alignment-baseline","middle")

svg5.append("text")
    .attr("x", 230)
    .attr("y", 20)
    .text("NBA Average")
    .style("font-size", "12px")
    .attr("alignment-baseline","middle")

//Read the data
d3.csv("js/data/mj_vs_nba_ortg.csv").then(function(data) {

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups5 = data.map(d => d.season)

    console.log(groups5)

    // Add X axis
    const x5 = d3.scaleBand()
        .domain(groups5)
        .range([0, width5])
    svg5.append("g")
        .attr("transform", `translate(0, ${height5})`)
        .call(d3.axisBottom(x5));

    // Add Y axis
    const y5 = d3.scaleLinear()
        .domain([90, 110])
        .range([height5, 0 ]);
    svg5.append("g")
        .call(d3.axisLeft().scale(y5).ticks(5));

    // Add the line
    svg5.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#FFC72C")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x5(d.season))
            .y(d => y5(d.mjortg))
        )

    // Add the line
    svg5.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#1D428A")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x5(d.season))
            .y(d => y5(d.nbaortg))
        )


    // Add the points
    svg5.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x5(d.season))
        .attr("cy", d => y5(d.mjortg))
        .attr("r", 5)
        .attr("fill", "#26282A")

    // Add the points
    svg5.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x5(d.season))
        .attr("cy", d => y5(d.nbaortg))
        .attr("r", 5)
        .attr("fill", "#26282A")
})