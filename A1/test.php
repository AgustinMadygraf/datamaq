<?


    date_default_timezone_set('America/Argentina/Buenos_Aires');
    setlocale(LC_TIME, "spanish");
    $segundos = 60;   // Refrescar cada 60 segundos
    
    
    // Variable que registra qué período de tiempo mostrar por defecto
    $periodo = 'semana';
    $ls_periodos = ['mes' => 2419200, 'semana' => 604800, 'turno' => 28800];
    $ls_class = ['mes' => [1, 0, 0], 'semana' => [0, 1, 0], 'turno' => [0, 0, 1]];
    $ref_class = ['presione', 'presado'];
    $menos_periodo = ['mes' => 'semana', 'semana' => 'turno', 'turno' => 'turno'];
    
    // Comprobar si se cambió el período a través de GET
    if ($_GET && array_key_exists("periodo", $_GET)) {
        if (array_key_exists($_GET["periodo"], $ls_periodos)) {
            $periodo = $_GET["periodo"];
        }
    }
    $class = $ls_class[$periodo];
    
    // Conectar a la base de datos
    function conectarBD() {
        $server = "localhost";
        $usuario = "root";
        $pass = "12345678";
        $BD = "powermeter";
        $conexion = mysqli_connect($server, $usuario, $pass, $BD);
        if (!$conexion) {
            echo 'Ha sucedido un error inesperado en la conexión de la base de datos<br>';
        }
        return $conexion;
    }
    
    // Desconectar la conexión a la base de datos
    function desconectarBD($conexion) {
        $close = mysqli_close($conexion);
        if (!$close) {
            echo 'Ha sucedido un error inesperado en la desconexión de la base de datos<br>';
        }
        return $close;
    }
    
    // Obtener un array multidimensional con el resultado de la consulta
    function getArraySQL($sql) {
        $conexion = conectarBD();
        if (!$result = mysqli_query($conexion, $sql)) die();
    
        $rawdata = array();
        $i = 0;
        while ($row = mysqli_fetch_array($result)) {
            $rawdata[$i] = $row;
            $i++;
        }
    
        desconectarBD($conexion);
        return $rawdata;
    }
    
    function sql_query($campo) {
        return "SELECT `unixtime`, `$campo` FROM `inst_bt_a1`  ORDER BY `unixtime` DESC LIMIT 1";
    }
    
    $res = getArraySQL(sql_query("potencia_III"));
    $unixtime = $res[0]['unixtime'] ;
    
    
    
    
    // Si la variable 'test' aparece en $_GET, el refresco se hace cada segundo en vez de cada 20 segundos.
    header("Refresh:" . $segundos);
    
    // Valores para la ubicación del degradado de advertencia
    $d = array();
    for ($i = 0; $i < 4; $i++) {
        $d[$i] = 350 - $pot - 10 * $i;
    }
    
    $date = date(DATE_RFC2822);
    $newDate = date("D, d M Y" . (" 00:00:00") . " O");
    
    $valorInicial = $unixtime * 1000;
    $conta = $valorInicial;
    if ($_GET && array_key_exists("conta", $_GET)) {
        $conta = $_GET["conta"];
        if ($conta > $valorInicial) {
            $conta = $valorInicial;
        }
    }
    
    $tiempo1 = ($conta/1000) - $ls_periodos[$periodo] - 80*60;
    $tiempo2 = $conta/1000 ;
    $sql = "SELECT `unixtime`, `potencia_III`  from `inst_bt_a1` WHERE  unixtime > " . $tiempo1 . " AND unixtime <= " . $tiempo2 . " ORDER BY `unixtime` ASC ;";
    $rawdata = getArraySQL($sql);
?>
    <!-- power_info_display.php -->
    <div id="zero" class="hoja" style= <?php echo '"background: linear-gradient(195deg, rgb(107,170,34) '.$d[3].'%, rgb(255,164,1) '.$d[2].'%, rgb(234,53,34) '.$d[1].'%, rgb(100,10,5) '.$d[0].'%);"';//'"background-color:green"'; ?> >
      <div class="info">
        <div class="cabecera">
          <div class="c1">
            <p1>
              <?php $potinst = 20;
                    echo "Velocidad instantánea ".round($potinst,1);
              ?>
               RPM</p1>
          </div>
        </div>
            <div id="container" class="graf"></div>
        <?php require "botonera.php"; ?>
      </div>
      <br>
      <br>
      <br>
    </div>

    <!-- chart_viewer.php -->
<script type='text/javascript'>
    var doubleClicker = {
        clickedOnce: false,
        timer: null,
        timeBetweenClicks: 400
    };

    var resetDoubleClick = function () {
        clearTimeout(doubleClicker.timer);
        doubleClicker.timer = null;
        doubleClicker.clickedOnce = false;
    };

    var zoomIn = function (event) {
        var tiempo = Highcharts.numberFormat(event.xAxis[0].value + <?= $ls_periodos[$menos_periodo[$periodo]] / 2 ?>);
        window.open("<?=$_SERVER["PHP_SELF"].'?medidor='.$medidor.'&periodo='.$menos_periodo[$periodo].'&conta='?>" + tiempo, "_self");
    };

    var ondbclick = function (event) {
        if (doubleClicker.clickedOnce === true && doubleClicker.timer) {
            resetDoubleClick();
            zoomIn(event);
        } else {
            doubleClicker.clickedOnce = true;
            doubleClicker.timer = setTimeout(function () {
                resetDoubleClick();
            }, doubleClicker.timeBetweenClicks);
        }
    };

    $(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            },
            lang: {
                thousandsSep: "",
                months: [
                    'Enero', 'Febrero', 'Marzo', 'Abril',
                    'Mayo', 'Junio', 'Julio', 'Agosto',
                    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ],
                weekdays: [
                    'Domingo', 'Lunes', 'Martes', 'Miércoles',
                    'Jueves', 'Viernes', 'Sábado'
                ]
            }
        });

        var chart;
        $('#container').highcharts({
            chart: {
                type: 'spline',
                animation: false,
                marginRight: 10,
                events: {
                    load: function () {

                    },
                    click: function (event) {
                        ondbclick(event);
                    }
                }
            },
            title: {
                text: (function () {
                    return Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", <?= $conta; ?>);
                })(),
                events: {
                    load: function () {

                    },
                    click: function (event) {
                        ondbclick(event);
                    }
                }
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 1
            },
            yAxis: {    
                type: 'logarithmic', // Establece el eje vertical como logarítmico
                title: {
                    text: '[RPM]'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 1) + ' W';
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: true
            },
            series: [
                {
                    name: 'RPM maq bolsas',
                    animation: false,
                    data: (function () {
                        var data = [];
                        <?php for ($i = 15; $i < count($rawdata); $i++) { ?>
                            data.push([<?= 1000*$rawdata[$i]["unixtime"] ?>, <?= $rawdata[$i]["potencia_III"] ?>]);
                        <?php } ?>
                        return data;
                    })()
                },
                {
                    name: 'produccion',
                    animation: false,
                    data: (function () {
                        var data = [];
                        <?php for ($i = 15; $i < count($rawdata); $i++) { ?>
                            data.push([<?= 1000*$rawdata[$i]["unixtime"] ?>, 20]);
                        <?php } ?>
                        return data;
                    })()
                }
            ]
        });
    });
</script>
