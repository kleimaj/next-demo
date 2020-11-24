import '../src/styles/globals.scss';
import Link from 'next/link';
import { Navbar } from '../src/components';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4rem;
`;
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <ul>
          <li>
            <Link href='/notes'>
              <a>Notes</a>
            </Link>
          </li>
        </ul>
      </Navbar>
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
