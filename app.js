//Module Imports
var Highcharts = require("highcharts");

//Functions
function makeChart(data, target) {
  //variables
  const series = data.data.dataSets[0].series;
  const names = data.data.structure.dimensions.series["0"].values;
  var tidySeries = [];
  var dateSeries = [];
  var nameSeries = [];

  // tidy dates
  for (const i in data.data.structure.dimensions.observation[0].values) {
    dateSeries.push(
      data.data.structure.dimensions.observation[0].values[i].name
    );
  }

  // Tidy names
  for (const i in names) {
    nameSeries.push(names[i].name);
  }

  // tidy data
  for (const i in series) {
    var currentSeries = [];
    var currentName = nameSeries[Number(i.split(":")[0])];
    for (const j in series[i].observations) {
      currentSeries.push(series[i].observations[j][0] * 1000);
    }
    if (currentName != "Total") {
      tidySeries.push({
        name: currentName,
        data: currentSeries,
      });
    }
  }
  console.log(tidySeries);

  const chart = Highcharts.chart(target, {
    chart: {
      type: "areaspline",
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    title: {
      text: data.data.structure.name,
    },
    caption: {
      text: data.data.structure.description,
    },
    yAxis: {
      title: {
        text: data.data.structure.attributes.dataSet[0].values["0"].name,
      },
    },
    xAxis: {
      categories: dateSeries,
    },
    series: tidySeries,
    credits: {
      enabled: false,
    },
  });
}

// fetch data and make chart function
function fetchAndChart(startDate) {
  fetch(
    "https://api.data.abs.gov.au/data/ABS,MERCH_EXP,1.0.0/0+1+2+3+4+5+6+7+8+9+TOT.TOT.TOT.M?startPeriod=" +
      startDate +
      "&format=jsondata",
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
}

// Initial chart generation
fetchAndChart("2021-01");

// Dropdown event listener

document.getElementById("startDate").onchange = function () {
  var newDate = document.getElementById("startDate").value;
  fetchAndChart(newDate);
};
