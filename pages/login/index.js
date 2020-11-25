import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SecondaryButton } from '../../src/components/Buttons';
import { PrimaryButton } from '../../src/components/Buttons';
import {
  Card,
  CardContainer,
  CardContent,
  CardHeader,
} from '../../src/components/Card';
//* test admin credentials:
/* {
  "id": "5fbcacaceff46eec5243b11b",
  "name": "admin",
  "email": "test@bread.com",
  "password": "admin1",
  "isAdmin": true
} */

const Label = styled.label`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
`;
const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  label {
    font-size: 18px;
    margin: 0;
    padding-top: 20px;
  }
`;
const FormWrapper = styled.div`
  position: absolute;
  top: 15%;
  left: 25%;
  p {
    text-align: center;
    color: red;
  }
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
const Button = styled.button`
  display: block;
  border-radius: 5px;
  border: none;
  background-color: #000;
  cursor: pointer;
  margin-top: 30px;
  padding: 5px 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  color: #fff;
  font-size: 1rem;
`;

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdmin && email !== 'test@bread.com') {
      setErrorMsg("Oops, you're not an admin. Please uncheck the box");
    } else if (!isAdmin && email === 'test@bread.com') {
      setErrorMsg("Looks like you're an admin. Check that box below!");
    } else {
      setErrorMsg('');
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          isAdmin,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem('name', data.name);
          localStorage.setItem('id', data.id);

          data.name === 'admin' ? router.push('/admin') : router.push('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <FormWrapper>
      <Header>Log In</Header>
      {errorMsg ? <p>{errorMsg}</p> : null}
      <Form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>Welcome Back</CardHeader>
          <CardContainer column>
            <Label>Email</Label>
            <Input
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              type='email'
              autoComplete='email'
              required
            />

            <Label>Password</Label>
            <Input
              placeholder='Magic password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              type='password'
              autoComplete='create-password'
              required
            />

            <Input
              type='checkbox'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(!isAdmin)}
              name='isAdmin'
              autoComplete='is-user-admin'
            />
            <p style={{ fontSize: '13px' }}>I am an admin.</p>
            <PrimaryButton type='submit'>Submit</PrimaryButton>
            <SignupContainer>
              <Label>Don't have an account?</Label>
              <Link href='/signup'>
                <SecondaryButton> Sign up here!</SecondaryButton>
              </Link>
            </SignupContainer>
          </CardContainer>
        </Card>
      </Form>
    </FormWrapper>
  );
};

export default Login;
