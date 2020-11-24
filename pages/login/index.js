import styled from "@emotion/styled";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//* test admin credentials:
/* {
  "id": "5fbcacaceff46eec5243b11b",
  "name": "admin",
  "email": "test@bread.com",
  "password": "admin1",
  "isAdmin": true
} */

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (isAdmin && email !== "test@bread.com") {
      setErrorMsg("Oops, you're not an admin. Please uncheck the box");
    } else if (!isAdmin && email === "test@bread.com") {
      setErrorMsg("Looks like you're an admin. Check that box below!");
    } else {
      setErrorMsg("");
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          isAdmin
        })
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          data.name === "admin" ? router.push("/admin") : router.push("/");
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <FormWrapper>
      <Header>Log In</Header>
      {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
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

        <label htmlFor='isAdmin'>
          <Input
            type='checkbox'
            checked={isAdmin}
            onChange={e => setIsAdmin(!isAdmin)}
            name='isAdmin'
            autoComplete='is-user-admin'
          />
          <p style={{ fontSize: "13px" }}>I am an admin.</p>
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
