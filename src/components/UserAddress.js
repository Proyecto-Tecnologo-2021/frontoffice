import React, {useEffect} from 'react'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {initMap, getLocation, toProj32721, updateLatLng} from '../assets/mapjs/appetitmap.js'


export default function UserAddress(){
    useEffect(() => {
        initMap();
        getLocation();
        return <div id="map" style={{ height: "100vh" }}></div>;
    }, []);

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title as="h4">Editar Dirección</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col className="pl-1" md="3">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Alias *
                                    </label>
                                    <Form.Control
                                        defaultValue="NombreDefaultValue" //CARGAR NOMBRE DE LA PERSONA
                                        placeholder="Alias"
                                        type="text"
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Calle *
                                    </label>
                                    <Form.Control
                                        defaultValue="DirecciónDefaultValue"
                                        placeholder="Apellido"
                                        type="text"
                                        id="addAddress"
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="2">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Número *
                                    </label>
                                    <Form.Control
                                        defaultValue="9999 BIS"
                                        placeholder="Número de puerta"
                                        type="text"
                                        id="addAddressNumber"
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="2">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Apto.
                                    </label>
                                    <Form.Control
                                        defaultValue="1010 B"
                                        placeholder="Apto. (opcional)"
                                        type="text"
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pl-1" md="12">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Referencias
                                    </label>
                                    <Form.Control
                                        defaultValue="ReferenciasDefaultValue" //CARGAR NOMBRE DE LA PERSONA
                                        placeholder="Referencias"
                                        type="text"
                                    ></Form.Control>
                                </Form.Group>
                                <label className="d-flex justify-content-start">
                                    * Obligatorio
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-1" md="12">
                                <Form.Group>
                                    {/*<script src="../assets/mapjs/appetitmap.js"></script>*/}
                                    <script src="../assets/mapjs/Leaflet.SelectAreaFeature.js"></script>
                                    <script src="../assets/mapjs/proj4js-combined.js"></script>
                                    <script src="../assets/mapjs/defs/EPSG32721.js"></script>

                                    {/*<div>*/}

                                    {/*    <script type="text/javascript">*/}
                                    {/*        /!*var $ds = $.noConflict()*!/*/}

                                    {/*        initMap();*/}
                                    {/*        getLocation();*/}

                                    {/*    </script>*/}
                                    {/*</div>*/}

                                    {/*addPoint*/}
                                    {/*addAddress*/}
                                    {/*addAddressNumber*/}

                                    <div id="map">
                                    </div>

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

// export default UserAddress