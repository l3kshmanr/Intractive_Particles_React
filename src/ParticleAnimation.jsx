import React, { useEffect, useRef } from 'react';

const ParticleAnimation = () => {
    const canvasRef = useRef(null);
    const zIndex = -1; // Canvas z-index
    const opacity = 0.5; // Canvas opacity
    const color = "0,0,0"; // Line color (RGB)
    const particleCount = 99; // Number of particles

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width, height;

        // Resize canvas to fit the window
        const resizeCanvas = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.onresize = resizeCanvas;

        // Mouse tracking
        const mouse = { x: null, y: null, max: 20000 };
        window.onmousemove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.onmouseout = () => {
            mouse.x = null;
            mouse.y = null;
        };

        // Generate particles
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                xa: 2 * Math.random() - 1,
                ya: 2 * Math.random() - 1,
                max: 6000,
            });
        }

        // Animation function
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            const allParticles = [mouse].concat(particles);
            particles.forEach((particle) => {
                // Move particle
                particle.x += particle.xa;
                particle.y += particle.ya;

                // Bounce off edges
                particle.xa *= particle.x > width || particle.x < 0 ? -1 : 1;
                particle.ya *= particle.y > height || particle.y < 0 ? -1 : 1;

                // Draw particle
                ctx.fillRect(particle.x - 0.5, particle.y - 0.5, 1, 1);

                // Draw lines between close particles
                for (let other of allParticles) {
                    if (particle === other || other.x === null || other.y === null) continue;
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = dx * dx + dy * dy;

                    if (distance < other.max) {
                        if (other === mouse && distance >= other.max / 2) {
                            particle.x -= 0.03 * dx;
                            particle.y -= 0.03 * dy;
                        }
                        const alpha = (other.max - distance) / other.max;
                        ctx.beginPath();
                        ctx.lineWidth = alpha / 2;
                        ctx.strokeStyle = `rgba(${color},${alpha + 0.2})`;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
                allParticles.splice(allParticles.indexOf(particle), 1);
            });
            requestAnimationFrame(animate);
        };

        // Append canvas to body and start animation
        canvas.style.cssText = `position:fixed;top:0;left:0;z-index:${zIndex};opacity:${opacity}`;
        document.body.appendChild(canvas);
        animate();

        return () => {
            window.onresize = null;
            window.onmousemove = null;
            window.onmouseout = null;
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default ParticleAnimation;
