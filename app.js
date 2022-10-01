//Module Imports
var Highcharts = require("highcharts");

//Initialise variables
var absData;

// Fetch data
// fetch(
//   "https://api.data.abs.gov.au/data/ABS,MERCH_EXP,1.0.0/0+1+2+3+4+5+6+7+8+9+TOT.TOT.TOT.M?startPeriod=2022-01&format=jsondata",
//   {
//     headers: {
//       Accept: "application/json",
//     },
//   }
// )
//   .then((response) => response.json())
//   .then((data) => (absData = data));

const res = await fetch(
  "https://api.data.abs.gov.au/data/ABS,MERCH_EXP,1.0.0/0+1+2+3+4+5+6+7+8+9+TOT.TOT.TOT.M?startPeriod=2022-01&format=jsondata"
);

absData = await res.json();

// Define data attributes and clean data
// var absMeta = absData.data.structure;
// var absName = absMeta.name;

// console.log(absData.keys());
console.log(absData);

document.addEventListener("DOMContentLoaded", function () {
  const chart = Highcharts.chart("chartHolster", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Fruit Consumption",
    },
    xAxis: {
      categories: ["Apples", "Bananas", "Oranges"],
    },
    yAxis: {
      title: {
        text: "Fruit eaten",
      },
    },
    series: [
      {
        name: "Jane",
        data: [1, 0, 4],
      },
      {
        name: "John",
        data: [5, 7, 3],
      },
    ],
  });
});

export { absData, res };
