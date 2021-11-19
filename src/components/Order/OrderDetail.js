import React, {useEffect, useState} from 'react'
import {useCookies} from "react-cookie";
import {getUserAddresses} from "../Services/getUserAddresses";
import {CoffeeLoading} from "react-loadingg";
import OrderRestaurant from "./OrderRestaurant";
import OrderItem from "./OrderItem";
import {Col, Row} from "react-bootstrap";
import {GetOrderById} from "../Services/getOrderById";

const OrderDetail = ({orderId}) => {
    const [loading, setLoading] = useState(true)
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [order, setOrder] = useState(undefined)
    const [userId, setUserId] = useState(undefined)
    const [address, setAddress] = useState("")

    useEffect(() => {
        let idUsuario;

        if (cookies.__FOsession !== undefined) {
            idUsuario = cookies.__FOsession.idUsuario
            setUserId(cookies.__FOsession.idUsuario)
        }

        GetOrderById(orderId).then(async (cuerpo) => {
            setOrder(cuerpo)
            setLoading(false)
            await getOrderAddress(cuerpo.iddir, idUsuario)
        })

    }, [])

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

    async function getOrderAddress(iddir, idUsuario) {
        let stringAddress;

        await getUserAddresses(idUsuario).then((val) => {

            if (val !== false) {

                val.map((address) => {

                    if (address.id === iddir) {

                        stringAddress = address.calle + " " + address.numero

                        if (address.apartamento !== "") {

                            stringAddress += "  apto. " + address.apartamento

                        }
                        stringAddress += ". " + address.referencias

                    }

                    setAddress(stringAddress)
                })
            }
        })
    }

    return (
        <>
            {loading && order === undefined && address !== undefined
                ? <CoffeeLoading/>
                :
                <>
                    <div>
                        <b>Fecha y hora del pedido:</b>&nbsp;<label >{getDateString(order.fecha)}</label>
                        <hr/>
                    </div>
                    <div>
                        <b>Estado:</b>&nbsp;{order.estado}
                        <hr/>
                    </div>
                    <div>
                        <b>Restaurante</b>
                        <OrderRestaurant restaurantId={order.idrest}/>
                        <hr/>
                    </div>
                    <div className="d-flex flex-column" style={{gap: '10px'}}>
                        <b>Tu pedido</b>
                        {order.menus.map(item => (
                            <>
                                <OrderItem
                                    key={item.id}
                                    orderItem={item}
                                />
                                <hr/>
                            </>
                        ))}
                    </div>
                    <div>
                        <Row
                            className="">
                            <Col md="12">
                                <b>Dirección seleccionada</b>
                                <label>{address}</label>
                            </Col>
                        </Row>
                    </div>
                    <hr/>
                    <Row
                        className="align-items-center"
                    >
                        <Col md="12">
                            <b>Forma de pago seleccionada:</b>&nbsp;<label>{order.tipo}</label>
                            {order.tipo === 'PAYPAL'
                                ? <>&nbsp; <b>Cotización:</b>&nbsp;<label>$ {order.cotizacion}</label></>
                                : <></>}
                        </Col>
                    </Row>
                    <hr/>
                    <div>
                        <div>
                            <b>Total: ({order.menus.length} {order.menus.length > 1 ? 'productos' : 'producto'})</b>&nbsp;
                            <b>$ {order.total}</b>
                        </div>
                        <br/>
                    </div>
                </>
            }
        </>
    )
}

export default OrderDetail
