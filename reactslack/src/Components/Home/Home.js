import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import styled from 'styled-components';

function Home() {
  return (
    <HomeContainer>
      <div className="home-container">
        <StyledH1>Welcome to Tabletalk</StyledH1>
        <p>Please sign in or register to get started.</p>
        <div className="button-container">
          <Link to="/login" className="login-button">
            Login/Register
          </Link>
        </div>
      </div>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  height: 50%;
  background: turquoise;
`;
const StyledH1 = styled.h1`
  font-size: 3rem; /* This will make the h1 font size 2 times the base font size */
`;
