import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../src/styles/Home.module.scss';
import Quiz from '../src/components/Quiz';
import GrassShow from '../src/components/GrassShow';
import Loader from 'react-loader-spinner';
import styled from '@emotion/styled';

const Absolute = styled.div`
  position: fixed;
  margin: 0 auto;
`;

export default function Home() {
  const [values, setValues] = useState({});
  const [grass, setGrass] = useState({});
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    if (Object.keys(values).length === 6) {
      setLoading(true);
    const query = `
    {
      getSpecificGrass(input: {
          season: ${JSON.stringify(values.season)},
          color: ${JSON.stringify(values.color)},
          vernation: ${JSON.stringify(values.vernation)},
          tipShape: ${JSON.stringify(values.tipShape)},
          bladeWidth: ${JSON.stringify(values.bladeWidth)},
          growthHabit: ${JSON.stringify(values.growthHabit)}
        }
      ){
        name
        images
        color
        id
      }
    }`;
    const url = "http://localhost:3000/api/graphql";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query})
    };
    const res = await fetch(url, opts)
    let {data} = await res.json()
    let grass = data.getSpecificGrass
      if (grass !== null) {
        setGrass(grass);
      }
      setLoading(false);
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Absolute>
          <Loader
            type='Puff'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={10000}
          />
        </Absolute>
      ) : Object.keys(grass).length ? (
        <GrassShow grass={grass} />
      ) : (
        <Quiz values={values} setValues={setValues} getResult={getResult} />
      )}
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
