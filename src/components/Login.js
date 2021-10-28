import React, {Component, useState} from "react";
import {Redirect} from "react-router";
import "../assets/css/Login.css";
import {URL_Services, Usuario_Login, localDevelopment} from "../Const";
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
    ListGroup, ButtonGroup,
} from "react-bootstrap";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
// import FloatingLabel from "react-bootstrap/cjs/FloatingLabel";
import FloatingLabel from "react-bootstrap-floating-label";
import {setSession} from "./SessionService";
import jwt from "jsonwebtoken";

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const session = {
        nombre: 'Gonzalo',
        apellido: 'Santa María',
        correo: 'gonzalosantamariasilvera@gmail.com',
        telefono: '098284819',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    }

    const clickSignIn = async (user, pass) => {
        //CONSUMO LA API Y CHEQUEO SI PERMITE ACCESO
        // const url = '/usuarios/login'
        const url = URL_Services + Usuario_Login
        const axios = require('axios').default

        const bodyLogin = {
            usuario: user,
            password: pass,
        }

        const sendMessageRequest = async () => {
            try {
                const response = await axios.post(
                    url,
                    bodyLogin,
                )
                return response.data
            } catch (err) {
                // Handle Error Here
                console.error(err)
                return null
            }
        }

        const finalResponse = await sendMessageRequest()

        if(finalResponse !== null){
            setSession(jwt.decode(finalResponse.cuerpo))
            return finalResponse.ok
        }else{
            return false
        }



    }

    function validateForm() {
        return user.length > 0 && password.length > 0;
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
                        <Card className="rounded-3 shadow-lg" id="cardLogin">
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <div>
                                        <img
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
                                                        <FloatingLabel
                                                            label="Email / Teléfono"
                                                            labelStyle={{fontSize: '14px'}}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setUser(e.target.value);
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <br/>

                                            <Row>
                                                <Col className="pr-1">
                                                    <Form.Group>
                                                        <FloatingLabel
                                                            label="Contraseña"
                                                            labelStyle={{fontSize: '14px'}}
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setPassword(e.target.value);
                                                            }}
                                                            type="password"
                                                        />
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
                                                    <label className="d-flex justify-content-end"
                                                           style={{width: '300px'}}>
                                                        ¿Olvidó su contraseña? &nbsp;<a href="#">Recuperar</a>
                                                    </label>
                                                </Col>
                                            </Row>
                                            <br/>

                                            <Row>
                                                <Button
                                                    className="shadow-sm btn-fill pull-right"
                                                    type=""
                                                    variant="warning"
                                                    onClick={async () => {
                                                        //Consumir el servicio
                                                        // clickSignIn(user, password)
                                                        //Si hay un error al login...
                                                        let ok = false
                                                        if (!localDevelopment)
                                                            ok = await clickSignIn(user, password)
                                                        else {
                                                            ok = true
                                                            setSession(session)
                                                        }
                                                        if (ok) {
                                                            window.location = '/home'
                                                        } else {
                                                            Swal.fire(
                                                                {
                                                                    title: 'Ups...',
                                                                    confirmButtonColor: '#c00e0e',
                                                                    icon: "error",
                                                                    text: 'Credenciales incorrectas' //Este texto se cargaría con lo que responde el servicio
                                                                },
                                                            )
                                                        }
                                                    }}>
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
    );
}
export default Login
