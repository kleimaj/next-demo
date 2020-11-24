import { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

const Question = styled.div``;

const quiz = [
  {
    question: 'What color is your grass?',
    type: 'image',
    name: 'color',
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
    name: 'season',
    answers: ['Yes, I always have to mow it!', 'No, my mower gets a break'],
    values: ['warm', 'cool'],
  },
  {
    question: 'VERNATION',
    name: 'vernation',
    answers: ['rolled', 'folded'],
    values: ['rolled', 'folded'],
  },
  {
    question: 'What shape is the tip of the blade of grass?',
    name: 'tipShape',
    answers: [''],
    values: [''],
  },
  {
    question: 'How does your grass grow?',
    name: 'growthHabit',
    answers: [''],
    values: [''],
  },
];
export default function () {
  const [values, setValues] = useState({});

  return (
    <form>
      <h2>Identify your grass</h2>
      <p>Answer 5 questions, watch the match</p>
      {quiz.map((q, idx) => {
        <Question>
          <h3>
            {idx + 1}. {q.question}
          </h3>
          {q.type === 'image'
            ? q.src.map((src) => {
                <button onClick={() => setValues()}>
                  <Image alt='Grass' src={src} width={82} height={145} />;
                </button>;
              })
            : q.values.map((val, i) => {
                <>
                  <label>{q.question[i]}</label>
                  <input type='radio' name={q.name} value={val} />
                </>;
              })}
        </Question>;
      })}
    </form>
  );
}
