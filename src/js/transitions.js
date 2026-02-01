export function initPageTransition(targetPage, duration = 1000) {
    return new Promise((resolve) => {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition active';
        overlay.innerHTML = `
            <div style="width: 200px;">
                <div class="skeleton skeleton-text" style="height: 40px; margin-bottom: 15px;"></div>
                <div class="skeleton skeleton-text" style="height: 20px;"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        // 3D rotation effect on body
        // Minimal fade and scale effect
        document.body.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.98)';

        setTimeout(() => {
            window.location.href = targetPage;
            resolve();
        }, duration);
    });
}

export function fadeIn(element, duration = 500) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in-out`;

    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

export function slideIn(element, direction = 'left', duration = 500) {
    const transforms = {
        left: 'translateX(-100%)',
        right: 'translateX(100%)',
        top: 'translateY(-100%)',
        bottom: 'translateY(100%)'
    };

    element.style.transform = transforms[direction];
    element.style.transition = `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;

    setTimeout(() => {
        element.style.transform = 'translate(0, 0)';
    }, 10);
}
