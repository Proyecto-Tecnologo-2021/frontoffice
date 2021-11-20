import React, {useEffect, useState} from 'react'
import {Col, OverlayTrigger, ProgressBar, Row, Tooltip} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {Pedido_Last, URL_Services, Usuario_Login} from "../../Const";
import {default as axios} from "axios";
import {setSession} from "../SessionService";
import jwt from "jsonwebtoken";
import {getToken, onMessageListener} from "../../firebase/Firebase";

const OrderProgress = () => {
    const [lastOrder, setLastOrder] = useState({})
    const [userId, setUserId] = useState('')
    const [cookies, setCookie] = useCookies(['__FOsession'])


    useEffect(() => {

        getLastOrder().then((cuerpo) => {
            setLastOrder(cuerpo)
        })

        let interval
        // if (openChat) {
        interval = setInterval(() => {
            console.log('Logs every ' + timeMs + ' miliseconds')

            getLastOrder().then((cuerpo) => {
                setLastOrder(cuerpo)
            })

        }, timeMs)

        return () => {
            console.log('cleaned up')
            clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }
    }, [])

    const getLastOrder = async () => {
        const url = URL_Services() + Pedido_Last + cookies.__FOsession.idUsuario
        const axios = require('axios').default
        const sendMessageRequest = async () => {
            try {
                const response = await axios.get(
                    url,
                )
                return response.data
            } catch (err) {
                console.error(err)
                return null
            }
        }
        const finalResponse = await sendMessageRequest()
        if (finalResponse !== null) {
            return finalResponse.cuerpo
        } else {
            return false
        }
    }

    const timeMs = 60000

    const checkState = () => {

        const stateOrder = {
            loading: true,
            variant: 'info',
            percentage: 100,
            shortText: 'Obteniendo estado...',
            longText: 'Obteniendo estado...',
            animated: true,
            noOrders: false,
        }

        //Si el servicio devuelve vacío el último pedido, noOrder = true, sino noOrder = false

        if(lastOrder !== null) {
            switch (lastOrder.estado) {
                case "SOLICITADO":
                    stateOrder.loading = false
                    stateOrder.variant = 'warning'
                    stateOrder.percentage = 25
                    stateOrder.shortText = lastOrder.estado
                    stateOrder.longText = 'Tu pedido fue solicitado y será respondido a la brevedad por el restaurante'
                    break

                case "CONFIRMADO":
                    stateOrder.loading = false
                    stateOrder.variant = 'warning'
                    stateOrder.percentage = 50
                    stateOrder.shortText = lastOrder.estado
                    stateOrder.longText = '¡Tu pedido ha sido confirmado! En unos momentos el restaurante lo enviará a la dirección solicitada'
                    break

                case "ENVIADO":
                    stateOrder.loading = false
                    stateOrder.variant = 'warning'
                    stateOrder.percentage = 75
                    stateOrder.shortText = lastOrder.estado
                    stateOrder.longText = '¡Tu pedido ya está en la calle!'
                    break

                case "ENTREGADO":
                    stateOrder.loading = false
                    stateOrder.variant = 'success'
                    stateOrder.percentage = 100
                    stateOrder.shortText = lastOrder.estado
                    stateOrder.longText = 'Tu pedido ha sido entregado ¡Bon Appetit!'
                    stateOrder.animated = false
                    break

                case "RECHAZADO":
                    stateOrder.loading = false
                    stateOrder.variant = 'danger'
                    stateOrder.percentage = 100
                    stateOrder.shortText = lastOrder.estado
                    stateOrder.longText = 'Tu pedido ha sido rechazado por el restaurante'
                    stateOrder.animated = false
                    break

                case "CANCELADO":
                    stateOrder.loading = false
                    stateOrder.variant = 'danger'
                    stateOrder.percentage = 100
                    stateOrder.shortText = lastOrder.estado
                    stateOrder.longText = 'Tu pedido ha sido cancelado'
                    stateOrder.animated = false
                    break

                default:
                    stateOrder.variant = 'info'
                    stateOrder.percentage = 100
                    stateOrder.shortText = 'Cargando...'
                    stateOrder.longText = 'Cargando...'
                    break
            }
        }

        return (
            <>
                {stateOrder.noOrders
                    ? <span>Aún no has hecho ningún pedido, ¿Qué tal si hacemos el primero?</span>
                    : <>
                        <Row
                            className="mt-1">
                            <Col md="4">
                                <span>Estado de tu último pedido: {stateOrder.shortText}</span>
                            </Col>
                            <Col
                                md="7"
                                className="mt-1">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id="tooltip-488980961">
                                            {stateOrder.longText}
                                        </Tooltip>
                                    }>
                                    <ProgressBar
                                        animated={stateOrder.animated}
                                        variant={stateOrder.variant}
                                        now={stateOrder.percentage}
                                    />
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </>
                }
            </>
        )
    }


    return (
        <>
            {checkState()}
        </>
    )
}

export default OrderProgress
