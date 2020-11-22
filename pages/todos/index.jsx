import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

import { useRouter } from 'next/router';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const H1 = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;
const Note = styled.p`
  font-size: 1rem;
  color: royalblue;
  cursor: pointer;
  text-decoration: underline;
`;
const NoteContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const Page = () => {
  const router = useRouter();
  const notes = new Array(15)
    .fill(1)
    .map((e, i) => ({ id: i, title: `Note: ${i}` }));

  return (
    <Container>
      <Head>
        <title>Todos</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <H1>Todos</H1>
      <NoteContainer>
        {notes.map((note) => (
          <div key={note.id}>
            <Link href='/todos/[id]' as={`/todos/${note.id}`}>
              <Note>{note.title}</Note>
            </Link>
          </div>
        ))}
      </NoteContainer>

      <button onClick={() => router.push('/')}>Go Home</button>
    </Container>
  );
};

export default Page;
