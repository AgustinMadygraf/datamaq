// public/js/computer_vision.js
// Lógica extraída de computer_vision.html

import { loadHeader } from '../../public/js/headerLoader.js';

// Cargar el header dinámicamente con manejo de error/fallback
window.addEventListener('DOMContentLoaded', () => {
    loadHeader('../templates/header.html', 'header-container');
    fetchResolution();
    setupSnapshot();
    setupStreamErrorHandlers();
});

// Mostrar resolución
function fetchResolution() {
    fetch('http://127.0.0.1:5000/resolution')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            if (data && data.width && data.height) {
                document.getElementById('resolution-info').textContent = `Resolución: ${data.width} x ${data.height}`;
            } else {
                document.getElementById('resolution-info').textContent = '';
            }
        })
        .catch(() => {
            document.getElementById('resolution-info').textContent = '';
        });
}

// Tomar snapshot
function setupSnapshot() {
    const btn = document.getElementById('snapshot-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
        const loading = document.getElementById('snapshot-loading');
        const img = document.getElementById('snapshot-img');
        const info = document.getElementById('snapshot-info');
        const error = document.getElementById('snapshot-error');
        loading.style.display = 'inline-block';
        img.style.display = 'none';
        info.textContent = '';
        error.style.display = 'none';
        fetch('http://127.0.0.1:5000/snapshot.jpg')
            .then(res => {
                if (!res.ok) throw new Error('No se pudo obtener el snapshot');
                return res.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                img.src = url;
                img.style.display = 'block';
                info.textContent = `Snapshot tomado: ${new Date().toLocaleString()}`;
            })
            .catch(() => {
                error.textContent = 'Error al tomar el snapshot. La cámara puede no estar disponible.';
                error.style.display = 'block';
            })
            .finally(() => {
                loading.style.display = 'none';
            });
    });
}

// Detectar error en el stream (si la imagen no carga)
function setupStreamErrorHandlers() {
    const streamImg = document.getElementById('stream-img');
    if (!streamImg) return;
    streamImg.addEventListener('error', function() {
        document.getElementById('stream-error').style.display = 'block';
    });
    streamImg.addEventListener('load', function() {
        document.getElementById('stream-error').style.display = 'none';
    });
}
