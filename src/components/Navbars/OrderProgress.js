import React, {useState} from 'react'
import {Col, OverlayTrigger, ProgressBar, Row, Tooltip} from "react-bootstrap";

const OrderProgress = () => {
    const [lastOrder, setLastOrder] = useState({
        "idcli": 0,
        "iddir": 0,
        "menus": [{
            "id": 0,
            "id_restaurante": 0,
            "nom_restaurante": "",
            "descuento": 0.0,
            "nombre": "",
            "descripcion": "",
            "precioSimple": 0,
            "precioTotal": 0,
            "extras": null,
            "productos": null,
            "id_imagen": null,
            "imagen": null
        }],
        "pago": true,
        "tipo": "",
        "total": "",
        "idrest": 0,
        "fecha": null,
        "estado": "",
    })

    // SOLICITADO   1
    // CONFIRMADO   2
    // RECHAZADO    fin (rojo
    // ENVIADO      3
    // ENTREGADO    4 fin verde
    // CANCELADO    fin rojo

    // {
    //     "idcli":10,
    //     "iddir":1,
    //     "menus":[{
    //         "id": 2,
    //         "id_restaurante": 9,
    //         "nom_restaurante": "Como en Casa GlutenFree",
    //         "descuento": 0.0,
    //         "nombre": "Hamburguesa al pan",
    //         "descripcion": "Hamburguesa al pan con lechuga tomate queso",
    //         "precioSimple": 100.0,
    //         "precioTotal": 100.0,
    //         "extras": null,
    //         "productos": null,
    //         "id_imagen": null,
    //         "imagen": null
    //     }],
    //     "pago":true,
    //     "tipo":"EFECTIVO",
    //     "total":"500",
    //     "idrest":9,
    //     "fecha":null,
    //     "estado": "CONFIRMADO",
    // }

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
