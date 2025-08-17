/*
Path: src/entities/app_state_entity.js
*/

export default class AppStateEntity {
    constructor({ chart = {}, initial = {}, loading = {}, errors = [] } = {}) {
        this.chart = chart;
        this.initial = initial;
        this.loading = loading;
        this.errors = errors;
    }

    // Métodos para manipular el estado
    setChartData(chartData) {
        this.chart = { ...this.chart, ...chartData };
    }

    setInitialData(initialData) {
        this.initial = { ...this.initial, ...initialData };
    }

    setLoading(key, isLoading) {
        this.loading = { ...this.loading, [key]: isLoading };
    }

    addError(source, error) {
        const newError = {
            id: Date.now(),
            source,
            message: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        };
        this.errors = [...this.errors, newError];
        return newError.id;
    }

    clearError(id) {
        this.errors = this.errors.filter(e => e.id !== id);
    }

    clearAllErrors() {
        this.errors = [];
    }
}
