import { useState } from 'react';
import styled from '@emotion/styled';

const Question = styled.div``;

const quiz = [
  {
    question: 'What color is your grass?',
    answers: [],
    values: ['', '', '', ''],
  },
  {
    question: 'Does your grass grow in the summer?',
    answers: ['Yes, I always have to mow it!', 'No, my mower gets a break'],
    values: ['', ''],
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

  return <form></form>;
}
