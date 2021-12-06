import React, {useEffect, useState} from 'react'
import {Button, Col, Dropdown, Row} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {getLastOrder} from "../Services/getLastOrder";
import OrderItem from "./OrderItem";
import OrderRestaurant from "./OrderRestaurant";
import {CoffeeLoading} from "react-loadingg";
import {getUserAddresses} from "../Services/getUserAddresses";
import CartItem from "../Cart/CartItem";

const Order = () => {
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(1)
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [lastOrder, setLastOrder] = useState(undefined)
    const [userId, setUserId] = useState(undefined)
    const [address, setAddress] = useState("")

    useEffect(() => {
        let idUsuario;

        if (cookies.__FOsession !== undefined) {
            idUsuario = cookies.__FOsession.idUsuario
            setUserId(cookies.__FOsession.idUsuario)
        }

        getLastOrder(idUsuario).then(async (cuerpo) => {
            setLastOrder(cuerpo)
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
            {loading && lastOrder === undefined && address !== undefined
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
                                <b>Dirección seleccionada</b>
                                <label>&nbsp;{address}</label>
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
