document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const ballsContainer = document.getElementById('balls');
    const gameArea = document.getElementById('gameArea');
    const livesContainer = document.getElementById('lives');
    const scoreDisplay = document.getElementById('score');
    const hitSound = document.getElementById('hitSound');
    const missSound = document.getElementById('missSound');
    const playerWidth = player.offsetWidth;
    const playerHeight = player.offsetHeight;
    let playerPosition = { x: gameArea.offsetWidth / 2 - playerWidth / 2 };
    let lives = 3;
    let score = 0;
    let ballInterval;
    const playerSpeed = 20; // Speed of player movement for keyboard control

    // Handle player movement with mouse
    document.addEventListener('mousemove', (event) => {
        const rect = gameArea.getBoundingClientRect();
        let x = event.clientX - rect.left;
        if (x < playerWidth / 2) x = playerWidth / 2;
        if (x > rect.width - playerWidth / 2) x = rect.width - playerWidth / 2;
        player.style.left = `${x - playerWidth / 2}px`;
        playerPosition.x = x - playerWidth / 2;
    });

    // Handle player movement with keyboard
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            movePlayer(-playerSpeed);
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            movePlayer(playerSpeed);
        }
    });

    // Function to move player with keyboard
    function movePlayer(distance) {
        const gameAreaWidth = gameArea.offsetWidth;
        playerPosition.x += distance;
        if (playerPosition.x < 0) playerPosition.x = 0;
        if (playerPosition.x > gameAreaWidth - playerWidth) playerPosition.x = gameAreaWidth - playerWidth;
        player.style.left = `${playerPosition.x}px`;
    }

    // Create balls
    function createBall() {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.left = `${Math.random() * (gameArea.offsetWidth - 50)}px`;
        ball.style.top = `-50px`;
        ballsContainer.appendChild(ball);

        // Animate ball falling
        const dropInterval = setInterval(() => {
            let top = parseFloat(ball.style.top);
            if (top > gameArea.offsetHeight) {
                clearInterval(dropInterval);
                ballsContainer.removeChild(ball);
                handleMiss();
            } else {
                ball.style.top = `${top + 5}px`;
            }

            // Check for collision
            const ballRect = ball.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            if (ballRect.bottom > playerRect.top &&
                ballRect.right > playerRect.left &&
                ballRect.left < playerRect.right) {
                clearInterval(dropInterval);
                ballsContainer.removeChild(ball);
                handleHit();
            }
        }, 20);
    }

    // Handle hit
    function handleHit() {
        hitSound.play();
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    // Handle miss
    function handleMiss() {
        missSound.play();
        lives -= 1;
        livesContainer.removeChild(livesContainer.lastChild);
        if (lives <= 0) {
            alert('Game Over!');
            stopGame();
        }
    }

    // Start the game
    function startGame() {
        ballInterval = setInterval(createBall, 1000);
    }

    // Stop the game
    function stopGame() {
        clearInterval(ballInterval);
    }

    startGame();
});
