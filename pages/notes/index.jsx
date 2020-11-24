/** @jsxImportSource @emotion/react */

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
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
const Form = styled.form`
  padding: 8px;
  display: flex;
  width: 33%;
  justify-content: center;
  margin: 24px;
`;


import useSWR from 'swr'
import { request } from 'graphql-request'
const fetcher = query => request('http:localhost:3000/api/graphql', query)


const Page = () => {
  /*
  const { data, error } = useSWR(
    `
      query GetNotes{
        getNotes {
          id
          note
        }
      }
    }`,
    fetcher
  )
  // ...
  if (error) {
    console.log(error)
    return 'err'
  }
  if (!data) return 'loading'
  if (data) console.log(data)
  */
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const router = useRouter();
  // const notes = new Array(15)
  //   .fill(1)
  //   .map((e, i) => ({ id: i, title: `Note: ${i}` }));
  useEffect(()=> {
    //fetch graphql endpoint
    const query = `
    {
        getNotes {
          id
          note
        }
    }`;
    const url = "http://localhost:3000/api/graphql";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    };
    fetch(url, opts)
      .then(res => res.json())
      .then(data=> setNotes(data.data.getNotes))
      .catch(console.error);

  }, [])

  const createNote = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ note: newNote }),
    });
    const note = await res.json();
    if (note.success) {
      setNotes((currNotes) => [...currNotes, note.data]);
      setNewNote('');
    }
  };

  const deleteNote = async (id) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    const msg = await res.json();
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <Container>
      <Head>
        <title>Todos</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <H1>Notes</H1>

      <NoteContainer>
        <Form onSubmit={createNote}>
          <input type='string' onChange={(e) => setNewNote(e.target.value)} />
          <button type='submit'>+</button>
        </Form>
        {notes.map((note, idx) => (
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteNote(note._id);
                    }}
                  >
                    Delete
                  </button>
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
  return { props: { allNotes: data } };
}


