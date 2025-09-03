// src/entities/data_comparator.js
export default class DataComparator {
    /**
     * Compara dos conjuntos de datos para detectar cambios
     * @param {Object} currentData - Datos actuales
     * @param {Object} newData - Nuevos datos de la API
     * @returns {boolean} - true si hay cambios significativos
     */
    compareData(currentData, newData) {
        // Implementar lógica de comparación
        // Por ejemplo, comparar timestamps, cantidad de puntos, o valores específicos
        
        // Verificación simple: comparar el último punto de datos
        if (!currentData || !newData) return true;
        
        const currentLastPoint = this.getLastDataPoint(currentData);
        const newLastPoint = this.getLastDataPoint(newData);
        
        if (!currentLastPoint || !newLastPoint) return true;
        
        // Comparar timestamps y valores
        return (
            currentLastPoint.timestamp !== newLastPoint.timestamp ||
            currentLastPoint.value !== newLastPoint.value
        );
    }
    
    getLastDataPoint(data) {
        if (!data || !data.rawdata || !data.rawdata.length) {
            return null;
        }
        
        const lastPoint = data.rawdata[data.rawdata.length - 1];
        return {
            timestamp: lastPoint.unixtime,
            value: lastPoint.HR_COUNTER1 // O el valor más relevante
        };
    }
}