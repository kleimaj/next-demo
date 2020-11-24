import styled from '@emotion/styled';

export const Navbar = styled.nav`
  // CSS
  background: #73b899;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  color: #ffdba9;
  padding-left: 1rem;
  border-radius: 0 0 5px 5px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  // position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: space-evenly;
  z-index: 5;

  a {
    color: white;
    text-decoration: none;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    font-family: 'Poppins';
  }

  ul {
    list-style: none;
  }
`;
