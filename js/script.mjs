import circleChart from "./circleChart.mjs";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.csv("./js/cleandata.csv").then(data => {
    console.log(data);

    const tweetCounts = d3.rollup(
        data,
        v => v.length,
        d => new Date(d.Date).toLocaleString("en-US", { month: "long" })
    );

    console.log(tweetCounts);
    const processedData = Array.from(tweetCounts, ([month, count]) => ({
        month,
        tweets: count,
        r: count * 2,
        color: "steelblue"
    }));

    circleChart("#circleChart", processedData);
});
