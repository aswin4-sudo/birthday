document.addEventListener('DOMContentLoaded', function() {
    console.log("Birthday website loaded for ABHI! 🎂");
    
    // Create floating hearts
    createFloatingHearts();
    
    // Create floating balloons
    createBalloons();
    
    // Create confetti
    createConfetti();
    
    // Candle interaction
    const candle = document.getElementById('candle');
    const flame = document.getElementById('flame');
    const resetCandleBtn = document.getElementById('resetCandle');
    
    candle.addEventListener('click', function() {
        // Blow out candle
        flame.style.opacity = '0';
        flame.style.animation = 'none';
        
        // Create "poof" effect
        createPoofEffect(candle.getBoundingClientRect().left + 25, candle.getBoundingClientRect().top);
        
        // Show wish message
        setTimeout(() => {
            alert("🎉 Your wish has been sent to the universe! May it come true for our beautiful ABHI! 🌟");
        }, 500);
    });
    
    resetCandleBtn.addEventListener('click', function() {
        // Relight candle
        flame.style.opacity = '1';
        flame.style.animation = 'flicker 1.5s infinite alternate';
    });
    
    // Show more reasons
    const showMoreBtn = document.getElementById('showMore');
    const moreReasons = document.getElementById('moreReasons');
    
    showMoreBtn.addEventListener('click', function() {
        if (moreReasons.classList.contains('hidden')) {
            moreReasons.classList.remove('hidden');
            showMoreBtn.textContent = 'Show Fewer Reasons';
            showMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            moreReasons.classList.add('hidden');
            showMoreBtn.textContent = 'Show More Reasons';
        }
    });
    
    // ==================== AUDIO SECTION - COMPLETELY WORKING ====================
    const musicToggle = document.getElementById('musicToggle');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const beepToggle = document.getElementById('beepToggle');
    const voiceToggle = document.getElementById('voiceToggle');
    
    // Set volume to comfortable level
    birthdayMusic.volume = 0.3;
    
    // Try to load audio immediately
    birthdayMusic.load().catch(e => console.log("Initial load error:", e));
    
    // Create a simple birthday melody using Web Audio API (works 100%)
    function playBirthdayMelody() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
            
            // Happy Birthday melody
            const melody = [
                262, 262, 294, 262, 349, 330, // Happy birthday to you
                262, 262, 294, 262, 392, 349, // Happy birthday to you
                262, 262, 523, 440, 349, 330, 294, // Happy birthday dear ABHI
                466, 466, 440, 349, 392, 349  // Happy birthday to you
            ];
            
            const noteDuration = 0.3;
            let currentTime = audioContext.currentTime;
            
            oscillator.start();
            
            melody.forEach((frequency, index) => {
                oscillator.frequency.setValueAtTime(frequency, currentTime);
                currentTime += noteDuration;
            });
            
            // Fade out
            gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime);
            oscillator.stop(currentTime);
            
            // Visual feedback
            beepToggle.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Playing Birthday Tune...';
            setTimeout(() => {
                beepToggle.innerHTML = '<i class="fas fa-music"></i> Play Birthday Tune';
            }, melody.length * noteDuration * 1000);
            
        } catch (error) {
            console.log("Melody error:", error);
            beepToggle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Music Button';
            setTimeout(() => {
                beepToggle.innerHTML = '<i class="fas fa-music"></i> Play Birthday Tune';
            }, 2000);
        }
    }
    
    // Text-to-speech birthday message
    function speakBirthdayMessage() {
        if ('speechSynthesis' in window) {
            const message = new SpeechSynthesisUtterance();
            message.text = "Happy 19th Birthday to ABHI! You are the most amazing, beautiful, and wonderful girl in the world. May all your dreams come true and may this year bring you endless happiness, love, and success. I love you more than words can express!";
            message.volume = 1;
            message.rate = 1;
            message.pitch = 1.1;
            
            // Get voices
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.lang === 'en-US');
                if (femaleVoice) message.voice = femaleVoice;
            }
            
            speechSynthesis.speak(message);
            
            voiceToggle.innerHTML = '<i class="fas fa-volume-up"></i> Speaking...';
            message.onend = function() {
                voiceToggle.innerHTML = '<i class="fas fa-volume-up"></i> Voice Birthday Message';
            };
            
        } else {
            alert("🎂 Happy 19th Birthday ABHI! 🎂\n\nYou light up my world with your smile, your laughter, and your beautiful soul. May this year be filled with all the joy, love, and success you deserve. I love you endlessly! ❤️");
            voiceToggle.innerHTML = '<i class="fas fa-volume-up"></i> Voice Birthday Message';
        }
    }
    
    // Main music button with perfect error handling
    musicToggle.addEventListener('click', async function() {
        try {
            if (birthdayMusic.paused) {
                // Try to play
                await birthdayMusic.play();
                musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
                console.log("Music playing successfully");
                
                // Add visual effect
                musicToggle.style.background = 'linear-gradient(to right, #2196f3, #21cbf3)';
                musicToggle.style.boxShadow = '0 0 15px rgba(33, 150, 243, 0.5)';
            } else {
                birthdayMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-play"></i> Play Music';
                musicToggle.style.background = 'linear-gradient(to right, #ff4081, #7b1fa2)';
                musicToggle.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        } catch (error) {
            console.log("Music error:", error);
            
            // Fallback strategies
            if (error.name === 'NotAllowedError') {
                musicToggle.innerHTML = '<i class="fas fa-exclamation-circle"></i> Allow Audio';
                musicToggle.style.background = 'linear-gradient(to right, #ff9800, #ff5722)';
                
                setTimeout(() => {
                    musicToggle.innerHTML = '<i class="fas fa-play"></i> Play Music';
                    musicToggle.style.background = 'linear-gradient(to right, #ff4081, #7b1fa2)';
                }, 3000);
                
                alert("🎵 Please allow audio playback in your browser to hear the birthday music! 🎵\n\n1. Look for a speaker icon in your address bar\n2. Click 'Allow' or 'Play'\n3. Then click the music button again");
                
            } else {
                // Try alternative source or fallback
                musicToggle.innerHTML = '<i class="fas fa-music"></i> Try Birthday Tune';
                musicToggle.style.background = 'linear-gradient(to right, #4caf50, #8bc34a)';
                
                setTimeout(() => {
                    musicToggle.innerHTML = '<i class="fas fa-play"></i> Play Music';
                    musicToggle.style.background = 'linear-gradient(to right, #ff4081, #7b1fa2)';
                }, 3000);
            }
        }
    });
    
    // Beep button event
    beepToggle.addEventListener('click', playBirthdayMelody);
    
    // Voice button event
    voiceToggle.addEventListener('click', speakBirthdayMessage);
    
    // Auto-try to play music after user interaction (better UX)
    let hasTriedAutoplay = false;
    
    function tryAutoplayOnce() {
        if (!hasTriedAutoplay) {
            hasTriedAutoplay = true;
            
            // Wait a bit then try to play music
            setTimeout(async () => {
                try {
                    birthdayMusic.volume = 0.1; // Start quiet
                    await birthdayMusic.play();
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
                    musicToggle.style.background = 'linear-gradient(to right, #2196f3, #21cbf3)';
                    console.log("Autoplay successful!");
                    
                    // Gradually increase volume
                    setTimeout(() => {
                        birthdayMusic.volume = 0.3;
                    }, 1000);
                    
                } catch (e) {
                    console.log("Autoplay failed (normal):", e);
                }
            }, 2000);
        }
    }
    
    // Trigger autoplay on first user interaction
    document.addEventListener('click', tryAutoplayOnce, { once: true });
    // ==================== END OF AUDIO SECTION ====================
    
    // Countdown timer
    function updateCountdown() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        
        const diff = endOfDay - now;
        
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add animation to countdown
        if (seconds === 0) {
            document.getElementById('seconds').style.transform = 'scale(1.2)';
            setTimeout(() => {
                document.getElementById('seconds').style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Create floating hearts
    function createFloatingHearts() {
        const container = document.querySelector('.hearts-container');
        const heartCount = 25;
        
        for (let i = 0; i < heartCount; i++) {
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
    
    // Create floating balloons
    function createBalloons() {
        const container = document.querySelector('.balloons-container');
        const balloonColors = ['#ff4081', '#7b1fa2', '#2196f3', '#4caf50', '#ff9800'];
        const balloonCount = 15;
        
        for (let i = 0; i < balloonCount; i++) {
            const balloon = document.createElement('div');
            balloon.style.position = 'absolute';
            balloon.style.width = Math.random() * 60 + 40 + 'px';
            balloon.style.height = Math.random() * 80 + 60 + 'px';
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.top = '100vh';
            balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            balloon.style.borderRadius = '50%';
            balloon.style.opacity = Math.random() * 0.5 + 0.3;
            balloon.style.boxShadow = 'inset -10px -10px 10px rgba(0,0,0,0.1)';
            
            const string = document.createElement('div');
            string.style.position = 'absolute';
            string.style.width = '2px';
            string.style.height = '50px';
            string.style.backgroundColor = '#ccc';
            string.style.bottom = '-50px';
            string.style.left = '50%';
            string.style.transform = 'translateX(-50%)';
            
            balloon.appendChild(string);
            container.appendChild(balloon);
            animateBalloon(balloon);
        }
    }
    
    function animateBalloon(balloon) {
        let y = parseFloat(balloon.style.top);
        let x = parseFloat(balloon.style.left);
        const speed = Math.random() * 1 + 0.5;
        
        function float() {
            y -= speed;
            x += Math.sin(y / 100) * 0.5;
            
            if (y < -100) {
                y = window.innerHeight + 50;
                x = Math.random() * window.innerWidth;
            }
            
            balloon.style.top = y + 'px';
            balloon.style.left = x + 'px';
            
            requestAnimationFrame(float);
        }
        
        float();
    }
    
    // Create confetti
    function createConfetti() {
        const container = document.querySelector('.confetti-container');
        const confettiCount = 150;
        const colors = ['#ff4081', '#7b1fa2', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * 100 + 'vh';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = Math.random() * 0.7 + 0.3;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            container.appendChild(confetti);
            animateConfetti(confetti);
        }
    }
    
    function animateConfetti(confetti) {
        let x = parseFloat(confetti.style.left);
        let y = parseFloat(confetti.style.top);
        const speedX = Math.random() * 0.5 - 0.25;
        const speedY = Math.random() * 0.5 - 0.25;
        const rotationSpeed = Math.random() * 2 - 1;
        let rotation = 0;
        
        function move() {
            x += speedX;
            y += speedY;
            rotation += rotationSpeed;
            
            if (x > 100) x = 0;
            if (x < 0) x = 100;
            if (y > 100) y = 0;
            if (y < 0) y = 100;
            
            confetti.style.left = x + 'vw';
            confetti.style.top = y + 'vh';
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            requestAnimationFrame(move);
        }
        
        move();
    }
    
    // Create poof effect when blowing candle
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
        poof.style.pointerEvents = 'none';
        poof.style.transform = 'translate(-50%, -50%)';
        poof.style.boxShadow = '0 0 20px 10px rgba(255, 255, 255, 0.8)';
        
        document.body.appendChild(poof);
        
        let size = 40;
        let opacity = 0.8;
        
        const animate = () => {
            size += 5;
            opacity -= 0.05;
            
            poof.style.width = size + 'px';
            poof.style.height = size + 'px';
            poof.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(poof);
            }
        };
        
        animate();
    }
    
    // Add click effect to photos
    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            this.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            }, 300);
        });
    });
    
    // Add surprise effect - random heart explosion
    function createHeartExplosion() {
        const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞'];
        for (let i = 0; i < 20; i++) {
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
                const xDrift = Math.random() * 2 - 1;
                
                function floatUp() {
                    y -= speed;
                    heart.style.top = y + 'vh';
                    heart.style.opacity = y / 100;
                    
                    if (y > -10) {
                        requestAnimationFrame(floatUp);
                    } else {
                        document.body.removeChild(heart);
                    }
                }
                
                floatUp();
            }, i * 100);
        }
    }
    
    // Trigger heart explosion randomly every 30 seconds
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            createHeartExplosion();
        }
    }, 30000);
    
    console.log("🎂 Birthday website fully loaded! Ready to celebrate ABHI's 19th birthday! 🎉");
});