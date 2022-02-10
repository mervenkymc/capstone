import { Navbar, Container, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
export const NavigationBar = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>My Movie App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            onClick={() => {
              navigate("/")
            }}
          >
            Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
