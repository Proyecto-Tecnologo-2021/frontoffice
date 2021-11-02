import React, {useEffect, useState} from 'react'
import CartItem_old from "./CartItem_old";

import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CartItem from "./CartItem";


const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    useEffect(() => {
        let items = 0
        let price = 0

        cartItems.forEach(item => {
            items += item.qty
            price += item.qty * item.product.precioTotal
        })

        setTotalPrice(price)
        setTotalItems(items)

    }, [cartItems, totalPrice, totalItems, setTotalPrice, setTotalItems])

    // const getCartCount = () => {
    //     return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    // }

    return (
        <>
            {cartItems.length === 0
                ? (
                    <div>
                        No has seleccionado ningún producto aún. <Link to="/home">Volver</Link>
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-column" style={{gap: '10px'}}>
                            {cartItems.map(item => (
                                // <CartItem_old
                                //     key={item.id}
                                //     itemData={item}
                                // />
                                <>
                                    <CartItem
                                        key={item.id}
                                        itemData={item}
                                    />
                                    {/*<div className="dropdown-divider"></div>*/}
                                    <hr/>
                                </>
                            ))}
                        </div>
                        <div>
                            <span>Entregar a:</span><span> [dropdown con alias]</span>
                            <br/>
                            <span>[Dirección del alias seleccionado]</span>
                        </div>
                        <hr/>
                        <div>
                            <span>Forma de pago:</span><span> [dropdown con formas de pago]</span>
                        </div>
                        <hr/>
                        {/*<br/>*/}
                        <div>
                            <div>
                                <span>Total: ({totalItems} {totalItems > 1 ? 'productos' : 'producto'})</span>&nbsp;
                                <span>$ {totalPrice}</span>
                            </div>
                            <Button
                                className="btn-fill pull-right mt-2"
                                variant="warning"
                            >
                                Comprar
                            </Button>
                        </div>
                    </>
                )
            }

            {/*<div className="d-flex flex-column " style={{gap: '20px'}}>*/}
            {/*    {cart.map(item => (*/}
            {/*        <CartItem_old*/}
            {/*            key={item.id}*/}
            {/*            itemData={item}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h4>Mis pedidos</h4>*/}
            {/*    <div>*/}
            {/*        <span>Total: ({totalItems} producto)</span>*/}
            {/*        <span>$ {totalPrice}</span>*/}
            {/*    </div>*/}
            {/*    <Button*/}
            {/*        className="btn-fill pull-right"*/}
            {/*        variant="warning"*/}
            {/*    >*/}
            {/*        Comprar*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </>
    )
}

// const mapStateToProps = state => {
//     return {
//         cart: state.shop.cart,
//
//     }
// }
//
// export default connect(mapStateToProps)(Cart);

export default Cart;
