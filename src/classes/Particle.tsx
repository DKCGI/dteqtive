import Vector from './Vector';

class Particle {
  pos: vector;
  dest: vector;
  vel: vector;
  acc: vector;
  r: number;
  color: string;
  friction: number;
  ctx: CanvasRenderingContext2D;
  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    ww: number,
    wh: number,
    color = '#fff',
    r: number = 2
  ) {
    this.pos = new Vector(Math.random() * ww, Math.random() * wh);
    this.dest = new Vector(x, y);
    this.vel = new Vector(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    this.acc = new Vector(0, 0);
    this.r = r;
    this.friction = Math.random() * 0.05 + 0.94;
    this.ctx = ctx;
    this.color = color;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
  update() {
    this.acc.x = (this.dest.x - this.pos.x) / 1000;
    this.acc.y = (this.dest.y - this.pos.y) / 1000;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.vel.x *= this.friction;
    this.vel.y *= this.friction;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.draw();
  }
}
export default Particle;
