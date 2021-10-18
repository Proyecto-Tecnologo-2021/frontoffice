import React, {Component, useState} from "react";
import {Redirect} from "react-router";
// import "../assets/css/Login.css";
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
} from "react-bootstrap";

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
            <Container style={{ position: `relative`}}>
                <Row className="justify-content-md-center " md="2" style={{top: `50%`}}>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Bienvenido a Appetit</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form action='/home'>
                                    <Row>
                                        <Col className="pl-1" >
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email
                                                </label>
                                                <Form.Control
                                                    placeholder="Email"
                                                    type="email"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="pr-1" >
                                            <Form.Group>
                                                <label>Contraseña</label>
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
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                            &nbsp;
                                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                        </div>
                                    </Row>
                                    <br/>

                                    <Row>
                                        <Button
                                            className="btn-fill pull-right"
                                            type="submit"
                                            variant="info"
                                        >
                                            Ingresar
                                        </Button>
                                    </Row>
                                    <br/>

                                    <Row>
                                        <p className="forgot-password text-right">
                                            Forgot <a href="#">password?</a>
                                        </p>
                                    </Row>
                                    <br/>

                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

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