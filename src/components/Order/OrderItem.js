import React from 'react'
import {Button, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";

const OrderItem = ({orderItem}) => {
    const getImage = () => {
        let srcImg = null

        if (orderItem.imagen !== null) {
            srcImg = `data:image/jpeg;base64,${orderItem.imagen.imagen}`
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

    return (
        <div className="d-flex align-items-center justify-content-start">
            <Col md="3">
                <div className="ms-2">
                    {getImage()}
                </div>
            </Col>
            <Col md="2">
                <div className="ms-4 cartSmall">
                    {/*{orderItem.qty}&nbsp;x*/}
                    1&nbsp;x
                </div>
            </Col>
            <Col md="5">
                <div className="text-start">
                    <p className="mb-0" style={{color: '#000000'}}>{orderItem.nombre}</p>
                    <p className="mb-0 cartSmall">${orderItem.precioTotal}</p>
                </div>
            </Col>
        </div>
    )
}

export default OrderItem
