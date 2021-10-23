import React, {useState} from 'react'
import {Button, Card, Col, Form, FormControl, InputGroup, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";
import UserListAdresses from "./UserListAdresses";

const UserAddresses = ({onClick}) => {

    let addresses = [
        {
            'alias': 'Mi casa',
            'calle': 'Avenida Agraciada',
            'num': '2929',
            'apto': '310',
            'ref': 'Esquina Evaristo Ciganda. Torre 3, sector "E"',
            'point': '-34.87663999426953,-56.19792996728697', //latlng: LatLng {lat: -34.87663999426953, lng: -56.19792996728697}
        },
        {
            'alias': 'Trabajo',
            'calle': 'Juncal',
            'num': '1234',
            'apto': '',
            'ref': 'Esq. Cerrito. Oficina 29.',
            'point': '-34.87663999426953,-56.19792996728697',
        },
        {
            'alias': 'Casa de mamá',
            'calle': 'Boulevard José Batlle y Ordóñez',
            'num': '1234',
            'apto': '',
            'ref': 'Casa rosada con luces',
            'point': '-34.87663999426953,-56.19792996728697',
        },
    ]

    let address = {
        'alias': '',
        'calle': '',
        'num': '',
        'apto': '',
        'ref': '',
        'point': '',
    }

    // let address = {
    //     'alias': 'MI CASA',
    //     'calle': 'AVENIDA AGRACIADA',
    //     'num': '2929',
    //     'apto': '310',
    //     'ref': 'ESQUINA EVARISTO CIGANDA. TORRE 3, SECTOR "E"',
    //     'point': '123,123',
    // }

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