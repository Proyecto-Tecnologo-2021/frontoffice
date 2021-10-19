import React from 'react'
import {Button, ButtonGroup, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const NewUser = () => {
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
                                        <Card.Title as="h4">Nuevo cliente</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form action='/home'>
                                            <Row>
                                                <Col className="pl-1">
                                                    <Form.Group>
                                                        <label className="d-flex justify-content-start">
                                                            Nombre
                                                        </label>
                                                        <Form.Control
                                                            placeholder="Nombre"
                                                            type="name"></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1">
                                                    <Form.Group>
                                                        <label className="d-flex justify-content-start">
                                                            Apellido
                                                        </label>
                                                        <Form.Control
                                                            placeholder="Apellido"
                                                            type="name"></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="pt-2">
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
                                                <Col className="pl-1">
                                                    <Form.Group>
                                                        <label className="d-flex justify-content-start">
                                                            Teléfono de contacto
                                                        </label>
                                                        <Form.Control
                                                            placeholder="Teléfono"
                                                            type="name"></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="pt-2">
                                                <Col className="pl-1">
                                                    <Form.Group>
                                                        <label className="d-flex justify-content-start">
                                                            Contraseña
                                                        </label>
                                                        <Form.Control
                                                            placeholder="Contraseña"
                                                            type="password"></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1">
                                                    <Form.Group>
                                                        <label className="d-flex justify-content-start">
                                                            Verificación
                                                        </label>
                                                        <Form.Control
                                                            placeholder="Verifique su contraseña"
                                                            type="password"></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <br/>

                                            <Row>
                                                <Button
                                                    className="shadow-sm btn-fill pull-right"
                                                    type="submit"
                                                    variant="success">
                                                    <i className="fas fa-user-plus"></i>
                                                    &nbsp;
                                                    Registrar
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

export default NewUser