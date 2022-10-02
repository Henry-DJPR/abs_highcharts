//Module Imports
var Highcharts = require("highcharts");

//Functions
function makeChart(data, target) {
  const series = data.data.dataSets[0].series;
  var tidySeries = [];

  for (const i in series) {
    var currentSeries = [];
    for (const j in series[i].observations) {
      currentSeries.push(series[i].observations[j][0]);
    }
    tidySeries.push({
      name: i,
      data: currentSeries,
    });
  }
  console.log(tidySeries);

  const chart = Highcharts.chart(target, {
    chart: {
      type: "spline",
    },
    title: {
      text: data.data.structure.name,
    },
    caption: {
      text: data.data.structure.description,
    },
    yAxis: {
      title: {
        text:
          data.data.structure.attributes.dataSet[0].values["0"].name +
          " (" +
          data.data.structure.attributes.dataSet[1].values["0"].name +
          ")",
      },
    },
    series: tidySeries,
    credits: {
      enabled: false,
    },
  });
}

// Fetch data
fetch(
  "https://api.data.abs.gov.au/data/ABS,MERCH_EXP,1.0.0/0+1+2+3+4+5+6+7+8+9+TOT.TOT.TOT.M?startPeriod=2022-01&format=jsondata",
  {
    headers: {
      Accept: "application/json",
    },
  }
)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    makeChart(data, "chartHolster");
  });

// Define data attributes and clean data
// var absMeta = absData.data.structure;
// var absName = absMeta.name;
