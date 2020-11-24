import { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

const Question = styled.div``;

const quiz = [
  {
    question: 'What color is your grass?',
    type: 'image',
    answers: ['Light Green', 'Medium Green', 'Dark Green', 'Blue Green'],
    src: [
      '/grass/lightgreen.png',
      '/grass/mediumgreen.png',
      '/grass/darkgreen.png',
      '/grass/bluegreen.png',
    ], //in public
    values: ['lightgreen', 'mediumgreen', 'darkgreen', 'bluegreen'],
  },
  {
    question: 'Does your grass grow in the summer?',
    type: 'radio',
    answers: ['Yes, I always have to mow it!', 'No, my mower gets a break'],
    values: ['warm', 'cool'],
  },
  {
    question: 'VERNATION',
    answers: ['rolled', 'folded'],
    values: ['rolled', 'folded'],
  },
  {
    question: 'What shape is the tip of the blade of grass?',
    answers: [''],
    values: [''],
  },
  {
    question: 'How does your grass grow?',
    answers: [''],
    values: [''],
  },
];
export default function () {
  const [values, setValues] = useState({});

  return (
    <form>
      <h2>Identify your grass</h2>
    </form>
  );
}
