import React from 'react'
import {Button, Card, Col, Form, Row} from "react-bootstrap";

const UserAddress = () => {
  return (
    <>
        <Card>
            <Card.Header>
                <Card.Title as="h4">Editar Dirección</Card.Title>
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
                                    Dirección
                                </label>
                                <Form.Control
                                    defaultValue="DirecciónDefaultValue"
                                    placeholder="Apellido"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <Form.Group>
                                <label>MAPA</label>
                                <script src="https://unpkg.com/esri-leaflet@3.0.3/dist/esri-leaflet.js"
                                        integrity="sha512-kuYkbOFCV/SsxrpmaCRMEFmqU08n6vc+TfAVlIKjR1BPVgt75pmtU9nbQll+4M9PN2tmZSAgD1kGUCKL88CscA=="
                                        crossOrigin=""></script>

                                <script
                                    src="https://unpkg.com/esri-leaflet-geocoder@3.1.1/dist/esri-leaflet-geocoder.js"
                                    integrity="sha512-enHceDibjfw6LYtgWU03hke20nVTm+X5CRi9ity06lGQNtC9GkBNl/6LoER6XzSudGiXy++avi1EbIg9Ip4L1w=="
                                    crossOrigin=""></script>

                                {/*<script src="/appettit-web/resources/js/appetitmap.js"></script>*/}
                                <script src="../assets/mapjs/appetitmap.js"></script>

                                <script src="../assets/mapjs/Leaflet.SelectAreaFeature.js"></script>

                                <script src="../assets/mapjs/proj4js-combined.js"></script>
                                <script src="../assets/mapjs/defs/EPSG32721.js"></script>

                                <script type="text/javascript">
                                    var $ds = jQuery.noConflict();

                                    initMap();
                                    getLocation();

                                </script>
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
  )
}

export default UserAddress