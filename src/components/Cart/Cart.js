import React, {useEffect, useRef, useState} from 'react'
import {Button, Col, Dropdown, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CartItem from "./CartItem";
import {useCookies} from "react-cookie";
import {getUserAddresses} from "../Services/getUserAddresses";
import {CoffeeLoading} from 'react-loadingg';


const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [userId, setUserId] = useState('')
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedDirectionAlias, setSelectedDirectionAlias] = useState('')
    const [selectedDirectionId, setSelectedDirectionId] = useState(0)
    const [selectedDirectionAll, setSelectedDirectionAll] = useState('')

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const firstTime = useRef(true);

    const firstCapital = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {

        const getUA = async () => {
            const a = await getUserAddresses(userId)
            setAddresses(a)
        }

        let items = 0
        let price = 0

        cartItems.forEach(item => {
            items += item.qty
            price += item.qty * item.product.precioTotal
        })

        setTotalPrice(price)
        setTotalItems(items)

        if (firstTime.current) { //Ejecuta solo la primera vez

            firstTime.current = false;

            if (cookies.__FOsession !== undefined) {
                setUserId(cookies.__FOsession.idUsuario)
            }

        }

        if (cartItems.length > 0) { //Si tiene algun item el cart
            getUA()
            setLoading(false)
        }

    }, [cartItems, totalPrice, totalItems, setTotalPrice, setTotalItems])

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
                                <>
                                    <CartItem
                                        key={item.id}
                                        itemData={item}
                                    />
                                    <hr/>
                                </>
                            ))}
                        </div>
                        <div>
                            {loading
                                ? <CoffeeLoading/>
                                : <Row>
                                    <Col md="4">
                                        <span>Entregar a:</span>
                                    </Col>
                                    <Col md="8">
                                        <Dropdown>
                                            <Dropdown.Toggle id="" variant="">
                                                {selectedDirectionAlias === ''
                                                    ? firstCapital('addresses[0].alias')
                                                    : firstCapital(selectedDirectionAlias)
                                                }
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu variant="">
                                                {addresses && addresses.map((address) => {
                                                    return (
                                                        <Dropdown.Item
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setSelectedDirectionAlias(address.alias)
                                                                setSelectedDirectionId(address.id)
                                                                let dir = " " + address.calle + " " + address.numero
                                                                if (address.apartamento !== "") {
                                                                    dir += "  apto. " + address.apartamento
                                                                }
                                                                dir += ". " + address.referencias
                                                                setSelectedDirectionAll(dir)
                                                            }}
                                                        >
                                                            {firstCapital(address.alias)}
                                                        </Dropdown.Item>
                                                    )
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            }
                            <br/>
                            <label>
                                {selectedDirectionAll === ''
                                    ? ''
                                    // let dir = " " + address.calle + " " + address.numero
                                    // if (address.apartamento !== "") {
                                    //     dir += "  apto. " + address.apartamento
                                    //     dir += ". " + address.referencias
                                    // }
                                    : firstCapital(selectedDirectionAll)
                                }
                                {}
                            </label>
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
