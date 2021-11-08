import React, {useState} from 'react'

import {adjustQty} from "../../redux/Shopping/shopping-actions";
import {Button, Card, Col, InputGroup, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {Input, InputGroupText} from "reactstrap";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../redux/actions/cartActions";

const CartItem_old = ({itemData}) => {
    const [input, setInput] = useState(itemData.qty)

    const dispatch = useDispatch()

    const getImage = () => {
        //Consumir api y obtener imagen usando product.idImagen
        return require("../../assets/img/burger1.jpeg").default
    }

    const onChangeHandler = (e) => {
        setInput(e.target.value)
        dispatch(adjustQty(itemData.id, e.target.value))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <Card
            style={{
                width: '75%',
                maxHeight: '20%',
                cursor: 'pointer',
                alignSelf: 'center',
            }}
            onClick={() => {
                // console.log("mensaje2")
            }}>
            <div className="card-image" style={{position: 'relative'}}>
                <img
                    alt="..."
                    src={getImage()}
                />
            </div>
            <Card.Body>
                <div className="">
                    <div>
                        <label>
                            {itemData.product.nom_restaurante}
                        </label>
                    </div>
                    <div>
                        {itemData.product.nombre}
                    </div>
                    <br/>
                    {itemData.product.descuento > 0 ?
                        <>
                            <div id="divPrice">
                                <b>${itemData.product.precioTotal}</b>&nbsp;
                                <strike>${itemData.product.precioSimple}</strike>&nbsp;
                            </div>
                            <div id='divDiscount'>
                                {itemData.product.descuento}% OFF
                            </div>
                        </>
                        :
                        <div>
                            <div id="divPriceWODisc">
                                <b>${itemData.product.precioSimple}</b>
                            </div>
                        </div>}
                </div>
                {/*<div>*/}
                {/*    <Link to={`/home/${itemData.id}`}>*/}
                {/*        <button*/}
                {/*            onClick={() => loadCurrentItem(itemData)}*/}
                {/*        >*/}
                {/*            View Item*/}
                {/*        </button>*/}
                {/*    </Link>*/}
                {/*</div>*/}
                <div>
                    <Row>
                        {/*<Col>*/}
                        {/*    <label*/}
                        {/*        htmlFor="Cant"*/}
                        {/*        className='mt-2'*/}
                        {/*    >*/}
                        {/*        Cant.*/}
                        {/*    </label>*/}
                        {/*</Col>*/}
                        <Col md="8">
                            <InputGroup size="sm">
                                <InputGroupText>
                                    Cant.
                                </InputGroupText>
                                <Input
                                    min="1"
                                    type="number"
                                    id="qty"
                                    name="qty"
                                    value={input}
                                    onChange={onChangeHandler}
                                    bsSize="sm"
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip id="tooltip-488980961">
                                        Quitar todos estos productos
                                    </Tooltip>
                                }
                            >
                                <Button
                                    variant="danger"
                                    className="btn-fill pull-right"
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
                    </Row>
                </div>
            </Card.Body>
        </Card>
        // <div>
        //     <img
        //         className="card-image" style={{position: 'relative'}}
        //         src={getImage()}
        //         alt={itemData.nombreProducto}
        //     />
        //     <div>
        //         <p>{itemData.nombreProducto}</p>
        //         <p>{itemData.descripcionProducto}</p>
        //         <p>$ {itemData.precioTotal}</p>
        //     </div>
        //     <div>
        //         <div>
        //             <label htmlFor="qty">Qty</label>
        //             <input
        //                 min="1"
        //                 type="number"
        //                 id="qty"
        //                 name="qty"
        //                 value={input}
        //                 onChange={onChangeHandler}
        //             />
        //         </div>
        //         <button
        //             onClick={() => removeFromCart(itemData.id)}
        //         >
        //             <img
        //                 src="https://image.flaticon.com/icons/svg/709/709519.svg"
        //                 alt=""
        //             />
        //         </button>
        //     </div>
        // </div>
    )
}

// const mapDispatchToProps = dispatch => {
//     return {
//         removeFromCart: (id) => dispatch(removeFromCart(id)),
//         adjustQty: (id, value) => dispatch(adjustQty(id, value))
//     }
// }
//
// export default connect(null, mapDispatchToProps)(CartItem_old)

export default CartItem_old
