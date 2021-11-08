import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row,} from "react-bootstrap";
import Swal from "sweetalert2";
import {useCookies} from 'react-cookie'
import {URL_Services, Usuario_Modificar} from "../Const";
import {setSession} from "./SessionService";
import jwt from "jsonwebtoken";

function User() {
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (cookies.__FOsession !== undefined) {
            setUserId(cookies.__FOsession.idUsuario)
        }
    }, [])

    const updateUserInfo = async (name, phone) => {
        //1. consumir servicio para guardar datos, debe retornar booleano
        const url = URL_Services() + Usuario_Modificar + userId
        const axios = require('axios').default

        const bodyLogin = {
            nombre: name,
            username: userName,
            telefono: phone
        }
        // console.log(bodyLogin)
        const sendMessageRequest = async () => {
            try {
                const response = await axios.put(
                    url,
                    bodyLogin,
                )

                if(response.data.ok !== null){
                    setSession(jwt.decode(response.data.cuerpo))}

                return response.data.ok
            } catch (err) {
                // Handle Error Here
                console.error(err)
                return false
            }
        }

        const finalResponse = await sendMessageRequest()

        return finalResponse

        //2. volver a pedir los datos y actualizar la cookie
    }

    useEffect(() => {
        if (cookies.__FOsession !== undefined) {
            setName(cookies.__FOsession.nombre.toString())
            setUserName(cookies.__FOsession.userName.toString())
            setEmail(cookies.__FOsession.correo.toString())
            setPhone(cookies.__FOsession.telefono.toString())
        }
    }, [])

    return (
        <>
            <Card style={{marginBottom:'30px'}}>
                <Card.Header>
                    <Card.Title as="h4">Editar información</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col className="pl-1" md="6">
                                <Form.Group>
                                    <label>Nombre</label>
                                    <Form.Control
                                        value={name}
                                        placeholder="Nombre"
                                        type="text"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="6">
                                <Form.Group>
                                    <label htmlFor="exampleInputEmail1">
                                        Nombre de Usuario
                                    </label>
                                    <Form.Control
                                        value={userName}
                                        placeholder="Nombre de Usuario"
                                        type="text"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setUserName(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-1" md="12">
                                <Form.Group>
                                    <label>Teléfono</label>
                                    <Form.Control
                                        value={phone}
                                        placeholder="Teléfono"
                                        type="text"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setPhone(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Group>
                                    <label>Email</label>
                                    <Form.Control
                                        value={email}
                                        placeholder="Email"
                                        type="text"
                                        disabled
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br/>
                        <Button
                            className="btn-fill pull-right container-fluid"
                            type=""
                            variant="success"
                            onClick={() => {
                                Swal.fire({
                                    title: '¿Desea guardar los cambios?',
                                    showDenyButton: true,
                                    confirmButtonColor: '#27ae60',
                                    confirmButtonText: 'Guardar',
                                    denyButtonColor: '#c00e0e',
                                    denyButtonText: `No guardar`,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        const ok = updateUserInfo(name, phone) //LLAMO SERVICIO PARA GUARDAR DATOS

                                        if (ok) {
                                            Swal.fire(
                                                {
                                                    title: '¡Datos guardados con éxito!',
                                                    confirmButtonColor: '#27ae60',
                                                    icon: "success",
                                                }
                                            )
                                        } else {
                                            Swal.fire(
                                                {
                                                    title: 'Ha sucedido un error...',
                                                    confirmButtonColor: '#c00e0e',
                                                    icon: "error",
                                                }
                                            )
                                        }
                                    } else if (result.isDenied) {
                                        Swal.fire(
                                            {
                                                title: 'Los cambios no han sido actualizados',
                                                confirmButtonColor: '#00c0da',
                                                icon: "info",
                                            }
                                        )
                                    }
                                })
                            }}
                        >
                            Actualizar
                        </Button>
                        <div className="clearfix"></div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default User;
