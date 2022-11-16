//start off
var model2Promise = d3.json("model2.json")
model2Promise.then(function(game)
{
    console.log(game);
    console.log(game[1].GameID);
    createGraph1("#svgSpread2", game);
}, function(error)
{

  console.log(error);
})

var createGraph1 = function(target, game)
{
    var screen = {width:1000,height: 675};

    //how much space will be on each side off graph
      var margins = {top:45,bottom:40,left:50,right:50};

    //generated how much space the graph will take up
    var graph =
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }

     var svgScreen =   d3.select(target)
                        .attr("width", graph.width)
                        .attr("height", graph.height)
                        .style("pointer-events", "all")


    var yScale = d3.scaleLinear()
                    .domain([0, 1])
                    .range([graph.height, 0])
    //xscale is still messed up
    var xScale = d3.scaleLinear()
                    .domain([0,75])
                    .range([margins.left,graph.width])

    //drawing xAxis and label
    xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(20)

    d3.select(target)
    .append("g")
    .attr("class", "xaxis")
    .call(xAxis)
    .append("text")
    .attr("x", (graph.width)/2) //middle of the xAxis
    .attr("y", "50") // a little bit below xAxis
    .text("Minutes")

    //drawing yAxis and ylabel
    yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)

d3.select(target)
    .append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(50,20)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-100")
    .attr("y", "-50")
    .attr("text-anchor", "end")
    .text("Win Probability")
var dataset = d3.nest()
                .key(d=>d.GameID)
                .entries(game)
 d3.select(target)
        .selectAll(".line")
        .append("g")
        .attr("class", "line")
        .data(dataset)
        .enter()
        .append("path")
        .attr("d", function(d){
                return d3.line()
                        .x( d=> xScale(d.MinutesRemaining))
                           .y(d=> yScale(d.WinProb))
                           (d.values)


                })

        .attr("fill", "none")
        .attr("stroke","black")
        .attr("stroke-width",1)

}

var drawLine = function(target, data)
{
    console.log(data)
    console.log(typeof(data))

}
