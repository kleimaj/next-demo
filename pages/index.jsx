import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../src/styles/Home.module.scss';
import Quiz from '../src/components/Quiz';

export default function Home() {
  const [values, setValues] = useState({});

  const getResult = () => {
    if (Object.keys(values) === 6) {
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className={styles.container}>
      <Quiz values={values} setValues={setValues} getResult={getResult} />
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
