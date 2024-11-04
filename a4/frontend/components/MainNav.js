// components/MainNav.js
import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MainNav() {
  const [ searchField, setSearchField ] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchField) {
      router.push(`/artwork?title=true&q=${searchField}`);
    }
  }

  return (<>
    <Navbar bg="dark" variant="dark" className="fixed-top navbar-dark bg-primary" expand="lg">
      <Container>
        <Navbar.Brand>Sheng-Lin Yang</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link>Advanced Search</Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit" variant="btn btn-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    <br />
  </>);
};