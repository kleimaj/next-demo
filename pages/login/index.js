import styled from "@emotion/styled";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const FormWrapper = styled.div`
  position: absolute;
  top: 15%;
  left: 25%;
`;
const Header = styled.h3`
  font-size: 2rem;
  text-align: center;
  color: #323232;
`;
const Form = styled.form`
  width: 50vw;
  height: 50vh;
  padding: 20px;
  background-color: #ffa41b;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Input = styled.input`
  border: none;
  border-radius: 13px;
  width: 100%;
  padding: 8px 40px;
  margin: 5px;
  font-size: 1rem;
  background-color: #fff;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        // send them home or to the user profile?
        router.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <FormWrapper>
      <Header>Log In</Header>

      <Form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          <Input
            placeholder='Email address'
            value={email}
            onChange={e => setEmail(e.target.value)}
            name='email'
            type='email'
            autoComplete='email'
            required
          />
        </label>

        <label htmlFor='password'>
          <Input
            placeholder='Magic password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            name='password'
            type='password'
            autoComplete='create-password'
            required
          />
        </label>
        <Button type='submit'>Submit</Button>

        <h5>
          Don't have an account?
          <Link href='/signup'>
            <a style={{ color: "yellow", textDecoration: "underline" }}>
              {" "}
              Sign up here!
            </a>
          </Link>
        </h5>
      </Form>
    </FormWrapper>
  );
};

export default Login;
