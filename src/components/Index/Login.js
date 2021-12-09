import React, {useState} from "react";
import {Redirect} from "react-router";
import "../../assets/css/Login.css";
import {
    localDevelopment, Login_Google_Id,
    Set_Token,
    URL_AltaRestaurante,
    URL_AdministradorIndexBackoffice, URL_RestauranteIndexBackoffice,
    URL_Services,
    Usuario_Login, Usuario_Login_Google, Usuario_Login_Redirect
} from "../../Const";
import {Button, ButtonGroup, Card, Col, Container, Form, ListGroup, Row,} from "react-bootstrap";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {default as axios} from "axios";
import FloatingLabel from "react-bootstrap-floating-label";
import {setSession} from "../SessionService";
import jwt from "jsonwebtoken";
import {getToken} from "../../firebase/Firebase";
import { GoogleLogin } from 'react-google-login';

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const session = {
        nombre: 'Gonzalo',
        apellido: 'Santa María',
        correo: 'gonzalosantamariasilvera@gmail.com',
        telefono: '098284819',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        userName: 'gsantamaria'
    }
    const [userType, setUserType] = useState('')
    const [isTokenFound, setTokenFound] = useState(false);

    const clickSignIn = async (user, pass) => {
        //CONSUMO LA API Y CHEQUEO SI PERMITE ACCESO
        // const url = '/usuarios/login'
        const url = URL_Services() + Usuario_Login

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
            return finalResponse
        }else{
            return false
        }
    }

    const clickSignInGoogle = async (email, name) => {
        //CONSUMO LA API Y CHEQUEO SI PERMITE ACCESO
        // const url = '/usuarios/login'
        const url = URL_Services() + Usuario_Login_Google

        const axios = require('axios').default

        const bodyLogin = {
            correo: email,
            nombre: name
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
            console.log(finalResponse.cuerpo)
            setSession(jwt.decode(finalResponse.cuerpo))
            return finalResponse
        }else{
            return false
        }
    }

    const responseGoogle = async (response) => {
        const obj = await clickSignInGoogle(response.profileObj.email, response.profileObj.givenName )
        const decodeado = jwt.decode(obj.cuerpo)
        await getToken(setTokenFound, decodeado.idUsuario)
        window.location = '/home'

        console.log(response);
        const googleSession = {
            nombre: response.profileObj.givenName,
            apellido: response.profileObj.familyName,
            correo: response.profileObj.email,
            userName: response.profileObj.givenName
        }
        console.log(googleSession)
    }

    const loginRedirect = async (userId, userType, token) => {
        const url = URL_Services() + Usuario_Login_Redirect + "?idUsuario=" + userId + "&tipoUsuario=" + userType + "&jwtToken=" + token
        const axios = require('axios').default
        window.location = url

    }


    function validateForm() {
        return user.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        // event.preventDefault();
        <Redirect from="/" to="/home"/>
    }

    const login = async () => {

        let obj = null
        let ok = false
        if (!localDevelopment)
            obj = await clickSignIn(user, password)
            if(obj !== null)
                ok = obj.ok
        else {
            ok = true
            setSession(session)
        }
        if(obj !== null){
            const decodeado = jwt.decode(obj.cuerpo)
            if (ok && decodeado.tipoUsuario === "restaurante"){
                window.location = URL_RestauranteIndexBackoffice()
            }else{
                if(ok && decodeado.tipoUsuario === "administrador"){
                    window.location = URL_AdministradorIndexBackoffice()
                }else{
                    if (ok && decodeado.tipoUsuario === "cliente") {
                        await getToken(setTokenFound, decodeado.idUsuario)
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
                }
            }
        }
    }

    const handleKey = async (e) => {
        if (e.keyCode === 13) {
            await login()
        }
    };

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
                                                                handleKey(e)
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
                                                                handleKey(e)
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
                                                        ¿Olvidó su contraseña? &nbsp;<Link to="/recover-pass">Recuperar</Link>
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
                                                        await login()
                                                    }}
                                                    >
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
                                    <ButtonGroup className="w-100">
                                        <Button
                                            href={URL_AltaRestaurante()}
                                            className="btn-fill -pull-left"
                                            variant="success"
                                            >
                                            <i className="fas fa-utensils"></i>
                                            &nbsp;|
                                            ¿Nuevo Restaurante?
                                        </Button>
                                        <GoogleLogin
                                            clientId={Login_Google_Id()}
                                            render={renderProps => (
                                                // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                                                <Button
                                                    className="btn-fill pull-right"
                                                    variant="danger"
                                                    onClick={renderProps.onClick}
                                                    disabled={renderProps.disabled}>
                                                    <i className="fab fa-google"></i>
                                                    &nbsp;|
                                                    Ingresar con Google
                                                </Button>
                                            )}
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={ (err) => {
                                                Swal.fire(
                                                {
                                                    title: 'Ups...',
                                                    confirmButtonColor: '#c00e0e',
                                                    icon: "error",
                                                    text: 'Ha sucedido un error ' + err.details
                                                },
                                            )}}
                                            // isSignedIn={true}
                                            cookiePolicy={'single_host_origin'}
                                        />
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
