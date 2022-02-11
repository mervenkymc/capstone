import React from "react"
import { LoginForm } from "./LoginForm"
import { Container, InputGroup } from "react-bootstrap"
export const Login = (props) => {
  return (
    <Container
      className="mt-3"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh"
      }}
    >
      <LoginForm />
    </Container>
  )
}
