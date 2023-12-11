import * as d3 from 'd3';

export function clearChart() {
    console.log("Wiping D3 chart...")
    d3.select("#teamChart").selectAll("*").remove();
}

function setHeader(data, average) {
    var div = document.getElementById("teamChart");
    div.innerHTML += `<h2>${data.full_name}</h2>`;
    div.innerHTML += `<p>Season average: ${average} points</p>`
}

export function drawChart(data) {
    // Unpack response object
    var metadata = data["meta"];
    var stats = data["stats"];
    var lineColor = metadata.line_color;
    var backgroundColor = metadata.background_color;

    var ppg = stats.map(({ points }) => parseInt(points));
    var averagePPG = ppg.reduce((a, b) => a + b, 0) / ppg.length;

    setHeader(metadata, averagePPG);

    // Chart metadata
    var margin = { top: 25, right: 30, bottom: 30, left: 60 },
        width = 1500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Create empty SVG to append details into
    var svg = d3.select("#teamChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleTime()
        .domain(d3.extent(stats, function (d) { return Date.parse(d.date) }))
        .range([0, width])

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Y axis
    var y = d3.scaleLinear()
        .domain([50, 150])
        .range([height, 0])

    svg.append("g")
        .call(d3.axisLeft(y));

    // Tooltip
    var tooltip = d3.select("#teamChart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    var mouseover = function(d) {
        tooltip
        .style("opacity", 1)
    }

    var mousemove = function(d) {
        tooltip
        .html("Opponent: " + d.opponent)
        .style("left", (d3.pointer(this)[0]+90) + "px") 
        .style("top", (d3.pointer(this)[1]) + "px")
    }

    var mouseleave = function(d) {
        tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

    // Line it up!
    svg.append("path")
        .datum(stats)
        .attr("fill", "none")
        .attr("stroke", lineColor)
        .attr("stroke-width", 3.5)
        .attr("d", d3.line()
            .x(function (d) { return x(Date.parse(d.date)) })
            .y(function (d) { return y(parseInt(d.points)) })
        )
        .on("mouseover", mouseover )
        .on("mousemove", mousemove )
        .on("mouseleave", mouseleave ) 
}