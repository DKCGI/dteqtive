import * as React from 'react';
import { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledNav = styled.nav`
  padding: 20px;
  #menu-trigger {
    border: none;
    background-color: none;
    height: 50px;
    display: none;
    :hover span {
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    }
    @media screen and (max-width: 900px) {
      display: block;
    }
    span {
      display: block;
      height: 5px;
      width: 50px;
      margin: 10px;
      background-color: #123;
    }
  }
  ul {
    overflow: hidden;
    display: flex;
    justify-content: center;
    list-style-type: none;
    color: #123;
    @media screen and (max-width: 900px) {
      flex-direction: column;
      transition: max-height 0.3s;
      &.open {
        max-height: 1000px;
      }
      &.closed {
        max-height: 0;
      }
    }
    li {
      padding: 10px 40px;
      font-size: 1.5em;
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

const Nav = () => {
  let [menuState, setMenuState] = useState(false);
  const toggleMenu = () => {
    setMenuState(!menuState);
  };
  return (
    <StyledNav>
      <button id='menu-trigger' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={menuState ? 'open' : 'closed'}>
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

export default Nav;
