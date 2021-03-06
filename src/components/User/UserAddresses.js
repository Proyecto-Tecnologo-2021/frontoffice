import React, {useEffect, useState} from 'react'
import {Button, Card, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import UserListAdresses from "./UserListAdresses";
import {Direccion_Listar, URL_Services} from "../../Const";
import {useCookies} from 'react-cookie'
import {default as axios} from "axios";

const UserAddresses = ({onClick, onAdd, updDel}) => {

    const [addresses, setAddresses] = useState([])
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [userId, setUserId] = useState('')
    const [onDelete, setOnDelete] = useState(false)

    useEffect(() => {

        if (cookies.__FOsession !== undefined) {
            setUserId(cookies.__FOsession.idUsuario)
        }

        const getUA = async () => {
            const a = await getUserAddresses()
            setAddresses(a)
        }

        getUA()

    }, [onAdd, onDelete])

    const getUserAddresses = async () => {
        const url = URL_Services() + Direccion_Listar + cookies.__FOsession.idUsuario
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

    function updOnDelete(value) {
        setOnDelete(value)
        updDel(value)
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
                                                Nueva direcci??n
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
                            onDelete={(value) => updOnDelete(value)}
                        />
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default UserAddresses
