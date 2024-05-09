import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavbarComp() {
    return (
        <Navbar expand="lg" className="bg-warning position-fixed z-1 rounded-1">
          <Container>
            <NavLink to='/' className='navbar-brand text-dark fw-bold'>PET CENTER GAME</NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to='/' className='nav-link text-dark'>Home</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}
