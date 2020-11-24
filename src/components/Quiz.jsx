import { useState } from 'react';
import { PrimaryButton } from './Buttons';
import styled from '@emotion/styled';
import Image from 'next/image';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Question = styled.div`
  background: #efefef;
  border-radius: 12px;
  padding: 12px 24px;
  margin: 15px;
`;
const ButtonContainer = styled.div`
  display: flex;
`;
const ImgButton = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;

  ${(props) => (props.active ? `border: 2px solid goldenrod;` : '')}
`;
const ImgLabel = styled.label`
  display: inline;
`;

const quiz = [
  {
    question: 'What color is your grass?',
    type: 'image',
    name: 'color',
    labels: ['Light Green', 'Medium Green', 'Dark Green', 'Blue Green'],
    src: [
      '/grass/lightgreen.png',
      '/grass/mediumgreen.png',
      '/grass/darkgreen.png',
      '/grass/bluegreen.png',
    ], //in public
    width: '130',
    height: '145.48',
    values: ['light green', 'medium green', 'dark green', 'blue green'],
  },
  {
    question: 'Does your grass grow in the summer?',
    type: 'radio',
    name: 'season',
    answers: ['Yes, I always have to mow it!', 'No, my mower gets a break'],
    values: ['Warm', 'Cool'],
  },
  {
    question: 'How are grass blades arranged?',
    name: 'vernation',
    labels: ['Rolled', 'Folded'],
    src: ['/grass/rolled.png', '/grass/folded.png'],
    width: '137',
    height: '145',
    type: 'image',
    values: ['rolled', 'folded'],
  },
  {
    question: 'What shape is the tip of the blade of grass?',
    name: 'tipShape',
    type: 'image',
    src: ['/grass/boatshaped.png', '/grass/pointedtip.png'],
    width: '137',
    height: '145',
    labels: ['Boat Shaped', 'Pointed Tip'],
    values: ['boat shaped', 'sharp pointed'],
  },
  {
    question: 'What is the blade width?',
    name: 'bladeWidth',
    type: 'image',
    src: ['/grass/narrow.png', '/grass/medium.png', '/grass/broad.png'],
    width: '82',
    height: '145',
    labels: ['Narrow', 'Medium', 'Broad'],
    values: ['narrow', 'medium', 'broad'],
  },
  {
    question: 'How does your grass grow?',
    name: 'growthHabit',
    type: 'image',
    width: '135',
    height: '167',
    src: ['/grass/bunching.png', '/grass/spreading.png'],
    labels: ['Bunching Habit', 'Spreading Habit'],
    values: ['bunching', 'spreading'],
  },
];
export default function Quiz({ values, setValues, getResult }) {
  const [buttonsActive, setButtonsActive] = useState({});
  return (
    <Container>
      <h2>Identify your grass</h2>
      <p>Answer 5 questions, watch the match</p>
      {quiz.map((q, idx) => {
        return (
          <Question>
            <h3>
              {idx + 1}. {q.question}
            </h3>
            <ButtonContainer>
              {q.type === 'image'
                ? q.src.map((src, i) => {
                    return (
                      <ImgButton
                        active={buttonsActive[q.name] === i}
                        onClick={() => {
                          setValues({
                            ...values,
                            [q.name]: q.values[i],
                          });
                          setButtonsActive({
                            ...buttonsActive,
                            [q.name]: i,
                          });
                        }}
                      >
                        <Image
                          alt='Grass'
                          src={src}
                          width={q.width}
                          height={q.height}
                        />
                        <ImgLabel>{q.labels[i]}</ImgLabel>
                      </ImgButton>
                    );
                  })
                : q.values.map((val, i) => {
                    return (
                      <>
                        <input
                          type='radio'
                          name={q.name}
                          value={val}
                          onChange={() =>
                            setValues({
                              ...values,
                              [q.name]: q.values[i],
                            })
                          }
                        />
                        <label>{q.answers[i]}</label>
                      </>
                    );
                  })}
            </ButtonContainer>
          </Question>
        );
      })}
      <PrimaryButton onClick={() => getResult()}>Identify</PrimaryButton>
    </Container>
  );
}
