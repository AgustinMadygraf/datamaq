/*
Path: src/use_cases/manage_app_state.js
*/

import AppStateEntity from '../entities/app_state_entity.js';

export default class ManageAppStateUseCase {
    constructor(appStateEntity = new AppStateEntity()) {
        this.appStateEntity = appStateEntity;
    }

    setChartData(chartData) {
        this.appStateEntity.setChartData(chartData);
    }

    setInitialData(initialData) {
        this.appStateEntity.setInitialData(initialData);
    }

    setLoading(key, isLoading) {
        this.appStateEntity.setLoading(key, isLoading);
    }

    addError(source, error) {
        return this.appStateEntity.addError(source, error);
    }

    clearError(id) {
        this.appStateEntity.clearError(id);
    }

    clearAllErrors() {
        this.appStateEntity.clearAllErrors();
    }

    getState() {
        return {
            chart: this.appStateEntity.chart,
            initial: this.appStateEntity.initial,
            loading: this.appStateEntity.loading,
            errors: this.appStateEntity.errors
        };
    }
}
