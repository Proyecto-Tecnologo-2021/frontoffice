import React, {useEffect, useRef, useState} from 'react'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {initMap, getLocation, toProj32721, updateLatLng, setLocation} from '../assets/mapjs/appetitmap.js'
import Swal from "sweetalert2";


export default function UserAddress({address, mode}) {
    const [alias, setAlias] = useState('')
    const [calle, setCalle] = useState('')
    const [num, setNum] = useState('')
    const [apto, setApto] = useState('')
    const [ref, setRef] = useState('')

    //mode: I: insert; U: update; H:hidden
    // address = [
    //     {
    //         'alias': '',
    //         'calle': '',
    //         'num': '',
    //         'apto': '',
    //         'ref': '',
    //     }
    // ]

    const firstTime = useRef(true);

    useEffect(() => {
        function checkMode(){
            if (mode === 'I') {
                getLocation();
            }else{ //mode === 'U'
                const latlng = address.point.split(',')
                setLocation(latlng[0], latlng[1], address.alias)
            }
            setAlias(address.alias)
            setCalle(address.calle)
            setNum(address.num)
            setApto(address.apto)
            setRef(address.ref)
        }
        if (firstTime.current) {
            firstTime.current = false;
            initMap();
            checkMode()
            return <div id="map" style={{height: "100vh"}}></div>;
        }
        checkMode()
    }, [mode, address]);

    const updateUserAddress = () => {
        //consumir servicio para guardar datos, debe retornar booleano

    }

    const handleUserNameChange = (e) => {
        e.preventDefault();
        console.log(e.target.value); //username value
        setAlias(e.target.value);
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title as="h4">{mode === 'U' ? 'Editar Dirección' : 'Nueva Dirección'}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form noValidate>
                        <Row>
                            <Col className="pl-1" md="3">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Alias *
                                    </label>
                                    <Form.Control
                                        value= {alias}
                                        placeholder="Alias"
                                        type="text"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setAlias(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Calle *
                                    </label>
                                    <Form.Control
                                        value={calle}
                                        placeholder="Apellido"
                                        type="text"
                                        id="addAddress"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setCalle(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="2">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Número *
                                    </label>
                                    <Form.Control
                                        value={num}
                                        placeholder="Número de puerta"
                                        type="text"
                                        id="addAddressNumber"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setNum(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="2">
                                <Form.Group>
                                    <label className="d-flex justify-content-start">
                                        Apto.
                                    </label>
                                    <Form.Control
                                        value={apto}
                                        placeholder="Apto. (opcional)"
                                        type="text"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setApto(e.target.value);
                                        }}
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
                                        value={ref}
                                        placeholder="Referencias"
                                        type="text"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setRef(e.target.value);
                                        }}
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


                                    <div id="map"></div>

                                </Form.Group>
                            </Col>
                        </Row>
                        <br/>
                        <Button
                            className="btn-fill pull-right container-fluid"
                            type=""
                            variant="success"
                            onClick={() => {
                                let title1 = ''
                                let title2 = ''
                                if (mode === 'U'){
                                    title1 = '¿Desea guardar los cambios?'
                                    title2 = 'Los cambios no han sido actualizados'
                                }else { //mode === 'I'
                                    title1 = '¿Desea guardar la dirección?'
                                    title2 = 'Los datos no han sido guardados'
                                }
                                Swal.fire({
                                    title: title1,
                                    showDenyButton: true,
                                    confirmButtonColor: '#27ae60',
                                    confirmButtonText: 'Guardar',
                                    denyButtonColor: '#c00e0e',
                                    denyButtonText: `No guardar`,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        updateUserAddress() //LLAMO SERVICIO PARA GUARDAR DATOS
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
                                                title: title2,
                                                confirmButtonColor: '#00c0da',
                                                icon: "info",
                                            }
                                        )
                                    }
                                })
                            }}
                        >
                            {mode === 'U' ? 'Actualizar' : 'Nuevo'}
                        </Button>
                        <div className="clearfix"></div>
                    </Form>
                </Card.Body>
            </Card>
            {/*}*/}
        </>
    )
}

// export default UserAddress