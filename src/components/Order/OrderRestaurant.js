import React, {useEffect, useState} from 'react'
import {Col, Row, Stack} from "react-bootstrap";
import {CoffeeLoading} from "react-loadingg";
import {getRestaurantById} from "../Services/getRestaurantById";

const OrderRestaurant = ({restaurantId}) => {
    const [restaurant, setRestaurant] = useState(undefined)
    const [loading, setLoading] = useState(true)

    const getImage = () => {
        //Consumir api y obtener imagen usando product.idImagen
        // return require("../../assets/img/burger1.jpeg").default

        let srcImg = null

        if (restaurant !== undefined) {
            if (restaurant.imagen.imagen !== null && restaurant.imagen.imagen !== undefined) {
                srcImg = `data:image/jpeg;base64,${restaurant.imagen.imagen}`
            } else {
                srcImg = require("../../assets/img/nodisponible.png").default
            }
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

    function getStringSchedule() {
        let ret = ''

        if (restaurant.horarioApertura.hour < 10)
            ret = '0'

        ret += restaurant.horarioApertura.hour.toString() + ':'

        if (restaurant.horarioApertura.minute < 10)
            ret += '0'

        ret += restaurant.horarioApertura.minute.toString()

        ret += " - "

        if (restaurant.horarioCierre.hour < 10)
            ret += '0'

        ret += restaurant.horarioCierre.hour.toString() + ':'

        if (restaurant.horarioCierre.minute < 10)
            ret += '0'

        ret += restaurant.horarioCierre.minute.toString()

        return ret;
    }

    useEffect(() => {

        getRestaurantById(restaurantId).then((a) => {
            setRestaurant(a)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {loading && restaurant === undefined
                ? <></>//<CoffeeLoading/>
                :
                <Row>
                    <Col md="3">
                        {getImage()}
                    </Col>

                    <Col md="8" className="ms-3">
                        <Stack>
                            <div>
                                {restaurant.nombre}
                            </div>
                            <div>
                                <label>{getStringSchedule()}</label> &nbsp; {restaurant.abierto
                                ? <label style={{color: '#17be00'}}><b>¡Abierto!</b></label>
                                : <label style={{color: '#ff0000'}}><b>Cerrado</b></label>
                            }
                            </div>
                            <div>
                                <label>{restaurant.direccion}</label>
                            </div>
                        </Stack>
                    </Col>
                </Row>
            }
        </>
    )
}

export default OrderRestaurant
