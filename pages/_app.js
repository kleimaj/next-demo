import '../src/styles/globals.scss';
import Link from 'next/link';
import { Navbar } from '../src/components';
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
