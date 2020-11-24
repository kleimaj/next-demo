import styled from "@emotion/styled";
import React, { useState } from "react";
import { useRouter } from "next/router";

const FormWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 150px;
  left: 120px;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding: 20px;
  background-color: lightgreen;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
`;

const Header = styled.h3`
  font-size: 1.5rem;
`;

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // add regex to validate email and password here

  const handleSubmit = e => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("********", data);

        // send them home or to the user profile?
        // router.push("/");
      })
      .catch(err => console.log(err));
  };
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <Header>Sign Up</Header>
        <label htmlFor='name'>
          Name
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            name='name'
            type='text'
          />
        </label>
        <br />
        <label htmlFor='email'>
          Email
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            name='email'
            type='email'
          />
        </label>
        <br />
        <label htmlFor='password'>
          Password
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            name='password'
            type='text'
          />
        </label>
        <br />

        <button type='submit'>Submit</button>
        {/* {signupError && <p style={{ color: "red" }}>{signupError}</p>} */}
      </form>
    </FormWrapper>
  );
};

export default Signup;
