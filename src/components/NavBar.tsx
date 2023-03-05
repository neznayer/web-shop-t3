import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import Search from "./Search";

import styles from "./NavBar.module.css";
import { useSession } from "next-auth/react";
import LoginOutButton from "./LoginOutButton";

export default function NavBar() {
  const { data: session } = useSession();

  const role = session?.user.role;

  console.log("session?.user", session?.user);
  return (
    <Navbar bg="light" expand="lg" collapseOnSelect className={styles.unset}>
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home" className="block">
          Prop shop
        </Navbar.Brand>

        <section className="ml-auto">
          <Search />
        </section>
        {!session?.user && (
          <Nav>
            <Nav.Item>
              <LoginOutButton session={session} />
            </Nav.Item>
          </Nav>
        )}
        {role && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  {role === "user" && (
                    <>
                      <NavDropdown.Item href="#action/3.1">
                        <Link href="#">My Cart</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        My profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <LoginOutButton session={session} />
                      </NavDropdown.Item>
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <NavDropdown.Item>
                        <Link href="/admin-panel">Admin panel</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item> Logout </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}
