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
        // Fluid 3D Flow effect on body
        // Custom bezier for "liquid" feel
        document.body.style.transition = `all ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;

        // Transform: subtle zoom IN (1.05) to create momentum into the next page
        document.body.style.transform = 'scale(1.05)';
        document.body.style.opacity = '0';
        document.body.style.filter = 'blur(10px)';

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
