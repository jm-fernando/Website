//Setting the dimensions and margins of the graph
const margin4 = {top: 10, right: 30, bottom: 30, left: 60},
    width4 = 460 - margin4.left - margin4.right,
    height4 = 400 - margin4.top - margin4.bottom;

//Appending the svg object to the body of the page
const svg4 = d3.select("#page-2")
    .append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
    .append("g")
    .attr("transform", `translate(${margin4.left},${margin4.top})`);

//Creating title for page
svg4.append("text")
    .attr("transform", "translate(-10, -20)")
    .attr("x", 60)
    .attr("y", 22)
    .attr("font-size", "18px")
    .text("Team Points Per Game vs. League Average")

//Creating legend
svg4.append("circle").attr("cx",80).attr("cy",20).attr("r", 6).style("fill", "#FFC72C")
svg4.append("circle").attr("cx",220).attr("cy",20).attr("r", 6).style("fill", "#1D428A")
svg4.append("text").attr("x", 90).attr("y", 20).text("Coach Jackson").style("font-size", "12px").attr("alignment-baseline","middle")
svg4.append("text").attr("x", 230).attr("y", 20).text("NBA Average").style("font-size", "12px").attr("alignment-baseline","middle")

//Creating tooltip
const mjvsnbappg_tooltip = d3.select("#page-2")
    .append("mjvsnbappg_tooltip")
    .attr("class", "tooltip")
    .style("opacity", 0);

//Read the data
d3.csv("js/data/mj_vs_nba_ppg.csv").then(function(data) {

    //List of subgroups / header of the csv files
    const groups4 = data.map(d => d.season)

    console.log(groups4)

    // Add X axis
    const x4 = d3.scaleBand()
        .domain(groups4)
        .range([0, width4])
    svg4.append("g")
        .attr("transform", `translate(0, ${height4})`)
        .call(d3.axisBottom(x4));

    // Add Y axis
    const y4 = d3.scaleLinear()
        .domain([90, 110])
        .range([height4, 0 ]);
    svg4.append("g")
        .call(d3.axisLeft().scale(y4).ticks(5));

    // Add the line for MJ's progress
    svg4.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#FFC72C")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
                .x(d => x4(d.season))
                .y(d => y4(d.mjppg))
        )

    // Add the line for NBA's progress
    svg4.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#1D428A")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x4(d.season))
            .y(d => y4(d.nbappg))
        )


    // Add the points for MJ
    svg4.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x4(d.season))
        .attr("cy", d => y4(d.mjppg))
        .attr("r", 5)
        .attr("fill", "#26282A")
        .on("mouseover", (event, d) => {
            mjvsnbappg_tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            mjvsnbappg_tooltip.html(`${d.mjppg}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", _ => {
            mjvsnbappg_tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("mousemove", event => {
            mjvsnbappg_tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px")
        })

    // Add the points for NBA
    svg4.append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x4(d.season))
        .attr("cy", d => y4(d.nbappg))
        .attr("r", 5)
        .attr("fill", "#26282A")
        .on("mouseover", (event, d) => {
            mjvsnbappg_tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            mjvsnbappg_tooltip.html(`${d.nbappg}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", _ => {
            mjvsnbappg_tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("mousemove", event => {
            mjvsnbappg_tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px")
        })
    })