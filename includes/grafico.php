<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var jsonData = $.ajax({
        url: "getData.php",
        dataType: "json",
        async: false
        }).responseText;

    var data = google.visualization.arrayToDataTable(JSON.parse(jsonData));

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     ]);

    var options = {
        title: "Variación a lo Largo del Tiempo",
        width: 600,
        height: 400,
        hAxis: {title: "Unixtime"},
        vAxis: {title: "Variación"},
        legend: { position: "none" },
    };

    var chart = new google.visualization.LineChart(document.getElementById("chart_div"));
    chart.draw(view, options);
  }
</script>
<div id="chart_div" style="width: 900px; height: 300px;"></div>
