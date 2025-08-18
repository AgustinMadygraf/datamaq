// Caso de uso: ReconnectStream
export class ReconnectStream {
    constructor({ gateway, maxAttempts = 5 }) {
        this.gateway = gateway;
        this.maxAttempts = maxAttempts;
        this.attempts = 0;
    }

    tryReconnect() {
        if (this.attempts < this.maxAttempts) {
            this.attempts++;
            const delay = Math.min(30000, Math.pow(2, this.attempts) * 1000);
            setTimeout(() => {
                this.gateway.connect();
            }, delay);
            return true;
        }
        return false;
    }

    resetAttempts() {
        this.attempts = 0;
    }
}

// Caso de uso: RefreshStreamImage
export function refreshStreamImage() {
    const streamImg = document.getElementById('stream-img');
    if (streamImg) {
        const currentSrc = streamImg.src;
        streamImg.src = '';
        setTimeout(() => {
            streamImg.src = currentSrc;
        }, 500);
    }
}
