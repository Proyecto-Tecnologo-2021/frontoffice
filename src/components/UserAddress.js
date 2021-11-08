import React, {useEffect, useRef, useState} from 'react'
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {getLocation, initMap, setLocation, toProj32721, toProj4326, updateLatLng} from '../assets/mapjs/appetitmap.js'
import Swal from "sweetalert2";
import {Direccion_Nueva, Dirreccion_Modificar, URL_Services} from "../Const";
import {useCookies} from "react-cookie";


export default function UserAddress({address, mode, onAdd, updDel }) {
    const [alias, setAlias] = useState('')
    const [calle, setCalle] = useState('')
    const [num, setNum] = useState('')
    const [apto, setApto] = useState('')
    const [ref, setRef] = useState('')
    const [userId, setUserId] = useState('')
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [point, setPoint] = useState('')
    const [dummyBool, setDummyBool] = useState(false)
    const [delState, setDelState] = useState(false)
    const [sMode, setSMode] = useState(mode)

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

    const cleanForm = (()=>{
        setAlias("")
        setCalle("")
        setNum("")
        setApto("")
        setRef("")
    })

    useEffect(() => {
        async function checkMode() {
            if (mode === 'I') {
                getLocation();
            } else { //mode === 'U'
                let geom = address.geometry

                geom = geom.replace("POINT(", "")
                geom = geom.replace(')', '')
                const latlng = geom.split(' ')
                // setLocation(latlng[0], latlng[1], address.alias)
                const cuatrotre = toProj4326(latlng[0], latlng[1])
                setLocation(cuatrotre.x, cuatrotre.y)

                setAlias(address.alias)
                setCalle(address.calle)
                setNum(address.numero)
                setApto(address.apartamento)
                setRef(address.referencias)
            }
            await timeout(550)
            setDataMaps()
        }

        if (firstTime.current) {

            firstTime.current = false;
            initMap();
            checkMode()

            if (cookies.__FOsession !== undefined) {
                setUserId(cookies.__FOsession.idUsuario)
            }

            return <div id="map" style={{height: "100vh"}}></div>;
        }

        if(updDel !== delState){
            cleanForm()
            setDelState(updDel)
            setSMode("I")
        }
        checkMode()

    }, [mode, address, updDel]);


    const updateUserAddress = async (alias, calle, num, apto, ref) => {
        //consumir servicio para guardar datos, debe retornar booleano

        let url = ""

        if (mode === "I")
            url = URL_Services() + Direccion_Nueva

        if (mode === "U")
            url = URL_Services() + Dirreccion_Modificar + address.id


        const axios = require('axios').default

        const bodyLogin = {
            id_cliente: userId,
            alias: alias,
            calle: calle,
            numero: num,
            apartamento: apto,
            referencias: ref,
            geometry: document.getElementById("addPoint").value
        }

        const sendMessageRequest = async () => {
            try {
                let response

                if (mode === "I") {
                    response = await axios.post(
                        url,
                        bodyLogin,
                    )
                }

                if (mode === "U") {
                    response = await axios.put(
                        url,
                        bodyLogin,
                    )
                }

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

    const setDataMaps = () => {
        let numv = document.getElementById("addAddressNumber").value
        if (document.getElementById("addAddress").value !== calle) {
            setCalle(document.getElementById("addAddress").value)
        }
        if(numv !== num){
            setNum(numv)
        }
    }

    async function timeout(ms) { //pass a time in milliseconds to this function
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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
                                        value={alias}
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
                                        placeholder="Calle"
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
                        <input type="text" id="addPoint" style={{display: "none"}}/>
                        <Row>
                            <Col className="pr-1" md="12">
                                <Form.Group>
                                    {/*<script src="../assets/mapjs/appetitmap.js"></script>*/}
                                    <script src="../assets/mapjs/Leaflet.SelectAreaFeature.js"></script>
                                    <script src="../assets/mapjs/proj4js-combined.js"></script>
                                    <script src="../assets/mapjs/defs/EPSG32721.js"></script>

                                    <div
                                        id="map"
                                        onClick={async () => {
                                            await timeout(550)
                                            setDataMaps()
                                        }}
                                    ></div>

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
                                if (mode === 'U') {
                                    title1 = '¿Desea guardar los cambios?'
                                    title2 = 'Los cambios no han sido actualizados'
                                } else { //mode === 'I'
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
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        const ok = await updateUserAddress(alias, calle, num, apto, ref) //LLAMO SERVICIO PARA GUARDAR DATOS
                                        if (ok) {
                                            setDummyBool(!dummyBool)
                                            onAdd(!dummyBool)
                                            Swal.fire(
                                                {
                                                    title: '¡Datos guardados con éxito!',
                                                    confirmButtonColor: '#27ae60',
                                                    icon: "success",
                                                }
                                            )
                                            if(mode === "I")
                                                cleanForm()
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
