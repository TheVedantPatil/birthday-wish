document.addEventListener('DOMContentLoaded', () => {
  
  // --- Screen Navigation Logic ---
  const screens = {
    s1: document.getElementById('screen1'),
    s2: document.getElementById('screen2'),
    s3: document.getElementById('screen3'),
    s4: document.getElementById('screen4'),
    s6: document.getElementById('screen6')
  };

  // 1. Add the restart button to your buttons object
  const buttons = {
    openBtn: document.getElementById('openButton'),
    cakeNext: document.getElementById('cakeNext'),
    next3: document.getElementById('next3'),
    wishBtn: document.getElementById('wishButton'),
    restartBtn: document.getElementById('restartButton') // <-- Added this line
  };

  // 2. Add the listener for the restart button
  buttons.restartBtn.addEventListener('click', () => {
    // Relight the candles so they are ready if she plays it again
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
      flame.classList.remove('off');
    });

    // Send her back to the first screen
    switchScreen(screens.s6, screens.s1);
  });

  function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove('active');
    showScreen.classList.add('active');
  }

  // Button Click Listeners
  buttons.openBtn.addEventListener('click', () => switchScreen(screens.s1, screens.s2));
  buttons.cakeNext.addEventListener('click', () => {
    // 1. Blow out all the candles
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
      flame.classList.add('off');
    });

    // 2. Shoot a little bit of confetti
    fireConfetti(30);

    // 3. Wait just a moment so she can see the candles go out, then switch screens
    setTimeout(() => {
      switchScreen(screens.s2, screens.s3);
    }, 800); // 800 milliseconds (0.8 seconds) delay
  });
  buttons.next3.addEventListener('click', () => switchScreen(screens.s3, screens.s4));
  buttons.wishBtn.addEventListener('click', () => {
    switchScreen(screens.s4, screens.s6);
    fireConfetti(100); // Trigger big confetti burst on final screen
  });

  // --- Candle Blowing Logic ---
  const candles = document.querySelectorAll('.candle');
  const hintText = document.querySelector('.hint');
  let blownCount = 0;

  candles.forEach(candle => {
    candle.addEventListener('click', function() {
      const flame = this.querySelector('.flame');
      
      // If flame is not already off, turn it off
      if (!flame.classList.contains('off')) {
        flame.classList.add('off');
        blownCount++;

        // Check if all 3 candles are blown out
        if (blownCount === candles.length) {
          setTimeout(() => {
            hintText.style.display = 'none'; // Hide the hint
            buttons.cakeNext.style.display = 'block'; // Show the next button
            fireConfetti(30); // Small confetti pop when candles go out
          }, 400); // slight delay to let the animation play
        }
      }
    });
  });

  // --- Confetti Effect ---
  function fireConfetti(amount = 50) {
    const container = document.getElementById('confetti');
    const colors = ['#ff477e', '#ff91a4', '#ffa502', '#2ed573', '#1e90ff'];

    for (let i = 0; i < amount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');

      // Randomize position, color, and falling speed
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.top = '-20px';
      
      const duration = Math.random() * 3 + 2; // fall duration between 2s and 5s
      confetti.style.animationDuration = duration + 's';
      
      // Randomize shapes (some squares, some thin rectangles)
      confetti.style.width = (Math.random() * 8 + 5) + 'px';
      confetti.style.height = (Math.random() * 15 + 5) + 'px';

      container.appendChild(confetti);

      // Clean up DOM after animation completes
      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }
  }

});