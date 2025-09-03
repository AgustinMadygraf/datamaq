// src/infrastructure/periodic_update_service.js
import eventBus from './event_bus.js';

export default class PeriodicUpdateService {
    constructor(updateIntervalMs = 60000) {
        this.updateIntervalMs = updateIntervalMs;
        this.intervalId = null;
        this.isRunning = false;
    }

    start(callback) {
        if (this.isRunning) {
            console.warn('[PeriodicUpdateService] start() llamado pero ya está corriendo.');
            return;
        }
        this.isRunning = true;
        this.intervalId = setInterval(async () => {
            console.log('[PeriodicUpdateService] Ejecutando callback periódico...');
            try {
                const necesitaActualizar = await callback();
                console.log('[PeriodicUpdateService] Resultado callback necesitaActualizar:', necesitaActualizar);
                if (necesitaActualizar) {
                    console.log('[PeriodicUpdateService] Es necesario actualizar la página.');
                } else {
                    console.log('[PeriodicUpdateService] No es necesario actualizar la página.');
                }
            } catch (error) {
                console.error('[PeriodicUpdateService] Error en callback:', error);
                eventBus.emit('PERIODIC_UPDATE_ERROR', { error });
            }
        }, this.updateIntervalMs);
        eventBus.emit('PERIODIC_UPDATE_STARTED', { interval: this.updateIntervalMs });
        console.log('[PeriodicUpdateService] Servicio iniciado con intervalo:', this.updateIntervalMs);
    }

    stop() {
        if (!this.isRunning) {
            console.warn('[PeriodicUpdateService] stop() llamado pero no está corriendo.');
            return;
        }
        console.log('[PeriodicUpdateService] Deteniendo servicio periódico...');
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
        eventBus.emit('PERIODIC_UPDATE_STOPPED');
        console.log('[PeriodicUpdateService] Servicio detenido.');
    }
}