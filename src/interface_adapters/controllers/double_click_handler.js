/*
Path: src/adapters/controllers/DoubleClickHandler.js
*/

import appState from '../../application/app_state.js';

export function onDbClick(event) {
    // Ejecuta directamente la acción de zoom sin lógica de doble clic
    try {
        const chartData = appState.getChartData();
        const periodo = chartData.periodo;
        const ls_periodos = chartData.ls_periodos;
        const menos_periodo = chartData.menos_periodo;
        const tiempo = Highcharts.numberFormat(event.xAxis[0].value + (ls_periodos[menos_periodo[periodo]] / 2));
        window.open(window.location.pathname + '?periodo=' + menos_periodo[periodo] + '&conta=' + tiempo, "_self");
    } catch (err) {
    }
}
