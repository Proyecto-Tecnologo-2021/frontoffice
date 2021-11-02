import React, {useState} from 'react'
import {Button, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../redux/actions/cartActions";

const CartItem = ({itemData}) => {
    const [input, setInput] = useState(itemData.qty)

    const dispatch = useDispatch()

    const getImage = () => {
        //Consumir api y obtener imagen usando product.idImagen
        return require("../../assets/img/burger1.jpeg").default
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <div className="d-flex align-items-center justify-content-start">
            {/*<Row>*/}
            <Col md="3">
                <div className="ms-2">
                    <img id="cartImage"
                         alt="..."
                         src={getImage()}/>
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
                    <p className="mb-0 cartSmall">${itemData.product.precioTotal}</p>
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
                                title: '¿Estás seguro que deseas quitar todos los productos?',
                                showDenyButton: true,
                                confirmButtonColor: '#27ae60',
                                confirmButtonText: 'Sí',
                                denyButtonColor: '#c00e0e',
                                denyButtonText: 'No',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    removeFromCartHandler(itemData.product.id)
                                    // removeFromCart(itemData.product.id)
                                    Swal.fire(
                                        {
                                            title: '¡Se han quitado todos los productos seleccionados!',
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
