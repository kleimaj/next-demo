import styled from '@emotion/styled';
import Image from 'next/image';
import { PrimaryButton } from './Buttons';
import { useRouter } from 'next/router';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Box = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #efefef;
  padding: 12px;
  border-radius: 12px;
  margin: 15px;
  p {
    line-height: 1.5rem;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export default function GrassShow({ grass }) {
  const router = useRouter();
  return (
    <Container>
      <h1>{grass.name}</h1>
      <Box>
        <h3>You're growing {grass.name}!</h3>
        <ImageContainer>
          <Image
            alt={grass.name}
            src={`/grass/${grass.color.replace(' ', '')}.png`}
            width={130}
            height={145}
          />
          <Image
            alt={grass.name}
            src={`/grass/${grass.color.replace(' ', '')}.png`}
            width={130}
            height={145}
          />
        </ImageContainer>
        <p>
          What is {grass.name.toLowerCase()}? It is a standard turf grass that
          is bunching and perennial. This variety of fescue is often part of a
          grass mixture to create a northern shade tolerant grass that has low
          moisture and fertilizer needs. The grass stays green all year long in
          most regions and is drought tolerant.
        </p>
      </Box>
      <Box>
        <h4>Create an account to save your results!</h4>
        <PrimaryButton onClick={() => router.push('/signup')}>
          Sign Up
        </PrimaryButton>
      </Box>
    </Container>
  );
}
