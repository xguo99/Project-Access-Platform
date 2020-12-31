import React, { useEffect, useState } from "react";
import { signOut } from 'next-auth/client'
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
    DropdownButton
} from "react-bootstrap";
import Image from "next/image";
import Student from '../pages/api/utils/Student';


export default function PaNavbarStudent(props) {
    const [username, setUserName] = useState("");
    const [uid, setUid] = useState("");
   
    useEffect(() => {
        Student.nameReturn(props.email, "first_name").then((data) => {
            setUserName(data);
        });

        Student.nameReturn(props.email, "id").then((data) => {
            setUid(data);
        });
    })
   

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
                    <Nav.Link href="https://airtable.com/shrp41zGmcAh0VI2T" className={styles.navLink}>
                        Start Application
                    </Nav.Link>
                    <Nav.Link href="#link" className={styles.navLink}>
                        Bootcamp
                    </Nav.Link>
                    <Nav.Link href="#link" className={styles.navLink}>
                        Resources
                    </Nav.Link>

                    <Button
                        onClick={signOut}
                        variant="outline-light"
                        className={styles.navbarButton}
                    >
                        Log Out
                    </Button>
                    <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* <Dropdown.Item href={"/student/applicant-info/[id]"}
                                as={`/student/applicant-info/${uid}`}>Action</Dropdown.Item> */}
                            <Dropdown.Item href={`/admin/applicant-info/${uid}`}>Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <Button
                        //onClick={nameDisplay}
                        variant="warning"
                        className={styles.navbarButton}
                    >
                        {username}
                    </Button> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}