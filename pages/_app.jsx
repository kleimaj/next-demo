import '../src/styles/globals.scss';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from '../src/components';
import styled from '@emotion/styled';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
`;
const Logo = styled.h1`
  font-family: Pacifico;
`;
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>🌱</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Londrina+Solid&family=PT+Serif&family=Pacifico&family=Poppins:ital,wght@0,400;0,700;1,300;1,400&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Navbar>
        <Link href='/'>
          <a>
            <Logo>Otherside</Logo>
          </a>
        </Link>
        <ul>
          <li>
            <Link href='/login'>
              <a>Login</a>
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
