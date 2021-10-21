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
                                    {/*<div id="mapid" style={{height: '180px'}}>*/}
                                    {/*<div id="mapid" >*/}
                                    {/*<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>*/}
                                    {/*    <TileLayer*/}
                                    {/*        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'*/}
                                    {/*        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                                    {/*    />*/}
                                    {/*    initMap()*/}
                                    {/*    <Marker position={[51.505, -0.09]}>*/}
                                    {/*        <Popup>*/}
                                    {/*            A pretty CSS3 popup. <br/> Easily customizable.*/}
                                    {/*        </Popup>*/}
                                    {/*    </Marker>*/}
                                    {/*</MapContainer>*/}

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