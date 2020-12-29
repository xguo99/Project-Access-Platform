import React from "react";
import { useSession, signOut } from 'next-auth/client'
import styles from "../styles/Home.module.css";

// I know this is in __app.js as a global stylesheet. However, removing this line will center the PA logo for some reason.
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import LoginModal from "./login-modal";
import SignUpModal from "./signup-modal";
import Image from "next/image";

export default function PaNavbar() {
  const [loginModalShow, setLoginModalShow] = React.useState(false);
  const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [session, loading] = useSession();

  function handleLoginModalHide() {
    setLoginModalShow(false);
  }

  function handleSignUpModalHide() {
    setSignUpModalShow(false);
  }

  return (
    <Navbar expand="lg" className={styles.navbar} variant="dark" sticky="top">
      <Navbar.Brand href="/">
        <Image
          src="/austria.png"
          width={125}
          height={60}
          className="d-inline-block align-top"
          alt="Project Access logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home" className={styles.navLink}>
            Start
          </Nav.Link>
          <Nav.Link href="#link" className={styles.navLink}>
            Bootcamp
          </Nav.Link>
          <Nav.Link href="#link" className={styles.navLink}>
            Resources
          </Nav.Link>
          {session && <><Button
            onClick={signOut}
            variant="outline-light"
            className={styles.navbarButton}
          >
            Log Out
          </Button>
          <Button
            onClick=""
            variant="warning"
            className={styles.navbarButton}
          >
              {session.user.email}
          </Button>
          </>}
          {!session && 
          <><Button
            onClick={() => setLoginModalShow(true)}
            variant="outline-light"
            className={styles.navbarButton}
          >
            Log In
          </Button>
          <Button
            onClick={() => setSignUpModalShow(true)}
            variant="warning"
            className={styles.navbarButton}
          >
            Sign Up
          </Button>
          </>}

          <LoginModal show={loginModalShow} onHide={handleLoginModalHide} />
          <SignUpModal show={signUpModalShow} onHide={handleSignUpModalHide} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
