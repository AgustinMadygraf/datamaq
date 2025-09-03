// src/infrastructure/periodic_update_service.js
import eventBus from './event_bus.js';

export default class PeriodicUpdateService {
    constructor(updateIntervalMs = 5000) {
        this.updateIntervalMs = updateIntervalMs;
        this.intervalId = null;
        this.isRunning = false;
    }

    start(callback) {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.intervalId = setInterval(async () => {
            try {
                const necesitaActualizar = await callback();
                if (necesitaActualizar) {
                    console.log("Es necesario actualizar la página.");
                } else {
                    console.log("Verificando si es tiempo de actualizar la página: No es necesario actualizar la página.");
                }
            } catch (error) {
                eventBus.emit('PERIODIC_UPDATE_ERROR', { error });
            }
        }, this.updateIntervalMs);
        eventBus.emit('PERIODIC_UPDATE_STARTED', { interval: this.updateIntervalMs });
    }

    stop() {
        if (!this.isRunning) return;
        
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
        
        eventBus.emit('PERIODIC_UPDATE_STOPPED');
    }
}