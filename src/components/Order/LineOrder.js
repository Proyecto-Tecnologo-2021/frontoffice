import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Row, Stack} from "react-bootstrap";
import {getRestaurantById} from "../Services/getRestaurantById";
import {useCookies} from "react-cookie";

const LineOrder = ({order, selectedOrder}) => {
    const [restaurant, setRestaurant] = useState(undefined)
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(true)

    const getImage = () => {
        let srcImg = null

        if (restaurant.imagen.imagen !== null) {
            srcImg = `data:image/jpeg;base64,${restaurant.imagen.imagen}`
        } else {
            srcImg = require("../../assets/img/nodisponible.png").default
        }

        return (
            <img
                id="cartImage"
                alt="..."
                src={srcImg}
            />
        )
    }

    function getDateString(date) {
        let stringDate = null
        switch (date.dayOfWeek) {
            case 'SUNDAY':
                stringDate = 'Domingo'
                break

            case 'MONDAY':
                stringDate = 'Lunes'
                break

            case 'TUESDAY':
                stringDate = 'Martes'
                break

            case 'WEDNESDAY':
                stringDate = 'Miércoles'
                break

            case 'THURSDAY':
                stringDate = 'Jueves'
                break

            case 'FRIDAY':
                stringDate = 'Viernes'
                break

            case 'SATURDAY':
                stringDate = 'Sábado'
                break

            default:
                stringDate = ''

        }

        stringDate += ' ' + date.dayOfMonth.toString()

        stringDate += ' '

        switch (date.month) {
            case 'JANUARY':
                stringDate += 'Enero'
                break

            case 'FEBRUARY':
                stringDate += 'Febrero'
                break

            case 'MARCH':
                stringDate += 'Marzo'
                break

            case 'APRIL':
                stringDate += 'Abril'
                break

            case 'MAY':
                stringDate += 'Mayo'
                break

            case 'JUNE':
                stringDate += 'Junio'
                break

            case 'JULY':
                stringDate += 'Julio'
                break

            case 'AUGUST':
                stringDate += 'Agosto'
                break

            case 'SEPTEMBER':
                stringDate += 'Setiembre'
                break

            case 'OCTOBER':
                stringDate += 'Octubre'
                break

            case 'NOVEMBER':
                stringDate += 'Noviembre'
                break

            case 'DECEMBER':
                stringDate += 'Diciembre'
                break

            default:
                stringDate += ''

        }

        // stringDate += ' de ' + date.year

        stringDate += ' a las '

        if (date.hour < 10) {
            stringDate += '0'
        }

        stringDate += date.hour.toString() + ':'

        if (date.minute < 10) {
            stringDate += '0'
        }

        stringDate += date.minute.toString()

        return stringDate

    }

    function getAddress(address) {
        let stringAddress;

        stringAddress = address.alias + " - " + address.calle + " " + address.numero

        if (address.apartamento !== "") {
            stringAddress += "  apto. " + address.apartamento + "."
        } else {
            stringAddress += "."
        }

        // setAlias(address.alias)
        setAddress(stringAddress)

    }

    useEffect(() => {

        getRestaurantById(order.idrest).then((data) => {
            setRestaurant(data)
            getAddress(order.direccion)
            setLoading(false)
        })

        // setLoading(false)

    }, [])

    // const select = (id) => {
    //     // selectOrder(id)
    //     alert(id)
    // }

    return (
        <>
            {/*{restaurant === undefined || address === undefined*/}
            {loading
                ? <></>
                :
                <Row className="pb-4">
                    <Card
                        style={{
                            width: '80%',
                            maxHeight: '33%',
                            cursor: 'pointer',
                            gap: '10px',
                        }}
                        className="ms-5"
                    >
                        <Card.Body>
                            <Row>
                                {/*Logo*/}

                                <Col
                                    md="1"
                                    onClick={() => {
                                        selectedOrder(order.id)
                                    }}>
                                    {getImage()}
                                </Col>

                                {/*Nombre restaurante y fecha hora del pedido*/}
                                <Col
                                    md="5"
                                    className="orderRestaurantStack ms-2"
                                    onClick={() => {
                                        selectedOrder(order.id)
                                    }}>
                                    <Stack>
                                        <div>
                                            {restaurant.nombre}
                                        </div>
                                        <div>
                                            <label>{getDateString(order.fecha)}</label>
                                        </div>
                                        <div>
                                            Enviado a: <label>{address}</label>
                                        </div>
                                    </Stack>
                                </Col>

                                <Col
                                    md="4"
                                    onClick={() => {
                                        selectedOrder(order.id)
                                    }}>
                                    <Stack>
                                        <div>
                                            Forma de pago: <label>{order.tipo}</label>
                                        </div>
                                        {order.tipo === 'PAYPAL'
                                            ?
                                            <div>
                                                Cotización: <label>${order.cotizacion}</label>
                                            </div>
                                            : <></>
                                        }
                                        <div>
                                            Total: <b><label>${order.total}</label></b>
                                        </div>
                                    </Stack>
                                </Col>

                                {/*Botones para calificar y reclamar*/}
                                <Col>
                                    <Stack>
                                        <div>
                                            <Button className="w-100 mb-1 btn-fill" variant="warning">
                                                Calificar pedido
                                            </Button>
                                        </div>
                                        <div>
                                            <Button className="w-100 btn-fill mb-1" variant="warning">
                                                Reclamar
                                            </Button>
                                        </div>
                                    </Stack>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                </Row>
            }
        </>
    )
}

export default LineOrder
