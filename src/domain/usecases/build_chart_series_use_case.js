/*
Path: src/domain/usecases/BuildChartSeriesUseCase.js
*/

import SeriesBuilder from '../services/series_builder.js';

export default class BuildChartSeriesUseCase {
    constructor(seriesBuilder = new SeriesBuilder()) {
        this.seriesBuilder = seriesBuilder;
    }

    execute(chartData) {
        return this.seriesBuilder.buildSeries(chartData);
    }
}