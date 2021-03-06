import styled from '@emotion/styled';
import {
  Card,
  CardContainer,
  CardContent,
  CardHeader,
} from '../../src/components/Card';
import { PrimaryButton } from '../../src/components/Buttons';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Header = styled.h3`
  font-size: 2rem;
  text-align: center;
  color: #323232;
`;
const Form = styled.form`
  // width: 50vw;
  // height: 50vh;
  // padding: 20px;
  // /* background-color: #ffa41b; */
  // background-color: #73b899;
  // box-shadow: 0 5px 16px rgba(0, 0, 0, 0.25);
  // border-radius: 20px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
`;
const Input = styled.input`
  border: none;
  border-radius: 13px;
  width: 100%;
  padding: 8px 40px;
  margin: 5px;
  font-size: 1rem;
  background: #f2f2f2;
`;
const Label = styled.label`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
`;
const Button = styled.button`
  display: block;
  border-radius: 5px;
  border: none;
  background-color: #000;
  cursor: pointer;
  margin-top: 15px;
  padding: 5px 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  color: #fff;
  font-size: 1rem;
`;

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // checking if passwords match
    if (password !== password2) {
      setErrorMsg("Your passwords don't match. Please try again");
    } else {
      setErrorMsg('');
      fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //* send them home or to the user profile?
          router.push('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <FormWrapper>
      <Header>Create Account</Header>
      {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
      <Form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>Some personal info</CardHeader>
          <CardContainer column>
            <Label>Your name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name='name'
              type='text'
              autoComplete='name'
              required
            />

            <Label>Your email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              type='email'
              autoComplete='email'
              required
            />

            <Label>Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              type='password'
              autoComplete='create-password'
              required
            />

            <Label>Verify Password</Label>
            <Input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              name='password2'
              type='password'
              autoComplete='confirm-password'
              required
            />

            <PrimaryButton type='submit'>Submit</PrimaryButton>
          </CardContainer>
        </Card>
      </Form>
    </FormWrapper>
  );
};

export default Signup;
