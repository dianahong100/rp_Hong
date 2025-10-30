// Code for generating a Chart.js line chart


async function getData(){
   const response = await fetch('/data/results.csv') // .. to move up one folder
   const rawData = await response.text();             // CSV to TEXT format
   console.log(rawData);


   const genres = [];          // genres
   const mean = [];          // mean accuracy values
   const standDev = [];        // standard deviation
   const variation = [];        // variation
   const trials = [];          // number of trials


   // \n - new line character
   // split('\n') - will seperate the table into an array of individual rows
   // slice(start, end) - return a new array starting at index 'start' up to and including 'end'


   const table = rawData.split('\n').slice(1)     //Split by line and remove first row
   //console.log(table);


   table.forEach(row => {
       const columns = row.split(',')
       const genre = columns[0];        // Assign genres value
       genres.push(genre);                          // Push each genre into array


       const avg = parseFloat(columns[1]);        // Convert mean to float
       mean.push(avg);                     // Push mean values to array

       const stdv = parseFloat(columns[2]);     /// convert standard deviation to float
       standDev.push(stdv);                // push standard dev values to array

       const variate = parseFloat(columns[3]);  // convert variation to float
       variation.push(variate);         // push variation values to array

       const trialNum = parseFloat(columns[4]);   // convert number of trials to float
       trials.push(trialNum);           // push number of trials to array

       console.log(genre, avg, stdv, variate, trialNum);
   });


   return {genres, mean, standDev, variation, trials} //Use {} to return multiple values of a single object
}


async function createChart(){
   const data = await getData();       // createChart will wait for getData() to process
   const radarChart = document.getElementById('hongRadarChart');

   const myChart = new Chart(radarChart, {  // Construct the chart   
       type: 'bar',
       data: {                         // Define data
           labels: [
            'Mean',
            'Standard Deviation',
            'Variation',
            'Number of Trials'
           ],        // labels
           datasets: [                 // Each object describes one dataset of y-values
                                       //  including display properties.  To add more datasets,
                                       //  place a comma after the closing curly brace of the last
                                       //  data set object and add another dataset object.
               {
                   label:    'Grunge',     // grunge genre
                   data:     [data.mean[0], data.standDev[0], data.variation[0], data.trials[0]],    // Reference to array
                   fill:     false,           // Fill area under the linechart (true = yes, false = no)
                   backgroundColor: 'rgba(255, 99, 132, 0.2)',
                   borderColor: 'rgb(255, 99, 132)',
                   pointBackgroundColor: 'rgb(255, 99, 132)',
                   pointBorderColor: '#fff',
                   pointHoverBackgroundColor: '#fff',
                   pointHoverBorderColor: 'rgb(255, 99, 132)'
               },
               {
                   label:    'Rock',     // grunge genre
                   data:     [data.mean[1], data.standDev[1], data.variation[1], data.trials[1]],    // Reference to array
                   fill:     false,           // Fill area under the linechart (true = yes, false = no)
                   backgroundColor: 'rgba(102, 99, 255, 0.2)',
                   borderColor: 'rgba(99, 102, 255, 1)',
                   pointBackgroundColor: 'rgba(99, 115, 255, 1)',
                   pointBorderColor: '#fff',
                   pointHoverBackgroundColor: '#fff',
                   pointHoverBorderColor: 'rgba(99, 115, 255, 1)'
               },
               {
                   label:    'Shoegaze',     // Dataset label for legend
                   data:     [data.mean[2], data.standDev[2], data.variation[2], data.trials[2]],    // Reference to array
                   fill:     false,           // Fill area under the linechart (true = yes, false = no)
                   backgroundColor: 'rgba(99, 255, 99, 0.2)',
                   borderColor: 'rgba(99, 255, 125, 1)',
                   pointBackgroundColor: 'rgba(99, 255, 125, 1)',
                   pointBorderColor: '#fff',
                   pointHoverBackgroundColor: '#fff',
                   pointHoverBorderColor: 'rgba(99, 255, 120, 1)'
               },
               {
                   label:    'Pop',     // Dataset label for legend
                   data:     [data.mean[3], data.standDev[3], data.variation[3], data.trials[3]],    // Reference to array
                   fill:     false,           // Fill area under the linechart (true = yes, false = no)
                   backgroundColor: 'rgba(255, 239, 99, 0.2)',
                   borderColor: 'rgba(255, 252, 99, 1)',
                   pointBackgroundColor: 'rgba(255, 226, 99, 1)',
                   pointBorderColor: '#fff',
                   pointHoverBackgroundColor: '#fff',
                   pointHoverBorderColor: 'rgba(255, 245, 99, 1)'
               },
               {
                   label:    'Control',     // Dataset label for legend
                   data:     [data.mean[4], data.standDev[4], data.variation[4], data.trials[4]],    // Reference to array
                   fill:     false,           // Fill area under the linechart (true = yes, false = no)
                   backgroundColor: 'rgba(99, 211, 255, 0.2)',
                   borderColor: 'rgba(99, 193, 255, 1)',
                   pointBackgroundColor: 'rgba(99, 185, 255, 1)',
                   pointBorderColor: '#fff',
                   pointHoverBackgroundColor: '#fff',
                   pointHoverBorderColor: 'rgba(99, 185, 255, 1)'
               }
       ]
       },
       options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Memorization Accuracy by Genre of Music',
                font: {
                    size: 24
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                align: 'center',
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    },
                    padding: 10
                }
            }
        },
        scales: {
            
        }
       }
   });
}


createChart();