import React, {useEffect, useState} from 'react'
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";
import {Dirreccion_Eliminar, URL_Services} from "../Const";
import {default as axios} from "axios";
import {useCookies} from "react-cookie";

const UserListAdresses = ({addresses, onClick, onDelete}) => {

    const [userId, setUserId] = useState('')
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [dummyBool, setDummyBool] = useState(false)

    useEffect(() => {
        if (cookies.__FOsession !== undefined) {
            setUserId(cookies.__FOsession.idUsuario)
        }
    }, [onDelete])

    const deleteUserAddress = async (addressId) => {
        let url = URL_Services + Dirreccion_Eliminar + addressId

        const axios = require('axios').default

        const bodyLogin = {
            id_cliente: userId,
        }
        console.log("---URL---")
        console.log(url)
        console.log(bodyLogin)
        console.log("---URL---")

        const sendMessageRequest = async () => {
            try {
                let response = await axios.put(
                    url,
                    bodyLogin,
                )
                return response.data.ok
            } catch (err) {
                // Handle Error Here
                console.error(err)
                return false
            }
        }

        const finalResponse = await sendMessageRequest()
        setDummyBool(!dummyBool)
        return finalResponse

    }

    function selectOption(pAddress, pMode) {
        onClick(pAddress, pMode)
    }

    return (
        <>
            {
                addresses && addresses.map((address) => {
                        let dir = " " + address.calle + " " + address.numero
                        if (address.apartamento !== "") {
                            dir += "  apto. " + address.apartamento
                        }
                        dir += ". " + address.referencias

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
                                                        deleteUserAddress(address.id) //LLAMO SERVICIO PARA GUARDAR DATOS
                                                        const ok = true
                                                        if (ok) {
                                                            Swal.fire(
                                                                {
                                                                    title: 'Se ha eliminado la dirección',
                                                                    confirmButtonColor: '#27ae60',
                                                                    icon: "success",
                                                                }
                                                            )
                                                            setDummyBool(!dummyBool)
                                                            onDelete(!dummyBool)
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