const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const GRAVITY = 0.5;
const scoresArea = document.getElementById('scores');
const jumpButton = document.querySelector('.jump-button');

class Player {
  constructor(position) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = 0;
    this.height = 128;
    this.speed = 8;
    this.scores = 0;

    this.rockPosX = canvas.width - 64;

    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.jump();
      }
    });
    jumpButton.addEventListener('click', (e) => {
      this.jump();
    });
  }

  draw() {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(this.position.x, this.position.y, 128, this.height);
  }

  update() {
    if (this.speed <= 0) return;

    this.pushRock();
    this.draw();
    this.position.y += this.velocity;
    if (this.position.y + this.height + this.velocity < canvas.height) {
      this.velocity += GRAVITY;
    } else {
      this.velocity = 0;
    }

    this.rockPosX -= this.speed;

    if (
      this.position.x === this.rockPosX &&
      this.position.y === canvas.height - this.height
    ) {
      this.gameOver();
    } else if (this.position.x === this.rockPosX) {
      this.scores++;
    }

    if (this.rockPosX < -64) {
      this.rockPosX = canvas.width;
    }
    // Update Scores
    scoresArea.textContent = `Scores: ${this.scores}`;
  }

  jump() {
    if (this.position.y === canvas.height - this.height) {
      this.position.y = 16;
    }
  }

  pushRock() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(this.rockPosX, canvas.height - 64, 64, 64);
  }

  gameOver() {
    console.log('OMG Game-Over');
    this.speed = 0;
    alert(`Game Over! Your scores: ${this.scores}`);
    this.scores = 0;
  }
}

class Rock {
  constructor() {
    this.position = {
      y: 128,
    };
  }
}
const player = new Player({ x: 128, y: 0 });

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
};

animate();
