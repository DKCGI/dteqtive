import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledNav = styled.footer`
  padding: 20px;
  background-color: #fff;
  text-align: center;
  h4 {
    font-size: 1em;
    padding: 10px;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    color: #123;
    li {
      padding: 10px 40px;
      font-size: 1em;
      a {
        text-decoration: none;
        color: #123;
      }
      @media screen and (max-width: 900px) {
        text-align: center;
        padding: 20px;
        font-size: 2em;
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledNav>
      <h4>&copy;2022 DTEQTIVE</h4>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
        <li>
          <Link to='/work'>Work</Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Footer;
