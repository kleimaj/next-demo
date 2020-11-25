import styled from '@emotion/styled';
import Image from 'next/image';
import { PrimaryButton } from './Buttons';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContainer } from './Card';

const Header = styled.h1`
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
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const P = styled.p`
  /* Body */

  font-family: PT Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;

  /* 70% Black */

  color: #4d4d4d;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export default function GrassShow({ grass }) {
  const router = useRouter();
  return (
    <Container>
      <Header>{grass.name}</Header>
      <Card>
        <CardHeader>You're growing {grass.name}!</CardHeader>
        <CardContainer column>
          <ImageContainer>
            <Image
              alt={grass.name}
              src={`/grass/${grass.color.replace(' ', '')}.png`}
              width={200}
              height={105}
              layout='intrinsic'
            />
          </ImageContainer>
          <P>
            What is {grass.name.toLowerCase()}? It is a standard turf grass that
            is bunching and perennial. This variety of fescue is often part of a
            grass mixture to create a northern shade tolerant grass that has low
            moisture and fertilizer needs. The grass stays green all year long
            in most regions and is drought tolerant.
          </P>
        </CardContainer>
      </Card>
      <Card darker>
        <CardHeader darker>Create an account to save your results!</CardHeader>
        <CardContainer>
          <PrimaryButton onClick={() => router.push('/signup')}>
            Sign Up
          </PrimaryButton>
        </CardContainer>
      </Card>
    </Container>
  );
}
