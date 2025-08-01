/*
Path: assets/JS/store.js
*/

// Estado centralizado para la app

const state = {
    initialData: null,
    chartData: null,
    dashboardData: null,
    loading: false,
    error: null,
    // ...otros estados globales
};

const listeners = [];

const store = {
    getState() {
        return { ...state };
    },
    setState(newState) {
        Object.assign(state, newState);
        listeners.forEach(cb => cb(store.getState()));
    },
    subscribe(cb) {
        listeners.push(cb);
        return () => {
            const idx = listeners.indexOf(cb);
            if (idx > -1) listeners.splice(idx, 1);
        };
    },
    // Métodos específicos para modificar partes del estado
    setInitialData(data) {
        this.setState({ initialData: data });
    },
    setChartData(data) {
        this.setState({ chartData: data });
    },
    setDashboardData(data) {
        this.setState({ dashboardData: data });
    },
    setLoading(isLoading) {
        this.setState({ loading: isLoading });
    },
    setError(error) {
        this.setState({ error });
    }
};

export default store;
