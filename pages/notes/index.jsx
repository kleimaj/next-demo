/** @jsxImportSource @emotion/react */

import Link from 'next/link';
import React, { useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

import { useRouter } from 'next/router';

const Container = styled.div`
  margin-top: 10vw;
`;
const H1 = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;
const Note = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: 1px solid;
  border-color: muted;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
`;
const NoteContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
`;

const Page = ({ notes }) => {
  const router = useRouter();
  console.log(notes);
  // const notes = new Array(15)
  //   .fill(1)
  //   .map((e, i) => ({ id: i, title: `Note: ${i}` }));

  return (
    <Container>
      <Head>
        <title>Todos</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <H1>Notes</H1>
      <NoteContainer>
        {notes.data.map((note, idx) => (
          <div
            key={note._id}
            css={css`
              width: 33%;
              padding: 8px;
            `}
          >
            <Link href='/notes/[id]' as={`/notes/${note._id}`}>
              <a
                css={css`
                  text-decoration: none;
                  cursor: pointer;
                `}
              >
                <Note>
                  <strong>Note {idx}</strong>
                  <button>Delete</button>
                </Note>
              </a>
            </Link>
          </div>
        ))}
      </NoteContainer>

      <button onClick={() => router.push('/')}>Go Home</button>
    </Container>
  );
};

export default Page;

// server-side rendering notes
export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/notes');
  const data = await res.json();
  return { props: { notes: data } };
}
