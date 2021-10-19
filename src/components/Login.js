import React, {Component, useState} from "react";
import {Redirect} from "react-router";
import "../assets/css/Login.css";
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    ListGroup, ButtonGroup
} from "react-bootstrap";
import {Link} from "react-router-dom";

const Login = () => {
    const clickSignIn = () => {
        //CONSUMO LA API Y CHEQUEO SI PERMITE ACCESO
        const flgOK = true
        if (flgOK) {
            <Redirect from="/" to="/home"/>
        }

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        // event.preventDefault();
        <Redirect from="/" to="/home"/>
    }

    return (
        <div id="divLogin">
            <Container>
                <Row>
                    <Col className="d-flex align-items-center">
                        <Card className="rounded-3 shadow-lg" id="cardLogin" >
                            <ListGroup variant="flush" >
                                <ListGroup.Item >
                                    <div>
                                        <img
                                            // width="104"
                                            // height="85"
                                            width="125"
                                            height="125"
                                            src={require("assets/img/logoAppetit.png").default}
                                            alt="..."
                                        />
                                    </div>
                                    <Card.Header>
                                        <Card.Title as="h4">Ingreso de Usuario</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form action='/home'>
                                            <Row>
                                                <Col className="pl-1">
                                                    <Form.Group>
                                                        <label className="d-flex justify-content-start">
                                                            Email
                                                        </label>
                                                        <Form.Control
                                                            placeholder="Email"
                                                            type="email"></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col className="pr-1">
                                                    <Form.Group>
                                                        <label
                                                            className="d-flex justify-content-start mt-1">Contraseña</label>
                                                        <Form.Control
                                                            // defaultValue="Mike"
                                                            placeholder="Contraseña..."
                                                            type="password"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <br/>

                                            <Row>
                                                <Col>
                                                    <div className="d-flex justify-content-start ms-2">
                                                        <input type="checkbox" className="custom-control-input"
                                                               id="customCheck1"/>
                                                        &nbsp;
                                                        <label className="custom-control-label"
                                                               htmlFor="customCheck1">Recuérdame</label>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <label className="d-flex justify-content-end" style={{width: '300px'}}>
                                                        ¿Olvidó su contraseña? &nbsp;<a href="#">Recuperar</a>
                                                    </label>
                                                </Col>
                                            </Row>
                                            <br/>

                                            <Row>
                                                <Button
                                                    className="shadow-sm btn-fill pull-right"
                                                    type="submit"
                                                    variant="warning">
                                                    Ingresar
                                                    &nbsp;
                                                    <i className="fas fa-sign-in-alt"></i>
                                                </Button>
                                            </Row>
                                            <br/>

                                            <Row>
                                                <Col>
                                                    <label>
                                                        {/*¿Eres nuevo? &nbsp;<a href="/new-user">Crea una cuenta</a>*/}
                                                        ¿Eres nuevo? &nbsp;
                                                        <Link to="/new-user">Crea una cuenta</Link>
                                                    </label>
                                                </Col>
                                            </Row>
                                            <div className="clearfix"></div>
                                        </Form>
                                    </Card.Body>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-end">
                                    <ButtonGroup>
                                        <Button
                                            className="btn-fill pull-right"
                                            variant="danger">
                                            <i className="fab fa-google"></i>
                                            &nbsp;|
                                            Ingresar con Google
                                        </Button>
                                    </ButtonGroup>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>

        // {/*</Form>*/}
        // <div className="Login">
        //     <Form onSubmit={handleSubmit}>
        //         <Form.Group size="lg" controlId="email">
        //             <Form.Label>Email</Form.Label>
        //             <Form.Control
        //                 autoFocus
        //                 type="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //             />
        //         </Form.Group>
        //         <Form.Group size="lg" controlId="password">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //         </Form.Group>
        //         <Button id='btnLogin' size="lg" type="submit" disabled={!validateForm()}>
        //             Login
        //         </Button>
        //     </Form>
        // </div>
    );
}
export default Login