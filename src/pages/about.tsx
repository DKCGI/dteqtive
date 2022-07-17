import * as React from 'react';
import Layout from '../components/Layout';
import Typewriter from 'typewriter-effect';
import Canvas from '../components/Canvas';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { GatsbyImageDataArgs } from 'gatsby-source-sanity';
import ToolBelt from '../components/ToolBelt';

const StyledAbout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  height: 100%;
  color: #fff;
  padding: 20px 0;
  > .text {
    font-size: 1.2em;
    line-height: 1.5em;
    padding-right: 40px;
    max-width: 720px;
    max-height: 55vh;
    margin: auto;
    overflow: auto;
    q {
      display: block;
      padding: 0 0 0 40px;
    }
    p {
      padding: 20px 0;
    }
    @media screen and (max-width: 900px) {
      padding: 30px;
      max-height: none;
      overflow: show;
    }
  }
  .canvasContainer {
    min-height: 30vh;
    position: relative;
    display: flex;
    flex-direction: column;
    p {
      padding: 30px;
    }
  }
  .center {
    text-align: center;
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

interface Node {
  name: string;
  image?: {
    asset: GatsbyImageDataArgs;
  };
  caption?: string;
}

const About = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>About DTEQTIVE</title>
      </Helmet>
      <h1>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('About').start();
          }}
        />
      </h1>
      <StyledAbout>
        <div className='canvasContainer'>
          <Canvas bg={false} image='../static/i.jpg' />
          <p className='center'>
            This is a picture of me when I was a little younger.
          </p>
        </div>

        <div className='text'>
          <p>
            Technology must continue advancing. I enjoy researching everything I
            can about the tech that fascinates me and appreciate entrepreneurs
            who innovate.
          </p>
          <q>There is no knowledge that is not power.</q>
          <cite>Raiden, Mortal Kombat</cite>
        </div>
        <ToolBelt />
      </StyledAbout>
    </Layout>
  );
};

export default About;
