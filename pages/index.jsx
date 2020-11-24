import Link from 'next/link';
import Head from 'next/head';
import styles from '../src/styles/Home.module.scss';
import Quiz from '../src/components/Quiz';

export default function Home() {
  return (
    <div className={styles.container}>
      <Quiz />
    </div>
  );
}

// export function getStaticProps() {
//   // get data from CMS

//   return {
//     props: {
//       content: {
//         title: 'This is my really nice app',
//       },
//     },
//   };
// }
