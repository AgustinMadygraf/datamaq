/*
Path: src/use_cases/validate_chart_data.js
*/

import ChartDataValidator from '../entities/chart_data_validator.js';

export default class ValidateChartDataUseCase {
    constructor(validator = new ChartDataValidator()) {
        this.validator = validator;
    }

    execute(chartData) {
        return this.validator.validateChartData(chartData);
    }
}
