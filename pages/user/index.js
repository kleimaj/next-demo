import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { SecondaryButton } from "../../src/components/Buttons";
import { useRouter } from "next/router";

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

export default function User() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [grass, setGrass] = useState([]);

  const getUser = () => {
    setName(localStorage.getItem("name"));
    setId(localStorage.getItem("id"));

    console.log(name, id);

    //* GET user's grasses
    //   fetch("/api/auth/grass", {
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //       isAdmin
    //     })
    //   })
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(err => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <h1>Welcome, {name.toUpperCase()}!</h1>
      <Box>
        <h3>Here are your saved grasses {}:</h3>
        <p>List the grass here</p>
      </Box>

      <SecondaryButton onClick={() => router.push("/")}>
        Identify More
      </SecondaryButton>
    </Container>
  );
}
