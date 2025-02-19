<?php
/*
Path: app/models/DashboardModel.php
Este archivo contiene la lógica de acceso a la base de datos para la vista del panel de control.
*/

require_once __DIR__ . '/../../includes/db_functions.php';

class DashboardModel {
    public function getDashboardData($periodo) {
        $ls_periodos = ['semana' => 604800, 'turno' => 28800, 'hora' => 7200];
        if (!isset($ls_periodos[$periodo])) {
            $periodo = 'semana';
        }
        $sqlLast = "SELECT `unixtime`, `HR_COUNTER1` FROM `intervalproduction` ORDER BY `unixtime` DESC LIMIT 1";
        $res = getArraySQL($sqlLast);
        $vel_ult = isset($res[0]['HR_COUNTER1']) ? $res[0]['HR_COUNTER1'] : 0;
        $unixtime = isset($res[0]['unixtime']) ? $res[0]['unixtime'] : time();

        $valorInicial = $unixtime * 1000;
        $conta = $valorInicial;
        if (isset($_GET["conta"]) && $_GET["conta"] <= $valorInicial) {
            $conta = $_GET["conta"];
        }
        $tiempo1 = ($conta / 1000) - $ls_periodos[$periodo] - 80 * 60;
        $tiempo2 = $conta / 1000;
        $sqlData = "SELECT `unixtime`, `HR_COUNTER1`, `HR_COUNTER2` FROM `intervalproduction` 
                    WHERE unixtime > {$tiempo1} AND unixtime <= {$tiempo2} ORDER BY `unixtime` ASC";
        $rawdata = getArraySQL($sqlData);

        return [
            'vel_ult'   => $vel_ult,
            'unixtime'  => $unixtime,
            'rawdata'   => $rawdata,
        ];
    }
}
