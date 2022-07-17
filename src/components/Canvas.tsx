import * as React from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Particle from '../classes/Particle';
import Vector from '../classes/Vector';
import Dot from '../classes/Dot';

type Props = {
  morph?: boolean;
  image?: string;
  text?: string;
  bg?: boolean;
};

const StyledDiv = styled.div`
  width: 100%;
  max-width: 70vw;
  height: 100%;
  min-height: 350px;
  margin: auto;
  padding: 0;
  display: flex;
  position: relative;
  canvas {
    touch-action: none;
    display: block;
    margin: auto;
  }
`;

const Canvas = (props: Props) => {
  const canvasRef = useRef<any>();
  const requestRef = useRef<any>();
  let bg = props.bg == false ? props.bg : true;
  let canH = 0;
  let canW = 0;
  let canvas = canvasRef.current;
  let ctx: any;
  let image: HTMLImageElement;
  let morph = props.morph == false ? props.morph : true;
  let text = props.text ? props.text : String.fromCodePoint(0x1f642);
  let particles: Particle[] = [];
  let dotArray: Dot[] = [];
  let mousePos = new Vector(0, 0);

  const processImage = async () => {
    if (!image) {
      const img = new Image();
      if (props.image) {
        img.src = props.image;
        await img.decode();
        image = img;
      }
    }
  };
  const draw = () => {
    ctx.clearRect(0, 0, canW, canH);
    particles.forEach((particle) => {
      particle.update();
    });
    if (morph) {
      particles.forEach((particle) => {
        if (Vector.getDistance(particle.pos, mousePos) < particle.r * 20) {
          particle.acc.x = (particle.pos.x - mousePos.x) / 100;
          particle.acc.y = (particle.pos.y - mousePos.y) / 100;
          particle.vel.x += particle.acc.x;
          particle.vel.y += particle.acc.y;
        }

        particle.update();
      });
    }
    if (bg) {
      dotArray.forEach((dot, index, array) => {
        if (canW > 420) {
          let d = Vector.getDistance(mousePos, dot.pos);
          if (d > canW / 6) {
            ctx.fillStyle = `rgba(30,50,90,${d / canW})`;
            ctx.strokeStyle = `rgba(30,50,90,${d / canW})`;

            for (let i = 0; i < array.length; i++) {
              if (index !== i) {
                if (Vector.getDistance(array[i].pos, dot.pos) < 150) {
                  ctx.beginPath();
                  ctx.moveTo(array[i].pos.x, array[i].pos.y);
                  ctx.lineTo(dot.pos.x, dot.pos.y);
                  ctx.stroke();
                  ctx.fill();
                }
              }
            }
          }
        }
        ctx.fillStyle = `rgba(30,50,90`;
        dot.update();
      });
    }
    requestRef.current = requestAnimationFrame(draw);
  };

  const updateMousePos = (e: any) => {
    e.preventDefault();
    if (e) {
      if (canvas) {
        if (e.x && e.y) {
          let rect = canvas.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          mousePos.x = x;
          mousePos.y = y;
        } else if (e.touches) {
          let rect = canvas.getBoundingClientRect();
          let x = e.touches[0].clientX - rect.left;
          let y = e.touches[0].clientY - rect.top;
          mousePos.x = x;
          mousePos.y = y;
        } else {
          return;
        }
      }
    }
  };

  useEffect(() => {
    canvas = canvasRef.current;
    if (canvas) {
      ctx = canvas.getContext('2d');
    }

    const init = () => {
      if (morph) {
        particles = [];

        // let computedStyle = getComputedStyle(canvas.parentElement);
        // let parentWidth = canvas.parentElement.clientWidth;
        // let parentHeight = canvas.parentElement.clientHeight;
        // canW = canvas.width =
        //   parentWidth -
        //   (parseFloat(computedStyle.paddingLeft) +
        //     parseFloat(computedStyle.paddingRight) +
        //     5);
        // canH = canvas.height = parentHeight;

        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // ...then set the internal size to match !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        canW = canvas.width = canvas.offsetWidth;
        canH = canvas.height =
          canvas.offsetHeight > 400 ? canvas.offsetHeight : 400;

        if (props.image) {
          processImage().then(() => {
            let paintedWidth: number;
            let paintedHeight: number;
            if (canvas) {
              if (image.width > image.height) {
                ctx.drawImage(
                  image,
                  0,
                  0,
                  canW,
                  (canW / image.width) * image.height
                );
                paintedWidth = canW;
                paintedHeight = (canW / image.width) * image.height;
              } else {
                ctx.drawImage(
                  image,
                  canW / 2 - ((canH / image.height) * image.width) / 2,
                  0,
                  (canH / image.height) * image.width,
                  canH
                );
                paintedWidth =
                  canW / 2 -
                  ((canH / image.height) * image.width) / 2 +
                  (canH / image.height) * image.width;
                paintedHeight = canH;
              }
              const data = ctx.getImageData(0, 0, canW, canH).data;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              let r: number;
              let space: number;
              if (paintedWidth > 700) {
                r = 3;
                space = 6;
              } else {
                r = 2;
                space = 5;
              }
              for (let i = 0; i < canW; i += space) {
                for (let j = 0; j < canH; j += space) {
                  if (
                    (data[(i + j * canW) * 4] +
                      data[(i + j * canW) * 4 + 1] +
                      data[(i + j * canW) * 4 + 2]) /
                      3 > //or just check data[(i + j * canW) * 4 + 3] for alpha
                    245
                  ) {
                    particles.push(
                      new Particle(i, j, ctx, canW, canH, '#fff', r)
                    );
                  } else if (
                    (data[(i + j * canW) * 4] +
                      data[(i + j * canW) * 4 + 1] +
                      data[(i + j * canW) * 4 + 2]) /
                      3 >
                    200
                  ) {
                    particles.push(
                      new Particle(i, j, ctx, canW, canH, '#bbb', r)
                    );
                  } else if (
                    (data[(i + j * canW) * 4] +
                      data[(i + j * canW) * 4 + 1] +
                      data[(i + j * canW) * 4 + 2]) /
                      3 >
                    150
                  ) {
                    particles.push(
                      new Particle(i, j, ctx, canW, canH, '#888', r)
                    );
                  } else if (
                    (data[(i + j * canW) * 4] +
                      data[(i + j * canW) * 4 + 1] +
                      data[(i + j * canW) * 4 + 2]) /
                      3 >
                    100
                  ) {
                    particles.push(
                      new Particle(i, j, ctx, canW, canH, '#555', r)
                    );
                  }
                }
              }
            }
          });
        } else {
          if (canvas) {
            ctx.font = `bold 5em sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.fillText(text, canW / 2, canH / 2);
            const data = ctx.getImageData(0, 0, canW, canH).data;
            ctx.clearRect(0, 0, canW, canH);
            particles = [];
            for (let i = 0; i < canW; i += 5) {
              for (let j = 0; j < canH; j += 5) {
                if (data[(i + j * canW) * 4 + 3] > 150) {
                  particles.push(new Particle(i, j, ctx, canW, canH));
                }
              }
            }
          }
        }
      }
      if (bg) {
        dotArray = [];
        for (let i = 0; i < window.innerWidth / 20; i++) {
          if (canvasRef.current) {
            dotArray.push(
              new Dot(
                Math.random() * canW,
                Math.random() * canH,
                Math.random() > 0.5 ? Math.random() * 5 : Math.random() * -5,
                Math.random() > 0.5 ? Math.random() * 5 : Math.random() * -5,
                ctx,
                canW,
                canH
              )
            );
          }
        }
      }
    };

    init();
    window.addEventListener('resize', init);
    window.addEventListener('pointermove', updateMousePos);
    draw();
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', updateMousePos);
    };
  }, []);
  return (
    <StyledDiv>
      <canvas ref={canvasRef}></canvas>
    </StyledDiv>
  );
};

export default Canvas;
