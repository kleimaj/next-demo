import { useState } from 'react';
import { PrimaryButton } from './Buttons';
import { Card, CardHeader, CardContainer } from './Card';
import styled from '@emotion/styled';
import Image from 'next/image';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const QuizHeader = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  text-align: center;
  color: white;
  background: #36847f;
  width: 100vw;
  padding: 12px;
`;
const QuizSubheader = styled.p`
  font-family: PT Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;

  /* 70% Black */

  color: #4d4d4d;
`;

const ImgButton = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  ${(props) => (props.active ? `border: 2px solid goldenrod;` : '')}

  @media screen and (max-width: 321px) {
    img {
      max-width: ${(props) => props.width}px;
      max-height: ${(props) => props.height}px;
    }
  }
`;
const Label = styled.label`
  display: inline;
  color: #4d4d4d;
  font-family: 'PT Serif';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
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
    width: '135',
    height: '145',
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
      <QuizHeader>Identify your grass</QuizHeader>
      {quiz.map((q, idx) => {
        return (
          <Card>
            <CardHeader>
              {idx + 1}. {q.question}
            </CardHeader>
            <CardContainer>
              {q.type === 'image'
                ? q.src.map((src, i) => {
                    return (
                      <ImgButton
                        width={q.width}
                        height={q.height}
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
                          layout='intrinsic'
                        />
                        <Label>{q.labels[i]}</Label>
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
                        <Label>{q.answers[i]}</Label>
                      </>
                    );
                  })}
            </CardContainer>
          </Card>
        );
      })}
      <PrimaryButton onClick={() => getResult()}>Identify</PrimaryButton>
    </Container>
  );
}
