import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Form, FormControl, InputGroup, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";
import UserListAdresses from "./UserListAdresses";
import {Direccion_Listar, URL_Services} from "../Const";
import { Cookies, useCookies } from 'react-cookie'

import {default as axios} from "axios";

const UserAddresses = ({onClick, onAdd}) => {

    const [addresses, setAddresses] = useState([])
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (cookies.__FOsession !== undefined) {
            setUserId(cookies.__FOsession.idUsuario)
        }
        const test = async () => {
            const a = await getUserAddresses()
            setAddresses(a)

        }
        test()
    }, [onAdd])


    const getUserAddresses = async () => {
        const url = URL_Services + Direccion_Listar + cookies.__FOsession.idUsuario
        const axios = require('axios').default

        const sendMessageRequest = async () => {
            try {
                const response = await axios.get(
                    url,
                )
                return response.data.cuerpo
            } catch (err) {
                // Handle Error Here
                console.error(err)
                return false
            }
        }

        const finalResponse = await sendMessageRequest()
        return finalResponse
    }

    let address = {
        'id': 0,
        'alias': '',
        'calle': '',
        'numero': '',
        'apartamento': '',
        'referencias': '',
        'geometry': '',
    }

    function selectOption(pAddress, pMode) {
        onClick(pAddress, pMode)
    }

    const deleteUserAddress = () => {
        //consumir servicio para guardar datos, debe retornar booleano

    }

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title as="h4">
                        <Table>
                            <tr>
                                <td>
                                    Mis direcciones
                                </td>
                                <td>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id="tooltip-488980961">
                                                Nueva dirección
                                            </Tooltip>
                                        }>
                                        <Button
                                            className="btn-simple btn-link p-1 justify-content-end"
                                            type="button"
                                            variant="success"
                                            style={{fontSize: '30px', marginLeft: '28px'}}
                                            onClick={() => {
                                                selectOption(address, 'I')
                                            }}>
                                            <i className="fas fa-plus-square"></i>
                                        </Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        </Table>
                    </Card.Title>

                </Card.Header>
                <Card.Body>
                    <Table>
                        <tbody>
                        <UserListAdresses
                            addresses={addresses}
                            onClick={(address, mode) => {
                                    selectOption(address, mode)
                                    // console.log("UAddress")
                                    // console.log(address)
                                }
                            }
                        />
                        {/*<tr>*/}
                        {/*    <td className="text-start">*/}
                        {/*        <label style={{color: '#000000'}}><b>Mi casa</b> - Agraciada 2929 apto. 310 Torre 3*/}
                        {/*            Sector E Agraciada 2929 apto. 310 Torre 3 Sector E Agraciada 2929 apto. 310 Torre 3*/}
                        {/*            Sector E Agraciada 2929 apto. 310 Torre 3 Sector E</label>*/}
                        {/*    </td>*/}
                        {/*    <td className="td-actions text-right">*/}
                        {/*        <OverlayTrigger*/}
                        {/*            overlay={*/}
                        {/*                <Tooltip id="tooltip-488980961">*/}
                        {/*                    Editar*/}
                        {/*                </Tooltip>*/}
                        {/*            }*/}
                        {/*        >*/}
                        {/*            <Button*/}
                        {/*                className="btn-simple btn-link p-1"*/}
                        {/*                type="button"*/}
                        {/*                variant="info"*/}
                        {/*                onClick={() => {*/}
                        {/*                    selectOption(address, 'U')*/}
                        {/*                }}*/}
                        {/*            >*/}
                        {/*                <i className="fas fa-edit"></i>*/}
                        {/*            </Button>*/}
                        {/*        </OverlayTrigger>*/}
                        {/*        <OverlayTrigger*/}
                        {/*            overlay={*/}
                        {/*                <Tooltip id="tooltip-506045838">Eliminar</Tooltip>*/}
                        {/*            }*/}
                        {/*        >*/}
                        {/*            <Button*/}
                        {/*                className="btn-simple btn-link p-1"*/}
                        {/*                type="button"*/}
                        {/*                variant="danger"*/}
                        {/*                onClick={() => {*/}
                        {/*                    Swal.fire({*/}
                        {/*                        title: '¿Desea eliminar la dirección?',*/}
                        {/*                        showDenyButton: true,*/}
                        {/*                        confirmButtonColor: '#27ae60',*/}
                        {/*                        confirmButtonText: 'Sí',*/}
                        {/*                        denyButtonColor: '#c00e0e',*/}
                        {/*                        denyButtonText: `No`,*/}
                        {/*                    }).then((result) => {*/}
                        {/*                        if (result.isConfirmed) {*/}
                        {/*                            deleteUserAddress() //LLAMO SERVICIO PARA GUARDAR DATOS*/}
                        {/*                            const ok = true*/}
                        {/*                            if (ok) {*/}
                        {/*                                Swal.fire(*/}
                        {/*                                    {*/}
                        {/*                                        title: 'Se ha eliminado la dirección',*/}
                        {/*                                        confirmButtonColor: '#27ae60',*/}
                        {/*                                        icon: "success",*/}
                        {/*                                    }*/}
                        {/*                                )*/}
                        {/*                            } else {*/}
                        {/*                                Swal.fire(*/}
                        {/*                                    {*/}
                        {/*                                        title: 'Ha sucedido un error...',*/}
                        {/*                                        confirmButtonColor: '#c00e0e',*/}
                        {/*                                        icon: "error",*/}
                        {/*                                    }*/}
                        {/*                                )*/}
                        {/*                            }*/}
                        {/*                        } else if (result.isDenied) {*/}
                        {/*                            Swal.fire(*/}
                        {/*                                {*/}
                        {/*                                    title: 'No se ha eliminado la dirección',*/}
                        {/*                                    confirmButtonColor: '#00c0da',*/}
                        {/*                                    icon: "info",*/}
                        {/*                                }*/}
                        {/*                            )*/}
                        {/*                        }*/}
                        {/*                    })*/}
                        {/*                }}*/}
                        {/*            >*/}
                        {/*                <i className="fas fa-times"></i>*/}
                        {/*            </Button>*/}
                        {/*        </OverlayTrigger>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default UserAddresses
