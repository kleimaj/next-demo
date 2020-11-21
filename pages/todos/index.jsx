import Link from 'next/link';
import React from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const notes = new Array(15)
    .fill(1)
    .map((e, i) => ({ id: i, title: `Note: ${i}` }));

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Todos</h1>

      {notes.map((note) => (
        <div key={note.id}>
          <Link href='/todos/[id]' as={`/todos/${note.id}`}>
            {note.title}
          </Link>
        </div>
      ))}

      <button onClick={() => router.push('/')}>Go Home</button>
    </>
  );
};

export default Page;
