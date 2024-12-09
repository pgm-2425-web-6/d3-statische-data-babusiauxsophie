import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function circleChart(selector, data) {
    const svgWidth = 1500;
    const svgHeight = 400;

    const svg = d3.select(selector)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    const radiusScale = d3.scalePow()
        .exponent(0.8)
        .domain([0, d3.max(data, d => d.tweets)])
        .range([10, 80]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("padding", "5px 10px")
        .style("background", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("border-radius", "5px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("opacity", 0);

    const circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => (i + 1) * (svgWidth / (data.length + 1)))
        .attr("cy", svgHeight / 2)
        .attr("r", d => radiusScale(d.tweets))
        .attr("fill", (d, i) => colorScale(i))
        .on("mouseover", function(event, d) {
            tooltip
                .style("opacity", 1)
                .html(`Tweets: ${d.tweets}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");

            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", radiusScale(d.tweets) + 10);
        })
        .on("mouseout", function(event, d) {
            tooltip.style("opacity", 0);

            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", radiusScale(d.tweets));
        });

    svg.selectAll(".circle-text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => (i + 1) * (svgWidth / (data.length + 1)))
        .attr("y", svgHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.month)
        .style("font-size", "12px")
        .style("fill", "white");
}
