class Dot {
  pos: vector;
  color: string;
  vel: vector;
  acc: vector;
  ctx: CanvasRenderingContext2D;
  ww: number;
  wh: number;
  constructor(
    posX: number,
    posY: number,
    velX: number,
    velY: number,
    ctx: CanvasRenderingContext2D,
    ww: number,
    wh: number
  ) {
    this.pos = {
      x: posX,
      y: posY,
    };
    this.color = 'rgba(255,255,255,0.2)';
    this.vel = {
      x: velX,
      y: velY,
    };
    this.acc = {
      x: 0,
      y: 0,
    };
    this.ctx = ctx;
    this.ww = ww;
    this.wh = wh;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, 3, 0, Math.PI * 2);
    this.ctx.fill();
  }
  update() {
    this.draw();
    if (this.pos.x > this.ww || this.pos.x < 0) {
      this.vel.x *= -1;
      if (this.pos.x > this.ww) {
        this.pos.x = this.ww - 1;
      }
      if (this.pos.x < 0) {
        this.pos.x = 1;
      }
    }
    if (this.pos.y > this.wh || this.pos.y < 0) {
      this.vel.y *= -1;
      if (this.pos.y > this.wh) {
        this.pos.y = this.wh - 1;
      }
      if (this.pos.y < 0) {
        this.pos.y = 1;
      }
    }
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}

export default Dot;
