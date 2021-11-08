import React, {useEffect, useRef, useState} from 'react'
import {Button, Col, Dropdown, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CartItem from "./CartItem";
import {useCookies} from "react-cookie";
import {getUserAddresses} from "../Services/getUserAddresses";
import {CoffeeLoading} from 'react-loadingg';
import PayPalButton from "../Services/PayPalButton";
import Swal from "sweetalert2";
import CreateOrder from "../Services/CreateOrder";
import {removeFromCart} from "../../redux/actions/cartActions";

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
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('E')
    const [idRest, setIdRest] = useState(0)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const firstTime = useRef(true);

    const firstCapital = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {

        let items = 0
        let price = 0
        let idR = 0

        cartItems.forEach(item => {
            items += item.qty
            price += item.qty * item.product.precioTotal
            idR = item.product.id_restaurante
        })

        setTotalPrice(price)
        setTotalItems(items)
        setIdRest(idR)

        if (firstTime.current) { //Ejecuta solo la primera vez

            firstTime.current = false;

            if (cookies.__FOsession !== undefined) {
                setUserId(cookies.__FOsession.idUsuario)
            }

        }

        if (cartItems.length > 0 && !!userId) { //Si tiene algun item el cart
            getUserAddresses(userId).then((a) => {
                setAddresses(a)
                setLoading(false)
                setSelectedDirectionAlias(a[0].alias)
                setSelectedDirectionId(a[0].id)
            })
        }

    }, [cartItems, totalPrice, totalItems, setTotalPrice, setTotalItems])

    const retDir = (address) => {
        let dir = " " + address.calle + " " + address.numero
        if (address.apartamento !== "") {
            dir += "  apto. " + address.apartamento
            dir += ". " + address.referencias
        }

        return dir
    }

    const cleanCart = () => {

        // console.log("cleanCart")

        cartItems.forEach(item => {
            // console.log(item)
            dispatch(removeFromCart(item.product.id))
        })

    }

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
                                : <>
                                    <Row
                                        className="align-items-center">
                                        <Col md="5">
                                            <span>Entregar a:</span>
                                        </Col>
                                        <Col md="7">
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    id=""
                                                    variant="warning"
                                                    className="w-100 btn-fill"
                                                    size="sm"
                                                >
                                                    {selectedDirectionAlias === ''
                                                        ? firstCapital(addresses[0].alias)
                                                        : firstCapital(selectedDirectionAlias)
                                                    }
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant=""
                                                    className="w-100"
                                                >
                                                    {addresses && addresses.map((address) => {
                                                        return (
                                                            <Dropdown.Item
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    setSelectedDirectionAlias(address.alias)
                                                                    setSelectedDirectionId(address.id)
                                                                    let dir = `${address.calle} ${address.numero}`
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
                                    <label
                                        className="mt-3">
                                        <b>
                                            {selectedDirectionAll === ''
                                                ? firstCapital(retDir(addresses[0]))
                                                : firstCapital(selectedDirectionAll)
                                            }
                                        </b>
                                    </label>
                                </>
                            }
                        </div>
                        <hr/>
                        <Row
                            className="align-items-center"
                        >
                            <Col md="5">
                                <span>Forma de pago:</span>
                            </Col>
                            <Col md="7">
                                {/*<span> [dropdown con formas de pago]</span>*/}
                                <Dropdown>
                                    <Dropdown.Toggle
                                        id=""
                                        variant="warning"
                                        className="w-100 btn-fill"
                                        size="sm"
                                    >
                                        {selectedPaymentMethod === 'E'
                                            ? 'Efectivo'
                                            : 'Paypal'
                                        }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        variant=""
                                        className="w-100"
                                    >
                                        <Dropdown.Item
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setSelectedPaymentMethod("E")
                                            }}>
                                            Efectivo
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setSelectedPaymentMethod("P")
                                            }}>
                                            Paypal
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <hr/>
                        <div>
                            <div>
                                <span>Total: ({totalItems} {totalItems > 1 ? 'productos' : 'producto'})</span>&nbsp;
                                <span>$ {totalPrice}</span>
                            </div>
                            <br/>
                            {selectedPaymentMethod === 'E'
                                ? <Button
                                    className="btn-fill pull-right w-100"
                                    variant="success"
                                    onClick={() => {
                                        Swal.fire({
                                            title: '¿Todo pronto?',
                                            text: "¿Hacemos el pedido?",
                                            icon: 'question',
                                            showCancelButton: true,
                                            confirmButtonColor: '#27ae60',
                                            cancelButtonColor: '#c00e0e',
                                            confirmButtonText: 'Sí',
                                            cancelButtonText: 'No',
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                const ok = await CreateOrder("EFECTIVO", selectedDirectionId, totalPrice, idRest, userId, cart, dispatch)
                                                if (ok) {
                                                    Swal.fire(
                                                        {
                                                            title: '¡Pedido realizado!',
                                                            text: 'El pedido ha sido creado y el restaurante ya ha sido notificado',
                                                            icon: 'success',
                                                            confirmButtonColor: '#27ae60',
                                                        }
                                                    )
                                                    cleanCart()
                                                }else{
                                                    Swal.fire(
                                                        {
                                                            title: 'Ups...',
                                                            text: 'Ha sucedido un error',
                                                            icon: 'error',
                                                            confirmButtonColor: '#00c0da',
                                                            confirmButtonText: 'Volver',
                                                        }
                                                    )
                                                }
                                            }
                                        })
                                    }}
                                >
                                    Comprar
                                </Button>
                                : selectedPaymentMethod === 'P'
                                    ? <PayPalButton dirId={selectedDirectionId}/>
                                    : <></>
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Cart;
