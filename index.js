document.getElementById("body").addEventListener("click", function() {
  var
        el = document.documentElement
      , rfs =
             el.requestFullScreen
          || el.webkitRequestFullScreen
          || el.mozRequestFullScreen
  ;
  rfs.call(el);
});

function init() {
  initHost('host1');
  initHost('host2');
}

var seriesOptions = [
  { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 3 },
  { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 3 },
];

function initHost(hostId) {

  // Initialize an empty TimeSeries for each CPU.
  //var cpuDataSets = [new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries()];
  var cpuDataSets = [new TimeSeries(), new TimeSeries()];

  var now = Date.now();
  for (var t = now - 1000 * 50; t <= now; t += 1000) {
    addRandomValueToDataSets(t, cpuDataSets);
  }
  // Every second, simulate a new set of readings being taken from each CPU.
  setInterval(function () {
    addRandomValueToDataSets(Date.now(), cpuDataSets);
  }, 1000);

  // Build the timeline
  var timeline = new SmoothieChart({
    timestampFormatter:SmoothieChart.timeFormatter, 
    fps: 30, 
    millisPerPixel: 20, 
    labels:
      {
        fontSize: 20,
        precision: 2
      },
    grid: 
      { 
        strokeStyle: '#555555', 
        lineWidth: 1, 
        millisPerLine: 1000, 
        verticalSections: 4,
        borderVisible: true 
      }, 
    tooltip: true ,
    horizontalLines:[
      {color:'#ffffff',lineWidth:2,value:0},
      // {color:'#ffffff',lineWidth:1,value:50},
      // {color:'#ffffff',lineWidth:1,value:-50}
    ],
  });

  for (var i = 0; i < cpuDataSets.length; i++) {
    timeline.addTimeSeries(cpuDataSets[i], seriesOptions[i]);
  }
  timeline.streamTo(document.getElementById(hostId + 'Cpu'), 1000);
}

function addRandomValueToDataSets(time, dataSets) {
  for (var i = 0; i < dataSets.length; i++) {
    dataSets[i].append(time, (Math.random() - .5 ) * 100);
  }
}
