import React, { FC } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../components/globalStyles';
import Nav from '../components/Nav';
import Footer from './Footer';

//npm install @types/styled-components

interface Props {
  readonly children: React.ReactNode;
}

//styled components

const StyledMain = styled.main`
  padding-top: 50px;
  background-color: #012;
  width: 100%;
  min-height: calc(100vh - 150px);
`;

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Nav />
      <GlobalStyles />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </>
  );
};

export default Layout;
