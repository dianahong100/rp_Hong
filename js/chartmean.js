// Code for generating a Chart.js line chart


async function getData(){
   const response = await fetch('../data/results.csv') // .. to move up one folder
   const data = await response.text();             // CSV to TEXT format
   console.log(data);


   const xGenre = [];          // x-axis label = genres
   const yMean = [];          // y-axis global temp values
   const yNHtemps = [];        // y-axis NH temp values
   const ySHtemps = [];        // y - axis SH temp values


   // \n - new line character
   // split('\n') - will seperate the table into an array of individual rows
   // slice(start, end) - return a new array starting at index 'start' up to and including 'end'


   const table = data.split('\n').slice(1)     //Split by line and remove first row
   //console.log(table);


   table.forEach(row => {
       const columns = row.split(',')
       const genre = parseFloat(columns[0]);        // Assign year value
       xGenre.push(genre);                          // Push each year into array for years


       const temp = parseFloat(columns[1]);        // Convert global temp. to float
       yMean.push(temp + 14);                     // Push temp values to array and refrence to 0-deg. C


       const nhTemp = parseFloat(columns[2]);        // Convert NH temp. to float
       yNHtemps.push(nhTemp + 14);                     // Push temp values to array and refrence to 0-deg. C


       const shTemp = parseFloat(columns[3]);        // Convert SH temp. to float
       ySHtemps.push(shTemp + 14);                     // Push temp values to array and refrence to 0-deg. C


       console.log(year, temp, nhTemp, shTemp);
   });


   return {xYears, yTemps, yNHtemps, ySHtemps} //Use {} to return multiple values of a single object
}


async function createChart(){
   const data = await getData();       // createChart will wait for getData() to process
   const radarChart = document.getElementById('hongRadarChart');
   const degreeSymbol = String.fromCharCode(176);


   const myChart = new Chart(radarChart, {  // Construct the chart   
       type: 'line',
       data: {                         // Define data
           labels: data.xYears,        // x-axis labels
           datasets: [                 // Each object describes one dataset of y-values
                                       //  including display properties.  To add more datasets,
                                       //  place a comma after the closing curly brace of the last
                                       //  data set object and add another dataset object.
               {
                   label:    `Combined Global LSA and SSW Temperature in ${degreeSymbol}C`,     // Dataset label for legend
                   data:     data.yTemps,    // Reference to array of y-values
                   fill:     false,           // Fill area under the linechart (true = yes, false = no)
                   backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                   borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
                   borderWidth:      1   // Data marker border width
               },
               {
                   label:    `Combined Global LSA and SSW Temperature in ${degreeSymbol}C`,     // Dataset label for legend
                   data:     data.yNHtemps,    // Reference to array of y-values
                   fill:     false,           // Fill area under the linechart (true = yes, false = no)
                   backgroundColor:  'rgba(0, 102, 255, 0.2)',    // Color for data marker
                   borderColor:      'rgba(0, 102, 255, 1)',      // Color for data marker border
                   borderWidth:      1   // Data marker border width
               },
               {
                   label:    `Combined Global LSA and SSW Temperature in ${degreeSymbol}`,     // Dataset label for legend
                   data:     data.ySHtemps,    // Reference to array of y-values
                   fill:     false,           // Fill area under the linechart (true = yes, false = no)
                   backgroundColor:  'rgba(0, 153, 51, 0.2)',    // Color for data marker
                   borderColor:      'rgba(0, 153, 51, 1)',      // Color for data marker border
                   borderWidth:      1   // Data marker border width
               }
       ]
       },
       options: {                        // Define display chart display options
           responsive: true,             // Re-size based on screen size
           maintainAspectRatio: false,
           scales: {                     // Display options for x & y axes
               x: {                      // x-axis properties
                   title: {
                       display: true,
                       text: 'Year',     // x-axis title
                       font: {                   // font properties
                           size: 14
                       },
                   },
                   ticks: {                      // x-axis tick mark properties
                       callback: function(val, index) {
                           //Set the tick marks at every 5 years
                           return index %5 === 0 ? this.getLabelForValue(val) : ``;
                       },
                   font: {
                       size: 14 
                       },
                   },
                   grid: {                       // x-axis grid properties
                       color: '#6c767e'
                   }
               },
               y: {                              // y-axis properties
                   title: {
                       display: true,                         
                       text: `Global Mean Temperatures (${degreeSymbol}C)`,     // y-axis title
                       font: {
                           size: 14
                       },
                   },
                   ticks: {
                       min: 0,                  
                       maxTicksLimit: data.yTemps.length/10,        // Actual value can be set dynamically
                       font: {
                           size: 12
                       }
                   },
                   grid: {                       // y-axis gridlines
                       color: '#6c767e'
                   }
               }
           },
           plugins: {                  // Display options for title and legend
               title: {
                   display: true,
                   text: 'Global Mean Temperature vs. Year (since 1880)',
                   font: {
                       size: 24,
                   },
                   color: '#black',
                   padding: {
                       top: 10,
                       bottom: 30
                   }
               },
               legend: {
                   align: 'start',
                   position: 'bottom',
               }
           }
       }      
   });
}


createChart();

