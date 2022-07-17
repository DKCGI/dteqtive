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
const StyledForm = styled.div`
  form {
    margin: auto;
    background-color: #fff;
    max-width: 600px;
    display: grid;
    padding: 20px;
    grid-template-columns: 1fr;
    row-gap: 10px;
    justify-items: center;
    align-items: center;
    div {
      display: flex;
      width: 100%;

      label {
        width: 100px;
        text-align: right;
        padding-right: 10px;
      }
      @media screen and (max-width: 900px) {
        flex-direction: column;
        label {
          text-align: left;
        }
      }
    }

    input {
    }
    input,
    textarea,
    button {
      display: block;
      border: none;
      resize: none;
      background-color: #ddd;
      width: 100%;
      min-height: 1.5em;
      font-size: 1.5em;
    }
    textarea {
      height: 100px;
      font-size: 1em;
    }
  }
`;

const Contact = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Contact DTEQTIVE</title>
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
        </ul>
      </StyledContactList>
      <StyledForm>
        <form
          action='https://formsubmit.co/dede29bd3add3f87f82d061006363cca'
          method='POST'
        >
          <div>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' required />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='_honey'
              style={{ display: 'none' }}
            ></input>
            <input type='hidden' name='_captcha' value='false'></input>
            <input type='email' name='email' id='email' required />
          </div>
          <div>
            <label htmlFor='subject'>Subject</label>

            <input type='text' name='subject' id='subject' />
          </div>
          <div>
            <label htmlFor='message'>Message</label>
            <textarea name='message' id='message' />
          </div>
          <input
            type='hidden'
            name='_next'
            value='http://dteqtive.com/success'
          ></input>
          <button type='submit'>Send</button>
          <input type='reset' value='Clear' />
        </form>
      </StyledForm>
    </Layout>
  );
};

export default Contact;
