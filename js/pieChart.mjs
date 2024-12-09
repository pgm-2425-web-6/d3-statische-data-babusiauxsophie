import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function pieChart(selector, data) {
    const svgWidth = 500;
    const svgHeight = 500;
    const radius = Math.min(svgWidth, svgHeight) / 2;

    const svg = d3.select(selector)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
        .value(d => d.tweets)
        .sort(null);

    const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    const arcs = svg.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => colorScale(i))
        .on("mouseover", function(event, d) {

            tooltip.style("opacity", 1)
                .html(`Month: ${d.data.month}<br>Tweets: ${d.data.tweets}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 30) + "px");
            
            d3.select(this).transition().duration(200).attr("d", d3.arc().outerRadius(radius).innerRadius(0));
        })
        .on("mouseout", function(event, d) {
            tooltip.style("opacity", 0);
            
            d3.select(this).transition().duration(200).attr("d", arc);
        });

    arcs.append('text')
        .attr('transform', function(d) {
            return 'translate(' + arc.centroid(d) + ')';
        })
        .attr('text-anchor', 'middle')
        .text(d => d.data.month)
        .style('fill', 'white')
        .style('font-size', '12px');


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
}
