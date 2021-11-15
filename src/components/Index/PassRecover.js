import React, {useState} from 'react'
import {Button, ButtonGroup, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import {Pass_Recover, URL_Services} from "../../Const";
import {default as axios} from "axios";

const PassRecover = () => {


    const [email, setEmail] = useState('')


    const recoverPassword = async (email) => {
        const url = URL_Services() + Pass_Recover
        const axios = require('axios').default

        const bodyLogin = {
            correo: email
        }

        const sendMessageRequest = async () => {
            try {
                const response = await axios.post(
                    url,
                    bodyLogin,
                )
                return response.data.ok
            } catch (err) {
                // Handle Error Here
                console.error(err)
                return false
            }
        }

        const finalResponse = await sendMessageRequest()
        return finalResponse

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
                                        <Card.Title as="h4">RECUPERAR CONTRASEÑA</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form action='#'>
                                            <Row className="pt-2">
                                                <Col className="pl-1">
                                                    <Form.Group>
                                                        <label className="d-flex justify-content-start">
                                                            Email
                                                        </label>
                                                        <Form.Control
                                                            placeholder="Email"
                                                            type="email"
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                setEmail(e.target.value);
                                                            }}></Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <br/>

                                            <Row>
                                                <Button
                                                    className="shadow-sm btn-fill pull-right"
                                                    type=""
                                                    variant="success"
                                                    onClick={async () => {

                                                        if (email !== "") {
                                                            const ok = await recoverPassword(email)
                                                            // console.log(ok + " este es el OK")
                                                            if (ok === true) {
                                                                Swal.fire(
                                                                    {
                                                                        title: 'Se ha enviado el correo con éxito',
                                                                        confirmButtonColor: '#27ae60',
                                                                        icon: "success"
                                                                    },
                                                                ).then((result) => window.location = "/")
                                                            } else { //algo salió mal
                                                                Swal.fire(
                                                                    {
                                                                        title: 'Ups...',
                                                                        confirmButtonColor: '#c00e0e',
                                                                        icon: "error",
                                                                        text: 'Ha sucedido un error...' //Este texto se cargaría con lo que responde el servicio
                                                                    },
                                                                )
                                                            }
                                                        } else {
                                                            Swal.fire(
                                                                {
                                                                    title: 'Ups...',
                                                                    confirmButtonColor: '#c00e0e',
                                                                    icon: "error",
                                                                    text: 'Ingrese su casilla de correo' //Este texto se cargaría con lo que responde el servicio
                                                                },
                                                            )
                                                        }

                                                    }}>
                                                    <i className="fas fa-user-lock"></i>
                                                    &nbsp;
                                                    Solicitar recuperación de contraseña
                                                </Button>
                                            </Row>

                                            <div className="clearfix"></div>
                                        </Form>
                                    </Card.Body>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-start">
                                    <ButtonGroup>
                                        <Link to="/">
                                        <Button
                                            className="btn-fill pull-right btn-sm"
                                            variant="info">
                                            <i className="fas fa-arrow-left"></i>
                                            &nbsp;
                                            Volver
                                        </Button>
                                        </Link>
                                    </ButtonGroup>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PassRecover
