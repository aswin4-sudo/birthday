document.addEventListener('DOMContentLoaded', function() {
    console.log("🎂 Birthday website loaded for ABHI! 🎂");
    
    // Initialize all features
    initCandle();
    initCutCake();
    initReasons();
    initPhotos();
    initCelebrationButtons();
    createFloatingHearts();
    createBalloons();
    createConfetti();
    initCountdown();
    initSpecialPhoto(); 
    
    // 1. Candle Functionality
    function initCandle() {
        const wishCandle = document.getElementById('wishCandle');
        const wishFlame = document.getElementById('wishFlame');
        const resetCandleBtn = document.getElementById('resetCandle');
        
        if (wishCandle && wishFlame) {
            // Make candle clickable
            wishCandle.style.cursor = 'pointer';
            
            wishCandle.addEventListener('click', function() {
                // Blow out candle
                wishFlame.style.opacity = '0';
                wishFlame.style.animation = 'none';
                
                // Create poof effect
                const rect = wishCandle.getBoundingClientRect();
                createPoofEffect(rect.left + 25, rect.top);
                
                // Create mini heart explosion
                createMiniHearts(rect.left + 25, rect.top);
                
                setTimeout(() => {
                    alert("🎉 Your wish has been sent to the universe! May it come true for our beautiful ABHI! 🌟");
                }, 500);
            });
            
            resetCandleBtn.addEventListener('click', function() {
                // Relight candle
                wishFlame.style.opacity = '1';
                wishFlame.style.animation = 'flicker 1.5s infinite alternate';
                
                // Button feedback
                resetCandleBtn.innerHTML = '<i class="fas fa-check"></i> Candle Relit!';
                resetCandleBtn.style.background = 'linear-gradient(to right, #4caf50, #8bc34a)';
                
                setTimeout(() => {
                    resetCandleBtn.innerHTML = 'Relight Candle';
                    resetCandleBtn.style.background = 'linear-gradient(to right, #ff4081, #7b1fa2)';
                }, 2000);
            });
        }
    }
    
    // 2. Cut Cake Functionality
    function initCutCake() {
        const cutCakeBtn = document.getElementById('cutCakeBtn');
        const birthdayCake = document.getElementById('birthdayCake');
        
        if (cutCakeBtn && birthdayCake) {
            cutCakeBtn.addEventListener('click', function() {
                // Disable button during animation
                cutCakeBtn.disabled = true;
                
                // Add cut animation class
                birthdayCake.classList.add('cake-cut-animation');
                
                // Create knife animation
                const knife = document.createElement('div');
                knife.className = 'knife-animation';
                knife.innerHTML = '🔪';
                knife.style.position = 'absolute';
                knife.style.left = '50%';
                knife.style.top = '50%';
                knife.style.transform = 'translate(-50%, -50%)';
                
                birthdayCake.appendChild(knife);
                
                // Create cake cutting confetti
                createCakeConfetti();
                
                // Create heart explosion
                createHeartExplosion();
                
                // Show success message
                setTimeout(() => {
                    alert("🎂 Cake cut successfully! 🍰\n\nFirst piece for our birthday girl ABHI! May all your wishes come true! 💕");
                    
                    // Update button
                    cutCakeBtn.innerHTML = '<i class="fas fa-check"></i> Cake Cut Successfully!';
                    cutCakeBtn.style.background = 'linear-gradient(to right, #4caf50, #8bc34a)';
                }, 1000);
                
                // Remove knife after animation
                setTimeout(() => {
                    if (knife.parentNode) {
                        knife.remove();
                    }
                }, 1000);
                
                // Re-enable button after animation
                setTimeout(() => {
                    cutCakeBtn.disabled = false;
                }, 1500);
            });
        }
    }
    
    // 3. Show More Reasons
    function initReasons() {
        const showMoreBtn = document.getElementById('showMore');
        const moreReasons = document.getElementById('moreReasons');
        
        if (showMoreBtn && moreReasons) {
            showMoreBtn.addEventListener('click', function() {
                if (moreReasons.classList.contains('hidden')) {
                    // Show more reasons
                    moreReasons.classList.remove('hidden');
                    showMoreBtn.textContent = 'Show Fewer Reasons';
                    showMoreBtn.style.background = 'linear-gradient(to right, #2196f3, #21cbf3)';
                    
                    // Create celebration effect
                    createMiniHearts(window.innerWidth/2, window.innerHeight/2);
                    
                    // Scroll to show all reasons
                    setTimeout(() => {
                        showMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                } else {
                    // Hide reasons
                    moreReasons.classList.add('hidden');
                    showMoreBtn.textContent = 'Show More Reasons';
                    showMoreBtn.style.background = 'linear-gradient(to right, #ff4081, #7b1fa2)';
                }
            });
        }
    }
    
    // 4. Photo Gallery Interactions
    function initPhotos() {
        const photos = document.querySelectorAll('.photo');
        photos.forEach(photo => {
            photo.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(1.2) rotate(5deg)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
                
                // Create mini hearts around photo
                const rect = this.getBoundingClientRect();
                createMiniHearts(rect.left + 75, rect.top + 75);
                
                // Reset after animation
                setTimeout(() => {
                    this.style.transform = 'scale(1) rotate(0deg)';
                    this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
                }, 300);
            });
        });
    }
    
    // 5. Celebration Buttons
    function initCelebrationButtons() {
        const heartBtn = document.getElementById('heartExplosionBtn');
        const confettiBtn = document.getElementById('confettiBtn');
        const balloonBtn = document.getElementById('balloonBtn');
        
        if (heartBtn) {
            heartBtn.addEventListener('click', function() {
                createHeartExplosion();
                heartBtn.innerHTML = '<i class="fas fa-heart"></i> Hearts Everywhere!';
                setTimeout(() => {
                    heartBtn.innerHTML = '<i class="fas fa-heart"></i> Heart Explosion';
                }, 2000);
            });
        }
        
        if (confettiBtn) {
            confettiBtn.addEventListener('click', function() {
                createExtraConfetti();
                confettiBtn.innerHTML = '<i class="fas fa-birthday-cake"></i> Confetti Rain!';
                setTimeout(() => {
                    confettiBtn.innerHTML = '<i class="fas fa-birthday-cake"></i> More Confetti';
                }, 2000);
            });
        }
        
        if (balloonBtn) {
            balloonBtn.addEventListener('click', function() {
                releaseBalloons();
                balloonBtn.innerHTML = '<i class="fas fa-air-freshener"></i> Balloons Released!';
                setTimeout(() => {
                    balloonBtn.innerHTML = '<i class="fas fa-air-freshener"></i> Release Balloons';
                }, 2000);
            });
        }
    }
    
    // 6. Countdown Timer
    function initCountdown() {
        function updateCountdown() {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const diff = endOfDay - now;
            
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            // Add animation every minute
            if (seconds === 0) {
                if (secondsEl) {
                    secondsEl.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        secondsEl.style.transform = 'scale(1)';
                    }, 300);
                }
            }
        }
        
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }
    
    // 7. Cake Confetti Effect - ONLY ONE DEFINITION
    function createCakeConfetti() {
        const cake = document.getElementById('birthdayCake');
        if (!cake) return;
        
        const colors = ['#ff4081', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * 100 + '%';
                confetti.style.position = 'absolute';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.borderRadius = '50%';
                confetti.style.zIndex = '1000';
                confetti.style.pointerEvents = 'none';
                
                cake.appendChild(confetti);
                
                // Animate confetti
                let x = Math.random() * 100 - 50;
                let y = -50;
                let opacity = 1;
                
                function animate() {
                    y += 2;
                    x += Math.sin(y / 10) * 0.5;
                    opacity -= 0.02;
                    
                    confetti.style.transform = `translate(${x}px, ${y}px)`;
                    confetti.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }
                }
                
                requestAnimationFrame(animate);
                
            }, i * 50);
        }
    }
    
    // 8. Heart Explosion Effect
    function createHeartExplosion() {
        const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞'];
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.position = 'fixed';
                heart.style.fontSize = Math.random() * 30 + 20 + 'px';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = '100vh';
                heart.style.opacity = 0.8;
                heart.style.zIndex = '1000';
                heart.style.pointerEvents = 'none';
                
                document.body.appendChild(heart);
                
                // Animate heart
                let y = 100;
                const speed = Math.random() * 3 + 2;
                
                function floatUp() {
                    y -= speed;
                    heart.style.top = y + 'vh';
                    heart.style.opacity = y / 100;
                    
                    if (y > -10) {
                        requestAnimationFrame(floatUp);
                    } else {
                        if (heart.parentNode) {
                            heart.remove();
                        }
                    }
                }
                
                floatUp();
                
            }, i * 100);
        }
    }
    
    // 9. Mini Hearts Effect (for small celebrations)
    function createMiniHearts(x, y) {
        const hearts = ['❤️', '💕', '💖'];
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.position = 'fixed';
                heart.style.fontSize = '20px';
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                heart.style.opacity = 0.8;
                heart.style.zIndex = '1000';
                heart.style.pointerEvents = 'none';
                
                document.body.appendChild(heart);
                
                // Animate in random directions
                let posX = 0;
                let posY = 0;
                const speedX = Math.random() * 4 - 2;
                const speedY = Math.random() * -3 - 1;
                let opacity = 0.8;
                
                function animate() {
                    posX += speedX;
                    posY += speedY;
                    opacity -= 0.02;
                    
                    heart.style.transform = `translate(${posX}px, ${posY}px)`;
                    heart.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        if (heart.parentNode) {
                            heart.remove();
                        }
                    }
                }
                
                animate();
                
            }, i * 50);
        }
    }
    
    // 10. Extra Confetti Effect
    function createExtraConfetti() {
        const container = document.querySelector('.confetti-container');
        if (!container) return;
        
        const colors = ['#ff4081', '#7b1fa2', '#2196f3', '#4caf50', '#ffeb3b'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.opacity = 0.8;
                confetti.style.zIndex = '1000';
                
                container.appendChild(confetti);
                
                // Animate falling
                let y = -10;
                const speed = Math.random() * 3 + 2;
                const xDrift = Math.random() * 2 - 1;
                
                function fall() {
                    y += speed;
                    confetti.style.top = y + 'px';
                    confetti.style.transform = `translateX(${xDrift * (y/10)}px)`;
                    
                    if (y < window.innerHeight + 10) {
                        requestAnimationFrame(fall);
                    } else {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }
                }
                
                fall();
                
            }, i * 50);
        }
    }
    
    // 11. Release Balloons Effect
    function releaseBalloons() {
        const container = document.querySelector('.balloons-container');
        if (!container) return;
        
        const colors = ['#ff4081', '#7b1fa2', '#2196f3', '#4caf50', '#ff9800'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                balloon.style.position = 'fixed';
                balloon.style.width = '60px';
                balloon.style.height = '80px';
                balloon.style.left = Math.random() * 100 + 'vw';
                balloon.style.bottom = '-80px';
                balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                balloon.style.borderRadius = '50%';
                balloon.style.opacity = 0.7;
                balloon.style.zIndex = '1000';
                
                container.appendChild(balloon);
                
                // Animate rising
                let y = -80;
                const speed = Math.random() * 2 + 1;
                const xDrift = Math.random() * 2 - 1;
                
                function rise() {
                    y += speed;
                    balloon.style.bottom = y + 'px';
                    balloon.style.transform = `translateX(${xDrift * (y/20)}px)`;
                    
                    if (y < window.innerHeight + 80) {
                        requestAnimationFrame(rise);
                    } else {
                        if (balloon.parentNode) {
                            balloon.remove();
                        }
                    }
                }
                
                rise();
                
            }, i * 200);
        }
    }
    
    // 12. Poof Effect for Candle
    function createPoofEffect(x, y) {
        const poof = document.createElement('div');
        poof.style.position = 'fixed';
        poof.style.left = x + 'px';
        poof.style.top = y + 'px';
        poof.style.width = '40px';
        poof.style.height = '40px';
        poof.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        poof.style.borderRadius = '50%';
        poof.style.zIndex = '1000';
        poof.style.transform = 'translate(-50%, -50%)';
        poof.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
        
        document.body.appendChild(poof);
        
        let size = 40;
        let opacity = 0.8;
        
        function animate() {
            size += 3;
            opacity -= 0.05;
            
            poof.style.width = size + 'px';
            poof.style.height = size + 'px';
            poof.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                if (poof.parentNode) {
                    poof.remove();
                }
            }
        }
        
        animate();
    }
    
    // 13. Background Floating Hearts
    function createFloatingHearts() {
        const container = document.querySelector('.hearts-container');
        if (!container) return;
        
        for (let i = 0; i < 25; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            heart.style.animation = `float ${Math.random() * 5 + 5}s infinite ease-in-out`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(heart);
        }
    }
    
    // 14. Background Balloons
    function createBalloons() {
        const container = document.querySelector('.balloons-container');
        if (!container) return;
        
        const colors = ['#ff4081', '#7b1fa2', '#2196f3', '#4caf50', '#ff9800'];
        
        for (let i = 0; i < 15; i++) {
            const balloon = document.createElement('div');
            balloon.style.position = 'absolute';
            balloon.style.width = '50px';
            balloon.style.height = '70px';
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.top = '100vh';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.borderRadius = '50%';
            balloon.style.opacity = 0.5;
            
            container.appendChild(balloon);
            
            // Animate balloon
            let y = 100;
            const speed = Math.random() * 0.5 + 0.3;
            
            function float() {
                y -= speed;
                balloon.style.top = y + 'vh';
                
                if (y > -20) {
                    requestAnimationFrame(float);
                } else {
                    y = 100;
                    balloon.style.left = Math.random() * 100 + 'vw';
                    float();
                }
            }
            
            float();
        }
    }
    
    // 15. Background Confetti
    function createConfetti() {
        const container = document.querySelector('.confetti-container');
        if (!container) return;
        
        const colors = ['#ff4081', '#7b1fa2', '#2196f3', '#4caf50', '#ffeb3b'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * 100 + 'vh';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.opacity = 0.7;
            container.appendChild(confetti);
            
            // Animate confetti piece
            let x = parseFloat(confetti.style.left);
            let y = parseFloat(confetti.style.top);
            const speedX = Math.random() * 0.3 - 0.15;
            const speedY = Math.random() * 0.3 - 0.15;
            
            function move() {
                x += speedX;
                y += speedY;
                
                if (x > 100) x = 0;
                if (x < 0) x = 100;
                if (y > 100) y = 0;
                if (y < 0) y = 100;
                
                confetti.style.left = x + 'vw';
                confetti.style.top = y + 'vh';
                
                requestAnimationFrame(move);
            }
            
            move();
        }
    }
    
    console.log("✅ Birthday website fully loaded! All features working perfectly! 🎉");
    
    // Auto-create a small celebration when page loads
    setTimeout(() => {
        createMiniHearts(window.innerWidth/2, window.innerHeight/2);
    }, 1500);
});
    // 16. Special Photo Effects
    function initSpecialPhoto() {
        const specialPhoto = document.getElementById('specialPhoto');
        const revealBtn = document.getElementById('revealPhotoBtn');
        const sparklesBtn = document.getElementById('addSparklesBtn');
        const loveEffectBtn = document.getElementById('loveEffectBtn');
        
        if (specialPhoto) {
            // Photo click effect
            specialPhoto.addEventListener('click', function() {
                // Add click animation
                this.classList.add('photo-reveal');
                
                // Create hearts around photo
                createPhotoHearts(this);
                
                // Add glow effect
                this.classList.add('photo-glow');
                
                setTimeout(() => {
                    this.classList.remove('photo-reveal');
                    alert("📸 This photo captures a beautiful memory of ABHI! 💕\n\nMay this moment be remembered forever in your heart!");
                }, 500);
            });
            
            // Photo hover effect
            specialPhoto.addEventListener('mouseenter', function() {
                createMiniSparkles(this.getBoundingClientRect());
            });
        }
        
        // Reveal Photo Button
        if (revealBtn) {
            revealBtn.addEventListener('click', function() {
                // Add reveal animation to photo
                specialPhoto.classList.add('photo-reveal');
                
                // Create celebration effect
                createPhotoRevealEffect();
                
                // Update button
                revealBtn.innerHTML = '<i class="fas fa-check"></i> Photo Revealed!';
                revealBtn.style.background = 'linear-gradient(to right, #4caf50, #2e7d32)';
                
                setTimeout(() => {
                    revealBtn.innerHTML = '<i class="fas fa-gift"></i> Reveal Special Photo';
                    revealBtn.style.background = 'linear-gradient(to right, #e91e63, #c2185b)';
                    specialPhoto.classList.remove('photo-reveal');
                }, 2000);
            });
        }
        
        // Add Sparkles Button
        if (sparklesBtn) {
            sparklesBtn.addEventListener('click', function() {
                createPhotoSparkles();
                
                // Update button
                sparklesBtn.innerHTML = '<i class="fas fa-sparkles"></i> Sparkles Added!';
                sparklesBtn.style.background = 'linear-gradient(to right, #ff9800, #ff5722)';
                
                setTimeout(() => {
                    sparklesBtn.innerHTML = '<i class="fas fa-sparkles"></i> Add Sparkles';
                    sparklesBtn.style.background = 'linear-gradient(to right, #e91e63, #c2185b)';
                }, 2000);
            });
        }
        
        // Love Effect Button
        if (loveEffectBtn) {
            loveEffectBtn.addEventListener('click', function() {
                createPhotoLoveEffect();
                
                // Update button
                loveEffectBtn.innerHTML = '<i class="fas fa-heart"></i> Love Added!';
                loveEffectBtn.style.background = 'linear-gradient(to right, #e91e63, #880e4f)';
                
                setTimeout(() => {
                    loveEffectBtn.innerHTML = '<i class="fas fa-heart-circle-plus"></i> Love Effect';
                    loveEffectBtn.style.background = 'linear-gradient(to right, #e91e63, #c2185b)';
                }, 2000);
            });
        }
    }
    
    // 17. Photo Sparkles Effect
    function createPhotoSparkles() {
        const photo = document.getElementById('specialPhoto');
        if (!photo) return;
        
        const rect = photo.getBoundingClientRect();
        const symbols = ['✨', '🌟', '⭐', '💫', '⚡'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'photo-sparkle';
                sparkle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                sparkle.style.left = Math.random() * (rect.width - 30) + rect.left + 'px';
                sparkle.style.top = Math.random() * (rect.height - 30) + rect.top + 'px';
                sparkle.style.color = ['#ffeb3b', '#ff9800', '#ff4081', '#4caf50'][Math.floor(Math.random() * 4)];
                
                document.body.appendChild(sparkle);
                
                // Animate sparkle
                let opacity = 1;
                let scale = 1;
                
                function animateSparkle() {
                    opacity -= 0.02;
                    scale += 0.01;
                    
                    sparkle.style.opacity = opacity;
                    sparkle.style.transform = `scale(${scale})`;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animateSparkle);
                    } else {
                        if (sparkle.parentNode) {
                            sparkle.remove();
                        }
                    }
                }
                
                animateSparkle();
                
            }, i * 50);
        }
    }
    
    // 18. Photo Love Effect
    function createPhotoLoveEffect() {
        const photo = document.getElementById('specialPhoto');
        if (!photo) return;
        
        const rect = photo.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Add glow to photo
        photo.classList.add('photo-glow');
        
        // Create hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'photo-heart';
                heart.innerHTML = '❤️';
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.color = '#ff4081';
                
                document.body.appendChild(heart);
                
                // Random direction
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 2;
                
                function animateHeart() {
                    const rect = heart.getBoundingClientRect();
                    let x = parseFloat(heart.style.left);
                    let y = parseFloat(heart.style.top);
                    
                    x += Math.cos(angle) * speed;
                    y += Math.sin(angle) * speed;
                    heart.style.opacity = parseFloat(heart.style.opacity) - 0.01;
                    
                    heart.style.left = x + 'px';
                    heart.style.top = y + 'px';
                    
                    if (heart.style.opacity > 0) {
                        requestAnimationFrame(animateHeart);
                    } else {
                        if (heart.parentNode) {
                            heart.remove();
                        }
                    }
                }
                
                heart.style.opacity = '1';
                animateHeart();
                
            }, i * 100);
        }
        
        // Remove glow after 3 seconds
        setTimeout(() => {
            photo.classList.remove('photo-glow');
        }, 3000);
    }
    
    // 19. Photo Reveal Effect
    function createPhotoRevealEffect() {
        const photo = document.getElementById('specialPhoto');
        if (!photo) return;
        
        // Add border animation
        photo.style.border = '5px solid transparent';
        photo.style.background = 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #ff4081, #7b1fa2, #2196f3) border-box';
        
        // Create confetti around photo
        const rect = photo.getBoundingClientRect();
        createMiniHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
        
        // Add message
        setTimeout(() => {
            const message = document.createElement('div');
            message.innerHTML = '🎉 For ABHI! 🎉';
            message.style.position = 'fixed';
            message.style.top = rect.top - 50 + 'px';
            message.style.left = rect.left + rect.width / 2 + 'px';
            message.style.transform = 'translateX(-50%)';
            message.style.background = 'linear-gradient(to right, #ff4081, #7b1fa2)';
            message.style.color = 'white';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '20px';
            message.style.fontWeight = 'bold';
            message.style.zIndex = '1000';
            message.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            
            document.body.appendChild(message);
            
            // Animate message
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateX(-50%) translateY(-20px)';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.remove();
                    }
                }, 500);
            }, 1500);
        }, 300);
    }
    
    // 20. Mini Sparkles on Hover
    function createMiniSparkles(rect) {
        const symbols = ['✨', '🌟'];
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                sparkle.style.position = 'fixed';
                sparkle.style.fontSize = '16px';
                sparkle.style.left = Math.random() * rect.width + rect.left + 'px';
                sparkle.style.top = Math.random() * rect.height + rect.top + 'px';
                sparkle.style.zIndex = '10';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.color = '#ffeb3b';
                
                document.body.appendChild(sparkle);
                
                // Fade out
                setTimeout(() => {
                    sparkle.style.opacity = '0';
                    sparkle.style.transform = 'scale(1.5)';
                    setTimeout(() => {
                        if (sparkle.parentNode) {
                            sparkle.remove();
                        }
                    }, 300);
                }, 300);
                
            }, i * 100);
        }
    }
    
    // 21. Create Hearts Around Photo
    function createPhotoHearts(photoElement) {
        const rect = photoElement.getBoundingClientRect();
        const hearts = ['❤️', '💖', '💕'];
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = '24px';
            heart.style.left = rect.left + rect.width / 2 + 'px';
            heart.style.top = rect.top + rect.height / 2 + 'px';
            heart.style.zIndex = '10';
            heart.style.pointerEvents = 'none';
            heart.style.color = '#ff4081';
            
            document.body.appendChild(heart);
            
            // Animate outwards
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            let currentDistance = 0;
            
            function animate() {
                currentDistance += 5;
                const x = Math.cos(angle) * currentDistance;
                const y = Math.sin(angle) * currentDistance;
                
                heart.style.transform = `translate(${x}px, ${y}px)`;
                heart.style.opacity = 1 - (currentDistance / distance);
                
                if (currentDistance < distance) {
                    requestAnimationFrame(animate);
                } else {
                    if (heart.parentNode) {
                        heart.remove();
                    }
                }
            }
            
            animate();
        }
    }


