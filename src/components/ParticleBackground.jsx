import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Increased count to ~400
            const particleCount = Math.min(window.innerWidth * 0.5, 400);

            for (let i = 0; i < particleCount; i++) {
                const baseX = Math.random() * canvas.width;
                const baseY = Math.random() * canvas.height;
                particles.push({
                    x: baseX,
                    y: baseY,
                    vx: 0,
                    vy: 0,
                    size: Math.random() * 2 + 0.5,
                    baseX: baseX,
                    baseY: baseY,
                    // Reduced density range to 10% for very slow repel (1-31 -> 0.1-3.1)
                    density: (Math.random() * 3) + 0.1,
                    color: Math.random() > 0.3 ? '#ffffff' : '#ffd700',
                    alpha: Math.random() * 0.5 + 0.3
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Mouse Interaction
                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 100;

                // Physics Parameters (Very slow - 10%)
                const returnSpeed = 0.005; // 10% of 0.05
                const friction = 0.90; // Damping stays same

                if (distance < repelRadius) {
                    // Repel Force
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (repelRadius - distance) / repelRadius;
                    const directionX = forceDirectionX * force * p.density;
                    const directionY = forceDirectionY * force * p.density;

                    p.vx -= directionX;
                    p.vy -= directionY;
                } else {
                    // Return to Base Force
                    if (p.x !== p.baseX) {
                        const dxMove = p.x - p.baseX;
                        p.vx -= dxMove * returnSpeed;
                    }
                    if (p.y !== p.baseY) {
                        const dyMove = p.y - p.baseY;
                        p.vy -= dyMove * returnSpeed;
                    }
                }

                // Apply Velocity
                p.x += p.vx;
                p.y += p.vy;

                // Apply Friction
                p.vx *= friction;
                p.vy *= friction;

                // Draw Star
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                if (document.body.classList.contains('light-mode')) {
                    // High Contrast for Light Mode: Solid Black or Dark Grey
                    ctx.fillStyle = p.color === '#ffffff' ? '#000000' : '#333333';
                    // Boost opacity significantly for visibility on white
                    ctx.globalAlpha = Math.min(1.0, p.alpha + 0.4);
                } else {
                    // Standard Dark Mode
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                }

                ctx.fill();
                ctx.globalAlpha = 1.0;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.current.x = -1000;
            mouse.current.y = -1000;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Base layer for dark mode
                background: '#000000', // Pure black background
                pointerEvents: 'none'
            }}
        />
    );
};

export default ParticleBackground;
