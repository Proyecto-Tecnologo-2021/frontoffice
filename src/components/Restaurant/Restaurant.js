import React from 'react'
import {Card, Col, Row, Stack} from "react-bootstrap";

const Restaurant = ({restaurant}) => {

    // const restaurant = {
    //     id: 0,
    //     nombre: '',
    //     horarioApertura: '',
    //     horarioCierre: '',
    //     direccion: {
    //         id_cliente: 0,
    //         alias: '',
    //         calle: '',
    //         numero: '',
    //         apartamento: '',
    //         referencias: '',
    //         geometry: '',
    //     },
    //     imagen: {
    //         id: '',
    //         identificador: '',
    //         imagen: '',
    //     },
    //     abierto: true,
    // }

    const getImage = () => {
        //Consumir api y obtener imagen usando product.idImagen
        // return require("../../assets/img/burger1.jpeg").default

        let srcImg = null

        if(restaurant.imagen.imagen !== null){
            srcImg = `data:image/jpeg;base64,${restaurant.imagen.imagen}`
        }else{
            srcImg = require("../../assets/img/nodisponible.png").default
        }

        return (
            <img
                id="cartImage"
                alt="..."
                // src={`data:image/jpeg;base64,${restaurant.imagen.imagen}`}
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

    return (
        <>
            <Card
                style={{
                    width: '33%',
                    maxHeight: '15%',
                    cursor: 'pointer',
                }}
            >
                <Card.Body>
                    <div >
                        <Row>
                            <Col md="3">
                                {getImage()}
                            </Col>

                            <Col md="8" className="restaurantStack ms-3">
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
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Restaurant
