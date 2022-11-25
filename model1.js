var createGraph1 = function(target, game)
{
    var screen = {width:400,height: 200};

    //how much space will be on each side off graph
      var margins = {top:50, bottom:50, left:50, right:50};

    //generated how much space the graph will take up
    var graph =
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom
    };

     var svgScreen =   d3.select(target)
                        .attr("width", graph.width)
                        .attr("height", graph.height)
                        .style("pointer-events", "all")


    var yScale = d3.scaleLinear()
                    .domain([0, 1])
                    .range([graph.height, 0])
    //xscale is still messed up
    var xScale = d3.scaleLinear()
                    .domain([0,70])
                    .range([margins.left,graph.width])

    //drawing xAxis and label
    var xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(20)

    d3.select(svgScreen)
    .append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(" +margins.left+","+ graph.height+")")
    .call(xAxis)
    .append("text")
    .attr("x", (graph.width)/2) //middle of the xAxis
    .attr("y", "50") // a little bit below xAxis
    .text("Minutes");

    //drawing yAxis and ylabel
    var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(10)

d3.select(svgScreen)
    .append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(50,20)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-100")
    .attr("y", "-50")
    .attr("text-anchor", "end")
    .attr("text-color","black")
    .text("Win Probability")

var dataset = d3.nest()
                .key(function(d) {return d.GameID})
                .entries(game);

 d3.select(svgSreen)
        .selectAll(".line")
        .append("g")
        .attr("class", "line")
        .data(dataset)
        .enter()
        .append("path")
        .attr("d", function(d){
                return d3.line()
                        .x(function(d) {return xScale(d.OldMinutesRemaining)} )
                        .y(function(d) {return yScale(d.WinProb)})(d.values)
                })

        .attr("fill", "none")
        .attr("stroke","red")
        .attr("stroke-width",1)

}

var model1Promise = d3.json("model1.json")

model1Promise.then(function (game) {
    console.log(game);
    console.log(game[1].GameID);
    createGraph1("#svgSpread1", game);


}, function(error)
{

  console.log(error);
})

