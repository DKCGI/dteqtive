import * as React from 'react';
import Layout from '../components/Layout';
import Typewriter from 'typewriter-effect';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const StyledContactList = styled.div`
  padding: 40px;
  color: #fff;
  text-align: left;
  display: flex;
  justify-content: center;
  ul {
    list-style-type: none;
    overflow-wrap: anywhere;
  }
`;

const Success = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Message Sent!</title>
      </Helmet>
      <h1>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('Contact').start();
          }}
        />
      </h1>
      <StyledContactList>
        <ul>
          <li>
            <span className='iconFont'>i </span>
            https://www.linkedin.com/in/dkazaryan/
          </li>
          <li>
            <span className='iconFont'>&gt; </span>
            david@dteqtive.com
          </li>
        </ul>
      </StyledContactList>

      <h1>Email sent. Thank you.</h1>
    </Layout>
  );
};

export default Success;
