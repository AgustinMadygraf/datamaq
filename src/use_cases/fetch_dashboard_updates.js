// src/use_cases/fetch_dashboard_updates.js
import ApiService from '../interface_adapters/gateways/api_service.js';
import DataComparator from '../entities/data_comparator.js';

export default class FetchDashboardUpdatesUseCase {
    constructor(chartDataValidator) {
        this.validator = chartDataValidator;
        this.dataComparator = new DataComparator();
    }

    async execute(currentData, periodo, conta) {
        try {
            // Verificar si hay actualizaciones
            const response = await ApiService.checkForUpdates(periodo, conta);
            
            if (response.status !== 'success') {
                return { 
                    hasUpdates: false, 
                    newData: null,
                    error: response.message
                };
            }
            
            const newData = {
                conta: response.data.conta,
                rawdata: response.data.rawdata,
                ls_periodos: response.data.ls_periodos,
                menos_periodo: response.data.menos_periodo,
                periodo: response.data.periodo
            };
            
            // Verificar si los datos son válidos
            if (!this.validator.validateChartData(newData)) {
                return { 
                    hasUpdates: false,
                    newData: null,
                    error: 'Datos recibidos no son válidos'
                };
            }
            
            // Comparar con los datos actuales
            const hasUpdates = this.dataComparator.compareData(currentData, newData);
            
            return {
                hasUpdates,
                newData: hasUpdates ? newData : null
            };
            
        } catch (error) {
            console.error('FetchDashboardUpdatesUseCase - Error:', error);
            return {
                hasUpdates: false,
                newData: null,
                error: error.message
            };
        }
    }
}