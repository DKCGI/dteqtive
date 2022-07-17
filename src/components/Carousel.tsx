import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const StyledGallery = styled.div`
  width: 100%;
  margin: auto;
  height: 60vh;
  overflow: hidden;
  position: relative;
  touch-action: none;
  .slide {
    position: absolute;
    top: 0;
    left: 100%;
    transition: left 0.2s;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    &.current {
      left: 0;
      z-index: 2;
    }
    &.left {
      left: -100%;
      z-index: 1;
    }
    &.right {
      left: 100%;
      z-index: 1;
    }
    p {
      font-size: 0.75rem;
      position: absolute;
      bottom: 0;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.9);
      width: 100%;
      padding: 10px;
    }
  }

  button {
    position: absolute;
    background: none;
    border: none;
    color: #fff;
    font-size: 5rem;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }
  @media screen and (max-width: 1000px) {
  }
  #prevBtn {
    left: -10px;
  }
  #nextBtn {
    right: -10px;
  }
  .hidden {
    opacity: 0;
  }
`;

const Carousel = ({ images }: any) => {
  let [currentSlide, setCurrentSlide] = useState(1);
  let [leftSlide, setLeftSlide] = useState(currentSlide - 1);
  let [rightSlide, setRightSlide] = useState(currentSlide + 1);
  let galleryRef = useRef<HTMLDivElement>(null);
  let slides = 0;
  let pointerDown = false;
  let pointerStart = 0;
  let moved = 0;

  let handlePointerDown = (e: PointerEvent) => {
    e.preventDefault();
    pointerDown = true;
    pointerStart = e.x;
    moved = 0;
  };

  let handlePointerUp = (e: PointerEvent) => {
    pointerDown = false;
  };

  let handlePointerMoved = (e: PointerEvent) => {
    if (pointerDown) {
      moved = pointerStart - e.x;
    }
    if (moved > 100) {
      handleNext();
    }
    if (moved < -100) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.addEventListener('pointerdown', handlePointerDown);
      galleryRef.current.addEventListener('pointerup', handlePointerUp);
      galleryRef.current.addEventListener('pointermove', handlePointerMoved);
    }
    return () => {
      if (galleryRef.current) {
        galleryRef.current.removeEventListener(
          'pointerdown',
          handlePointerDown
        );
        galleryRef.current.removeEventListener('pointerup', handlePointerUp);
        galleryRef.current.removeEventListener(
          'pointermove',
          handlePointerMoved
        );
      }
    };
  });

  const handleNext = () => {
    let curr = currentSlide;
    if (currentSlide >= slides) {
      setCurrentSlide(1);
      curr = 1;
    } else {
      setCurrentSlide(currentSlide + 1);
      curr = currentSlide + 1;
    }
    if (curr - 1 <= 1) {
      setLeftSlide(slides);
    } else {
      setLeftSlide(curr - 1);
    }
    if (curr + 1 > slides) {
      setRightSlide(1);
    } else {
      setRightSlide(curr + 1);
    }
  };

  const handlePrev = () => {
    let curr = currentSlide;
    if (currentSlide <= 1) {
      setCurrentSlide(slides);
      curr = slides;
    } else {
      setCurrentSlide(currentSlide - 1);
      curr = currentSlide - 1;
    }
    if (curr - 1 < 1) {
      setLeftSlide(slides);
    } else {
      setLeftSlide(curr - 1);
    }
    if (curr + 1 > slides) {
      setRightSlide(1);
    } else {
      setRightSlide(curr + 1);
    }
  };

  return (
    <StyledGallery className='imageGallery' ref={galleryRef}>
      {images.map((image: any) => {
        const imageData = getImage(image.asset);
        let slideNumber = ++slides;
        if (imageData) {
          return (
            <div
              key={slideNumber}
              className={
                slideNumber === currentSlide
                  ? 'current slide'
                  : slideNumber === leftSlide
                  ? 'left slide'
                  : slideNumber === rightSlide
                  ? 'right slide'
                  : 'slide'
              }
            >
              <GatsbyImage
                alt='screenshot'
                image={imageData}
                imgStyle={{ objectFit: 'contain' }}
              />
              <p>{image.caption}</p>
            </div>
          );
        }
      })}

      <button
        className={images.length <= 1 ? 'hidden' : ''}
        id='prevBtn'
        onClick={handlePrev}
      >
        &#8249;
      </button>
      <button
        className={images.length <= 1 ? 'hidden' : ''}
        id='nextBtn'
        onClick={handleNext}
      >
        &#8250;
      </button>
    </StyledGallery>
  );
};

export default Carousel;
