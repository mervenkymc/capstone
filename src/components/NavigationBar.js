import { Navbar, Container, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
export const NavigationBar = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>MovieMeave</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            onClick={() => {
              navigate("/")
            }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/movie-popular")
            }}
          >
            Popular
          </Nav.Link>

          <Nav.Link
            onClick={() => {
              navigate("/movie-top-rated")
            }}
          >
            Top Rated
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/profile")
            }}
          >
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
