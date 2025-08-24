/*
Path: src/infrastructure/inject.js
*/

import eventBus from './event_bus.js';

document.addEventListener('mouseup', function(e) {
    eventBus.emit('MOUSE_UP_RAW', e);
});
