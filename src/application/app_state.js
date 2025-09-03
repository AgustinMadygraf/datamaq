/*
Path: src/application/app_state.js
 */


import AppStateEntity from '../entities/app_state_entity.js';
import ManageAppStateUseCase from '../use_cases/manage_app_state.js';

class AppState {
    constructor() {
        this.entity = new AppStateEntity({
            chart: {
                conta: null,
                rawdata: [],
                ls_periodos: [],
                menos_periodo: null,
                periodo: 'hora'
            },
            initial: {
                periodo: 'hora', 
                conta: null,
                csrfToken: null
            },
            loading: {
                dashboard: false,
                chart: false
            },
            errors: []
        });
        this.useCase = new ManageAppStateUseCase(this.entity);
        this._subscribers = {
            'chart': [],
            'initial': [],
            'loading': [],
            'errors': [],
            'all': []
        };
        console.log("AppState - Estado centralizado inicializado (con entidad y caso de uso)");
    }

    getState() {
        return this.useCase.getState();
    }

    get(key) {
        const state = this.getState();
        if (key in state) {
            return { ...state[key] };
        }
        console.warn(`AppState - Intentando acceder a una clave de estado no existente: ${key}`);
        return null;
    }

    setChartData(chartData) {
        this.useCase.setChartData(chartData);
        this._notify('chart');
    }

    getChartData() {
        return this.get('chart');
    }

    setInitialData(initialData) {
        this.useCase.setInitialData(initialData);
        this._notify('initial');
    }

    getInitialData() {
        return this.get('initial');
    }

    setLoading(key, isLoading) {
        this.useCase.setLoading(key, isLoading);
        this._notify('loading');
    }

    isLoading() {
        const loading = this.get('loading');
        return Object.values(loading).some(value => value === true);
    }

    addError(source, error) {
        const id = this.useCase.addError(source, error);
        this._notify('errors');
        return id;
    }

    clearError(id) {
        this.useCase.clearError(id);
        this._notify('errors');
    }

    clearAllErrors() {
        this.useCase.clearAllErrors();
        this._notify('errors');
    }

    subscribe(key, callback) {
        if (typeof callback !== 'function') {
            console.error("AppState - El callback debe ser una función");
            return () => {};
        }
        if (!this._subscribers[key]) {
            console.warn(`AppState - Suscripción a una clave no existente: ${key}, se usará 'all'`);
            key = 'all';
        }
        this._subscribers[key].push(callback);
        console.log(`AppState - Nueva suscripción a ${key}, total: ${this._subscribers[key].length}`);
        return () => {
            this._subscribers[key] = this._subscribers[key].filter(cb => cb !== callback);
            console.log(`AppState - Suscripción a ${key} cancelada, restantes: ${this._subscribers[key].length}`);
        };
    }

    _notify(key) {
        const value = this.get(key);
        if (this._subscribers[key]) {
            this._subscribers[key].forEach(callback => {
                try {
                    callback(value);
                } catch (error) {
                    console.error(`AppState - Error en callback de ${key}:`, error);
                }
            });
        }
        this._subscribers.all.forEach(callback => {
            try {
                callback({ [key]: value });
            } catch (error) {
                console.error(`AppState - Error en callback general para ${key}:`, error);
            }
        });
    }

    resetState() {
        this.entity = new AppStateEntity({
            chart: {
                conta: null,
                rawdata: [],
                ls_periodos: [],
                menos_periodo: null,
                periodo: 'hora' // Cambia 'semana' por 'hora'
            },
            initial: {
                periodo: 'hora', // Cambia 'semana' por 'hora'
                conta: null,
                csrfToken: null
            },
            loading: {
                dashboard: false,
                chart: false
            },
            errors: []
        });
        this.useCase = new ManageAppStateUseCase(this.entity);
        Object.keys(this._subscribers).forEach(key => this._notify(key));
    }
}

const appState = new AppState();
export default appState;
