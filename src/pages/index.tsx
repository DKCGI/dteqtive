import * as React from 'react';
import styled from 'styled-components';
import Canvas from '../components/Canvas';
import Layout from '../components/Layout';
import Typewriter from 'typewriter-effect';
import { Helmet } from 'react-helmet';

//styledComponents
const StyledContainer = styled.div`
  margin: auto;
  box-sizing: border-box;
  padding: 50px;
`;
const StyledHeading = styled.h1`
  position: relative;
  color: #fff;
  text-align: center;
  @media screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`;

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>DTEQTIVE - Home</title>
      </Helmet>
      <StyledHeading>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString('Welcome.<br>')
              .pauseFor(1000)
              .typeString(' I am David Kazaryan.')
              .start();
          }}
        />
      </StyledHeading>
      <StyledContainer>
        <Canvas text='dteqtive' bg={true} />
      </StyledContainer>
    </Layout>
  );
};

export default IndexPage;
