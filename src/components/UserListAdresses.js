import React from 'react'
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";

const UserListAdresses = ({addresses, onClick}) => {

    const deleteUserAddress = () => {
        //consumir servicio para guardar datos, debe retornar booleano

    }

    function selectOption(pAddress, pMode) {
        onClick(pAddress, pMode)
    }

    return (
        <>
            {
                addresses && addresses.map((address) => {
                        let dir = " " + address.calle + " " + address.num
                        if (address.apto !== "") {
                            dir += "  apto. " + address.apto
                        }
                        dir += ". " + address.ref

                        return (
                            <tr>
                                <td className="text-start">
                                    <label
                                        style={{color: '#000000'}}><b>{address.alias}</b> - {dir}
                                    </label>
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
                                            onClick={() => {
                                                selectOption(address, 'U')
                                            }}
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
                                                    title: '¿Desea eliminar la dirección?',
                                                    showDenyButton: true,
                                                    confirmButtonColor: '#27ae60',
                                                    confirmButtonText: 'Sí',
                                                    denyButtonColor: '#c00e0e',
                                                    denyButtonText: `No`,
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteUserAddress() //LLAMO SERVICIO PARA GUARDAR DATOS
                                                        const ok = true
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
                        )
                    }
                )
            }
        </>
    )
}

export default UserListAdresses