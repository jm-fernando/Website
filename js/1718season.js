//Setting drawGraph function
var drawGraph = function(){

    //Set values for color and for how many symbols are highlighted as wins and losses
    var percentNumber = 58;
    var courtFill = "#ff0000";
    var courtFillActive = "#1D428A";
    var svgBackgroundColor = '#FFC72C';

    const width = 450;
    const height = 450;

    //Appending the svg object to the body of the page
    var svg = d3.select('#seveneight-season')
        .append('svg')
        .attr("width", 550)
        .attr("height", 480)
        .style('background-color', svgBackgroundColor);


    //Appending the svg object to the body of the page
    var court = svg.append("defs")
        .append("g")
        .attr("id","courtIcon");

    //Appending the court image
    court
        .append("path")
        .attr("d","M0,79.175v353.65h512V79.175H0z\n" +
            "  M263.918,190.513c32.659,3.926,58.062,31.787,58.062,65.487\n" +
            "\t\t\tc0,33.7-25.403,61.561-58.062,65.487V190.513z M15.835,148.085C71.817,152.154,116.124,198.998,116.124,256\n" +
            "\t\t\tS71.817,359.847,15.835,363.915V148.085z M248.082,321.487c-32.659-3.926-58.062-31.787-58.062-65.487\n" +
            "\t\t\tc0-33.7,25.403-61.561,58.062-65.487V321.487z M248.082,174.575c-41.411,3.996-73.897,38.984-73.897,81.425\n" +
            "\t\t\ts32.486,77.428,73.897,81.425v79.565H15.835v-37.208c64.72-4.098,116.124-58.045,116.124-123.782S80.555,136.317,15.835,132.218\n" +
            "\t\t\tV95.01h232.247V174.575z M496.165,363.916c-55.982-4.069-100.289-50.913-100.289-107.915c0-57.002,44.307-103.848,100.289-107.916\n" +
            "\t\t\tV363.916z M496.165,132.218c-64.72,4.098-116.124,58.045-116.124,123.782s51.404,119.683,116.124,123.782v37.208H263.918v-79.565\n" +
            "\t\t\tc41.411-3.996,73.897-38.984,73.897-81.425s-32.486-77.428-73.897-81.425V95.01h232.247V132.218z")
        .attr("transform", "translate(0,0) scale(.055)");

    //Setting number or rows, columns, and cells to achieve desired number (82)
    var numRows = 10;
    var numCols = 11;
    var numCells = 82;

    //X and Y axis scales
    var y = d3.scaleBand()
        .range([0,400])
        .domain(d3.range(numRows));

    var x = d3.scaleBand()
        .range([0, 400])
        .domain(d3.range(numCols));

    //Data is array of numbers for each cell in the grid
    data = d3.range(numCells);

    //Container to hold the grid
    var container = svg.append("g")
        .attr("transform", "translate(70,70)");

    container.selectAll("use")
        .data(data)
        .enter().append("use")
        .attr("xlink:href", "#courtIcon")
        .transition()
        .duration(500)
        .attr("id", function(d){return "id"+d;})
        .attr('x', function(d){return x(d%numCols);})
        .attr('y', function(d){return y(Math.floor(d/numCols));})
        .attr('fill', function(d){return d < percentNumber ? courtFillActive : courtFill;})
        .style('stroke', 'black');

}

//Call function to draw the graph
drawGraph();