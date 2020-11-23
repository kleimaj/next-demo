import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  padding: 8px;
  display: flex;
  width: 33%;
  justify-content: center;
  margin: 24px;
`;
const Page = () => {
  // console.log(notes);
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState('');

  const fetchNote = async () => {
    const res = await fetch(`/api/notes/${id}`);
    const { data: note } = await res.json();
    console.log(note);
    setNote(note.note);
  };
  const updateNote = async () => {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ note }),
    });
    const newNote = await res.json();
    console.log(newNote);
    if (newNote.success) {
      setNote(newNote.data.note);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <Container>
      <h1>Note _id: {id}</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          updateNote();
        }}
      >
        <input value={note} onChange={(e) => setNote(e.target.value)} />
        <button>Update</button>
      </Form>
      <button onClick={() => router.push('/notes')}>Back to All Notes</button>
    </Container>
  );
};

export default Page;

// export async function getServerSideProps({ params, req, res }) {
//   const response = await fetch(`http://localhost:3000/api/note/${params.id}`);

//   if (!response.ok) {
//     res.writeHead(302, {
//       Location: '/notes',
//     });
//     res.end();
//     return {
//       props: {},
//     };
//   }

//   const { data } = await response.json();

//   return {
//     props: { notes: data },
//   };
// }
