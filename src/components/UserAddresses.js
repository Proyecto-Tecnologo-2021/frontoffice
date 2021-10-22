import React from 'react'
import {Button, Card, Col, Form, FormControl, InputGroup, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";

const UserAddresses = () => {
    const deleteUserAddress = () => {
        //consumir servicio para guardar datos, debe retornar booleano

    }

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title as="h4">Mis direcciones</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table>
                        <tbody>
                        <tr>
                            <td className="text-start">
                                <label style={{color: '#000000'}}><b>Mi casa</b> - Agraciada 2929 apto. 310 Torre 3
                                    Sector E Agraciada 2929 apto. 310 Torre 3 Sector E Agraciada 2929 apto. 310 Torre 3
                                    Sector E Agraciada 2929 apto. 310 Torre 3 Sector E</label>
                            </td>
                            <td className="td-actions text-right">
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip id="tooltip-488980961">
                                            Editar
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        className="btn-simple btn-link p-1"
                                        type="button"
                                        variant="info"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip id="tooltip-506045838">Eliminar</Tooltip>
                                    }
                                >
                                    <Button
                                        className="btn-simple btn-link p-1"
                                        type="button"
                                        variant="danger"
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
                                                    deleteUserAddress() //LLAMO SERVICIO PARA GUARDAR DATOS
                                                    const ok = false
                                                    if (ok) {
                                                        Swal.fire(
                                                            {
                                                                title: 'Se ha eliminado la dirección',
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
                                                            title: 'No se ha eliminado la dirección',
                                                            confirmButtonColor: '#00c0da',
                                                            icon: "info",
                                                        }
                                                    )
                                                }
                                            })
                                        }}
                                    >
                                        <i className="fas fa-times"></i>
                                    </Button>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-start">
                                <label style={{color: '#000000'}}><b>Mi casa</b> - Agraciada 2929 apto. 310 Torre 3
                                    Sector E</label>
                            </td>
                            <td className="td-actions text-right">
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip id="tooltip-488980961">
                                            Editar
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        className="btn-simple btn-link p-1"
                                        type="button"
                                        variant="info"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip id="tooltip-506045838">Eliminar</Tooltip>
                                    }
                                >
                                    <Button
                                        className="btn-simple btn-link p-1"
                                        type="button"
                                        variant="danger"
                                    >
                                        <i className="fas fa-times"></i>
                                    </Button>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-start">
                                <label style={{color: '#000000'}}><b>Mi casa</b> - Agraciada 2929 apto. 310 Torre 3
                                    Sector E</label>
                            </td>
                            <td className="td-actions text-right">
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip id="tooltip-488980961">
                                            Editar
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        className="btn-simple btn-link p-1"
                                        type="button"
                                        variant="info"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip id="tooltip-506045838">Eliminar</Tooltip>
                                    }
                                >
                                    <Button
                                        className="btn-simple btn-link p-1"
                                        type="button"
                                        variant="danger"
                                    >
                                        <i className="fas fa-times"></i>
                                    </Button>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td className="text-start">*/}
                        {/*        <label htmlFor="exampleInputEmail1">*/}
                        {/*            Mi casa*/}
                        {/*        </label>*/}
                        {/*        <Form.Control*/}
                        {/*            defaultValue="Agraciada 2929 apto. 310 Torre 3 Sector E"*/}
                        {/*            disabled*/}
                        {/*            type="text"*/}
                        {/*        ></Form.Control>*/}
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
                        {/*            >*/}
                        {/*                <i className="fas fa-times"></i>*/}
                        {/*            </Button>*/}
                        {/*        </OverlayTrigger>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td className="text-start">*/}
                        {/*        <Form.Control*/}
                        {/*            defaultValue="Mi casa - Agraciada 2929 apto. 310 Torre 3 Sector E"*/}
                        {/*            disabled*/}
                        {/*            type="text"*/}
                        {/*        ></Form.Control>*/}
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
                        {/*            >*/}
                        {/*                <i className="fas fa-times"></i>*/}
                        {/*            </Button>*/}
                        {/*        </OverlayTrigger>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td className="text-start">*/}
                        {/*        <InputGroup>*/}
                        {/*            <InputGroup.Text>Mi Casa</InputGroup.Text>*/}
                        {/*            <Form.Control*/}
                        {/*                defaultValue="Agraciada 2929 apto. 310 Torre 3 Sector E"*/}
                        {/*                disabled*/}
                        {/*                type="text"*/}
                        {/*            ></Form.Control>*/}
                        {/*        </InputGroup>*/}
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
                        {/*            >*/}
                        {/*                <i className="fas fa-times"></i>*/}
                        {/*            </Button>*/}
                        {/*        </OverlayTrigger>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td className="text-start">*/}
                        {/*        <InputGroup>*/}
                        {/*            <InputGroup.Text>Mi Casa</InputGroup.Text>*/}
                        {/*            <Form.Control*/}
                        {/*                defaultValue="Agraciada 2929 apto. 310 Torre 3 Sector E"*/}
                        {/*                disabled*/}
                        {/*                type="text"*/}
                        {/*            ></Form.Control>*/}
                        {/*            <OverlayTrigger*/}
                        {/*                overlay={*/}
                        {/*                    <Tooltip id="tooltip-488980961">*/}
                        {/*                        Editar*/}
                        {/*                    </Tooltip>*/}
                        {/*                }*/}
                        {/*            >*/}
                        {/*                <Button variant="outline-secondary" variant="info">*/}
                        {/*                    <i className="fas fa-edit"></i>*/}
                        {/*                </Button>*/}
                        {/*            </OverlayTrigger>*/}
                        {/*            <OverlayTrigger*/}
                        {/*                overlay={*/}
                        {/*                    <Tooltip id="tooltip-488980961">*/}
                        {/*                        Eliminar*/}
                        {/*                    </Tooltip>*/}
                        {/*                }*/}
                        {/*            >*/}
                        {/*                <Button variant="outline-secondary" variant="danger">*/}
                        {/*                    <i className="fas fa-times"></i>*/}
                        {/*                </Button>*/}
                        {/*            </OverlayTrigger>*/}
                        {/*        </InputGroup>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td className="text-start">*/}
                        {/*        <b>Mi casa</b> - Agraciada 2929 apto. 310 Torre 3 (...)*/}
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