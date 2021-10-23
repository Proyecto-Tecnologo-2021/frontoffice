import React from "react";
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
import Swal from "sweetalert2";

function User() {

    const updateUserInfo = () => {
        //consumir servicio para guardar datos, debe retornar booleano

    }

    return (
        <>
            <Card>
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
                                        defaultValue="NombreDefaultValue" //CARGAR NOMBRE DE LA PERSONA
                                        placeholder="Nombre"
                                        type="text"
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="6">
                                <Form.Group>
                                    <label htmlFor="exampleInputEmail1">
                                        Apellido
                                    </label>
                                    <Form.Control
                                        defaultValue="ApellidoDefaultValue" //CARGAR APELLIDO DE LA PERSONA
                                        placeholder="Apellido"
                                        type="text"
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-1" md="12">
                                <Form.Group>
                                    <label>Teléfono</label>
                                    <Form.Control
                                        defaultValue="TeléfonoDefaultValue" //CARGAR TELÉFONO DE LA PERSONA
                                        placeholder="Email"
                                        type="text"
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Group>
                                    <label>Email</label>
                                    <Form.Control
                                        defaultValue="EmailDefaultValue" //CARGAR Email DE LA PERSONA
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
                                        updateUserInfo() //LLAMO SERVICIO PARA GUARDAR DATOS
                                        const ok = true
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
