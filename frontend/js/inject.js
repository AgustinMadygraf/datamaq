/*
Path: frontend/js/inject.js
*/

document.addEventListener('mouseup', function(e) {
    // Ensure className is a string.
    let targetClass = typeof e.target.className === 'string' ? e.target.className : String(e.target.className || '');
    if (targetClass.indexOf("your-class-name") !== -1) {
        // ...existing mouseup logic...
    }
});
