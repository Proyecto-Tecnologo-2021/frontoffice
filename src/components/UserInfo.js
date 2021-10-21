import React from "react";

// react-bootstrap components
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

function User() {
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
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br/>
                        <Button
                            className="btn-fill pull-right container-fluid"
                            type="submit"
                            variant="success"
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
