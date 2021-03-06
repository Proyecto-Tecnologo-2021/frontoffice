import React, {useState} from 'react'
import {Button, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../redux/actions/cartActions";

const CartItem = ({itemData}) => {
    const [input, setInput] = useState(itemData.qty)

    const dispatch = useDispatch()

    const getImage = () => {
        let srcImg = null

        if (itemData.product.imagen.imagen !== null) {
            srcImg = `data:image/jpeg;base64,${itemData.product.imagen.imagen}`
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

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
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
                    {itemData.qty}&nbsp;x
                </div>
            </Col>
            <Col md="5">
                <div className="text-start">
                    <p className="mb-0" style={{color: '#000000'}}>{itemData.product.nombre}</p>
                    {itemData.product.descuento > 0
                        ? <p className="mb-0 cartSmall"><strike>${itemData.product.precioSimple}</strike> ${itemData.product.precioTotal}</p>
                        : <p className="mb-0 cartSmall">${itemData.product.precioTotal}</p>
                    }
                </div>
            </Col>
            <Col md="2">
                <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-488980961">
                            Quitar estos productos
                        </Tooltip>
                    }
                >
                    <Button
                        variant="danger"
                        className="btn-fill pull-right"
                        size="sm"
                        onClick={() => {
                            Swal.fire({
                                title: '??Est??s seguro que deseas quitar todos los productos?',
                                showDenyButton: true,
                                confirmButtonColor: '#27ae60',
                                confirmButtonText: 'S??',
                                denyButtonColor: '#c00e0e',
                                denyButtonText: 'No',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    removeFromCartHandler(itemData.product.id)
                                    // removeFromCart(itemData.product.id)
                                    Swal.fire(
                                        {
                                            title: '??Se han quitado todos los productos seleccionados!',
                                            confirmButtonColor: '#27ae60',
                                            icon: "success",
                                        }
                                    )
                                }
                            })
                        }}
                    >
                        <i className="fas fa-trash-alt"/>
                    </Button>
                </OverlayTrigger>
            </Col>
            {/*</Row>*/}
        </div>
    )
}

export default CartItem
