import React, {useEffect, useState} from 'react'
import {Button, Col, Dropdown, Row} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {getLastOrder} from "../Services/getLastOrder";
import OrderItem from "./OrderItem";
import OrderRestaurant from "./OrderRestaurant";
import {CoffeeLoading} from "react-loadingg";

const Order = () => {
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(1)
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [lastOrder, setLastOrder] = useState(undefined)

    useEffect(() => {
        let idUsuario;

        if (cookies.__FOsession !== undefined) {
            idUsuario = cookies.__FOsession.idUsuario
        }

        getLastOrder(idUsuario).then((cuerpo) => {
            setLastOrder(cuerpo)
            console.log(cuerpo)
            setLoading(false)
        })

    }, [])

    function getDateString(date) {
        console.log(date)
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

    return (
        <>
            {loading && lastOrder === undefined
                ? <CoffeeLoading/>
                :
                <>
                    <div>
                        <b>Fecha y hora del pedido:</b>&nbsp;<label >{getDateString(lastOrder.fecha)}</label>
                        <hr/>
                    </div>
                    <div>
                        <b>Estado:</b>&nbsp;{lastOrder.estado}
                        <hr/>
                    </div>
                    <div>
                        <b>Restaurante</b>
                        <OrderRestaurant restaurantId={lastOrder.idrest}/>
                        <hr/>
                    </div>
                    <div className="d-flex flex-column" style={{gap: '10px'}}>
                        <b>Tu pedido</b>
                        {lastOrder.menus.map(item => (
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
                                <b>Dirección seleccionada:</b>
                            </Col>
                        </Row>
                    </div>
                    <hr/>
                    <Row
                        className="align-items-center"
                    >
                        <Col md="12">
                            <b>Forma de pago seleccionada:</b>&nbsp;<label>{lastOrder.tipo}</label>
                            {lastOrder.tipo === 'PAYPAL'
                                ? <>&nbsp; <b>Cotización:</b>&nbsp;<label>$ {lastOrder.cotizacion}</label></>
                                : <></>}
                        </Col>
                    </Row>
                    <hr/>
                    <div>
                        <div>
                            <b>Total: ({lastOrder.menus.length} {lastOrder.menus.length > 1 ? 'productos' : 'producto'})</b>&nbsp;
                            <b>$ {lastOrder.total}</b>
                        </div>
                        <br/>
                    </div>
                </>
            }
        </>
    )
}

export default Order
