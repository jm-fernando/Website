//Setting the dimensions and margins of the graph
const margin6 = {top: 10, right: -10, bottom: 30, left: 10},
    width6 = 460 - margin6.left - margin6.right,
    height6 = 400 - margin6.top - margin6.bottom;

//Appending the svg object to the body of the page
const svg6 = d3.select("#page-2")
    .append("svg")
    .attr("width", width6 + margin6.left + margin6.right + 1200)
    .attr("height", height6 + margin6.top + margin6.bottom)
    .append("g")
    .attr("transform", `translate(${margin6.left},${margin6.top})`);

//Creating title for page
svg6.append("text")
    .attr("transform", "translate(-10, -20)")
    .attr("x", 60)
    .attr("y", 22)
    .attr("font-size", "18px")
    .text("Team Defensive Rating vs. League Average")

//Creating legend
svg6.append("circle").attr("cx",80).attr("cy",20).attr("r", 6).style("fill", "#FFC72C")
svg6.append("circle").attr("cx",220).attr("cy",20).attr("r", 6).style("fill", "#1D428A")
svg6.append("text").attr("x", 90).attr("y", 20).text("Coach Jackson").style("font-size", "12px").attr("alignment-baseline","middle")
svg6.append("text").attr("x", 230).attr("y", 20).text("NBA Average").style("font-size", "12px").attr("alignment-baseline","middle")

//Read the data
d3.csv("js/data/mj_vs_nba_drtg.csv").then(function(data) {

    //List of subgroups / header of the csv files
    const groups6 = data.map(d => d.season)

    console.log(groups6)

    // Add X axis
    const x6 = d3.scaleBand()
        .domain(groups6)
        .range([0, width6])
    svg6.append("g")
        .attr("transform", `translate(0, ${height6})`)
        .call(d3.axisBottom(x6));

    // Add Y axis
    const y6 = d3.scaleLinear()
        .domain([110, 90])
        .range([height6, 0 ]);
    svg6.append("g")
        .call(d3.axisLeft().scale(y6).ticks(5));

    // Add the line for MJ's progress
    svg6.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#FFC72C")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x6(d.season))
            .y(d => y6(d.mjdrtg))
        )

    // Add the line for NBA's progress
    svg6.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#1D428A")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x6(d.season))
            .y(d => y6(d.nbadrtg))
        )


    // Add the points for MJ
    svg6.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x6(d.season))
        .attr("cy", d => y6(d.mjdrtg))
        .attr("r", 5)
        .attr("fill", "#26282A")

    // Add the points for NBA
    svg6.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x6(d.season))
        .attr("cy", d => y6(d.nbadrtg))
        .attr("r", 5)
        .attr("fill", "#26282A")
})