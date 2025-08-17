/*
Path: src//use_cases/build_chart_series.js
*/

import SeriesBuilder from '../entities/series_builder.js';

export default class BuildChartSeriesUseCase {
    constructor(seriesBuilder = new SeriesBuilder()) {
        this.seriesBuilder = seriesBuilder;
    }

    execute(chartData) {
        return this.seriesBuilder.buildSeries(chartData);
    }
}