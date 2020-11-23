import '../src/styles/globals.scss';
import Link from 'next/link';
import { Navbar } from '../src/components';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  maxwidth: 960px;
  m: 0;
  mx: auto;
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
            <Link href='/todos'>
              <a>Todos</a>
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
