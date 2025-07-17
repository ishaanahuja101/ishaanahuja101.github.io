document.addEventListener('DOMContentLoaded', function() {
    // Mouse movement effect for floating shapes
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move shapes based on mouse position
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Typing animation for the title
    const titleElement = document.querySelector('.title');
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < titleText.length) {
            titleElement.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after name appears
    setTimeout(typeWriter, 1500);

    // Interactive hover effect for the main content card
    const content = document.querySelector('.content');
    content.addEventListener('mousemove', (e) => {
        const rect = content.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * 5;
        const rotateY = (x - centerX) / centerX * 5;
        
        content.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });

    content.addEventListener('mouseleave', () => {
        content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });

    // Add particle effect on link hover
    const links = document.querySelectorAll('.link');
    links.forEach(link => {
        link.addEventListener('mouseenter', createParticles);
    });

    function createParticles(e) {
        const rect = e.target.getBoundingClientRect();
        const particleCount = 6;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'rgba(255, 255, 255, 0.8)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * rect.height;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let opacity = 1;
            let x = startX;
            let y = startY;
            
            function animateParticle() {
                x += vx;
                y += vy;
                opacity -= 0.02;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
                    document.body.removeChild(particle);
                }
            }
            
            requestAnimationFrame(animateParticle);
        }
    }

    // Add breathing animation to orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        orb.addEventListener('animationiteration', () => {
            const randomScale = 0.8 + Math.random() * 0.4;
            orb.style.transform += ` scale(${randomScale})`;
        });
    });

    // Add subtle pulse to heart
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.addEventListener('click', () => {
            heart.style.animation = 'none';
            setTimeout(() => {
                heart.style.animation = 'heartbeat 0.5s ease-in-out 3, heartbeat 2s ease-in-out infinite 1.5s';
            }, 10);
        });
    }

    // Smooth scroll reveal for elements (if needed in future)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add random movement to shapes occasionally
    setInterval(() => {
        document.querySelectorAll('.shape').forEach(shape => {
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 100;
            
            shape.style.transition = 'transform 3s ease-out';
            shape.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            
            setTimeout(() => {
                shape.style.transition = 'none';
            }, 3000);
        });
    }, 8000);

    // Add shimmer effect to name on load
    const name = document.querySelector('.name');
    setTimeout(() => {
        name.style.background = 'linear-gradient(45deg, #fff 25%, rgba(255,255,255,0.3) 50%, #fff 75%)';
        name.style.backgroundSize = '200% 100%';
        name.style.webkitBackgroundClip = 'text';
        name.style.backgroundClip = 'text';
        name.style.animation += ', shimmer 3s ease-in-out infinite';
        
        // Add shimmer keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
        `;
        document.head.appendChild(style);
    }, 2000);
});