import * as d3 from 'd3';

export function clearChart() {
    console.log("Wiping D3 chart...")
    d3.select("#teamChart").selectAll("*").remove();
}

export function drawChart(data) {
    // Get list of integers from API response
    var points = data.map(({ points }) => parseInt(points));
    var dates = data.map(({ date }) => Date.parse(date));

    console.log(dates)

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
        .domain(d3.extent(data, function (d) { return d3.timeParse("%Y-%m-%d")(d.date) }))
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

    // Line it up!
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d3.timeParse("%Y-%m-%d")(d.date)) })
            .y(function (d) { return y(parseInt(d.points)) })
        )
}