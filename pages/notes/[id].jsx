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

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <Container>
      <h1>Todo {id}</h1>
      <p>{note}</p>
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
