import * as React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
const StyledWork = styled.div<{ columns: number }>`
  width: 100%;
  max-width: 400px;
  color: #fff;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  :hover {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
  }
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  a.link {
    text-decoration: none;
    display: grid;
    height: 100%;
    width: 100%;
    color: #fff;
  }
  h3 {
    text-align: center;
    padding: 20px;
    background-color: #000;
  }
  div.gatsby-image-wrapper {
    overflow: hidden;
    height: 100%;
    div {
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .iframeWrapper {
    height: 100%;
    position: relative;
    min-height: 420px;
    iframe {
      position: absolute;
      left: 0;
      display: grid;
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (max-width: 1000px) {
    ${(props) => {
      if (props.columns % 2 != 0) {
        return `&:last-child {
          grid-column: 1/-1;
        }`;
      }
    }};
  }
`;
interface Props {
  readonly children: React.ReactNode;
  url: string;
  youtube: {
    url: string;
  };
  category: string;
  slug: {
    current: string;
  };
}

const Container: FC<Props> = (props) => {
  if (props.category === 'web development') {
    return (
      <a className='link' href={`/${props.slug}`}>
        {props.children}
      </a>
    );
  }
  if (props.url && !props.youtube) {
    return (
      <a className='link' href={props.url}>
        {props.children}
      </a>
    );
  } else {
    return <div className='wrapper'>{props.children}</div>;
  }
};

const WorkSample = ({ data, columns }: any) => {
  let imageData: any;
  if (data.image) {
    imageData = getImage(data.image.asset);
  }

  let image = true;

  if (data.youtube) {
    image = false;
  }
  return (
    <StyledWork columns={columns}>
      <Container
        category={data.category}
        url={data.url}
        youtube={data.youtube}
        slug={data.slug.current}
      >
        <h3>{data.name}</h3>
        {image ? <GatsbyImage alt={data.name} image={imageData!} /> : ''}
        {data.youtube ? (
          <div className='iframeWrapper'>
            <iframe
              src={data.youtube.url}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          ''
        )}
      </Container>
    </StyledWork>
  );
};

export default WorkSample;
