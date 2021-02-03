// function for plots
function getPlot(id) {
    
    // d3 library to read in json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        //washing frequency values 
        var washingfreq = data.metadata.map(x => x.washingfreq)
        console.log(`Washing Freq: ${washingfreq}`)

        // bar chart values from sample data
        var samples = data.samples.filter(p => p.id.toString() === id)[0];
        console.log(samples);

        var sampleData = samples.sample_values.slice(0, 10).reverse();
        var idData = (samples.otu_ids.slice(0, 10)).reverse();
        
        // otu id values for the bar chart
        var idOtu = idData.map(x => "OTU " + x)

        console.log(`OTU IDS: ${idOtu}`)

        var labels = samples.otu_labels.slice(0, 10);

        console.log(`Sample Values: ${sampleData}`)
        console.log(`Id Values: ${idData}`)

        // trace for bar plot
        var trace = {
            x: sampleData,
            y: idOtu,
            text: labels,
            type:"bar",
            orientation: "h",
            marker: {
                color: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'],
            }
        }
        var barData = [trace];

        // chart layout
        var layout = {
            title: "Top 10 OTUS",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };
        //plot the bar graph
        Plotly.newPlot("bar", barData, layout);
        

        // bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
            },
            text: samples.otu_labels
        };

        // bubble chart layout
        var layout = {
            xaxis:{title: "OTU ID"},
            height: 700,
            width: 1100
        };
        var bubbleData = [trace1];
        //plot the bubble graph
        Plotly.newPlot("bubble", bubbleData, layout); 

        // create pie chart
        var pieData = {
            labels: idOtu,
            values:sampleData,
            type:"pie",
        }
        var data = [pieData]
        //plot the pie chart 
        Plotly.newPlot("gauge", data)

    });    
}
    
// create function for data
function getInfo(id) {
    d3.json("data/samples.json").then((data)=> {
        
        // metadata for demographic info
        var metadata = data.metadata;
        console.log(metadata)

        // filter meta data by id
        var metadataResults = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicData = d3.select("#sample-metadata");
        
        demographicData.html("");

        // demographic data for the id and append to the page
        Object.entries(metadataResults).forEach((key) => {   
            demographicData.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

//  function for the data rendering
function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        // id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        // functions to display the data and plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();