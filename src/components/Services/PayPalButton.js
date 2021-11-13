import React, {useEffect, useRef, useState} from 'react'
import {paypalClientId} from "../../Const";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {PayPalButton as PayPalButtons} from "react-paypal-button-v2";
import CreateOrder from "./CreateOrder";
import Swal from "sweetalert2";
import {removeFromCart} from "../../redux/actions/cartActions";
import {getDollarVal} from "./getDollarVal";

const PayPalButton = ({dirId}) => {
    const [totalPrice, setTotalPrice] = useState(0.0)
    const [userId, setUserId] = useState('')
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [dollarPrice, setDollarPrice] = useState(0.0)
    const [idRest, setIdRest] = useState(0)

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const firstTime = useRef(true);

    const dispatch = useDispatch()

    useEffect(() => {

        let items = 0
        let price = 0
        let idR = 0
        let dollarVal = 44.20

        if (firstTime.current) { //Ejecuta solo la primera vez

            firstTime.current = false;

            if (cookies.__FOsession !== undefined) {
                setUserId(cookies.__FOsession.idUsuario)
            }

            getDollarVal().then((data) => {
                // dollarVal = val
                if (data !== undefined) {
                    dollarVal = data.data.rates.USD.buy
                }
            })

        }

        cartItems.forEach(item => {
            items += item.qty
            price += item.qty * item.product.precioTotal
            idR = item.product.id_restaurante
        })

        setTotalPrice(price)
        setDollarPrice(price / dollarVal)
        setIdRest(idR)

    }, [cartItems, totalPrice, setTotalPrice])

    const [initialState, setInitialState] = useState({
        amount: "2.00",
        orderID: "",
        onApproveMessage: "",
        onErrorMessage: ""
    })

    const createOrder = (data, actions) => {
        // console.log("Creating order for amount", dollarPrice);
        let num = Math.round(dollarPrice * 100) / 100
        // console.log("Rounded", num);
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: num
                    }
                }
            ]
        }).then((orderID) => {
            initialState.orderID = orderID
            return orderID;
        });
    }

    const onApprove = (data, actions) => {
        let app = this;
        return actions.order.capture().then(function (details) {
            initialState.onApproveMessage = `Transaction completed by ${details.payer.name.given_name}!`
        });
    }

    const onError = (err) => {
        console.log("When error, error was", err.toString());
        initialState.onErrorMessage = err.toString()
        // console.log(initialState);
    }

    const onClick = () => {
        // console.log("When clicked, amount was", totalPrice);
    }

    const cleanCart = () => {

        cartItems.forEach(item => {
            dispatch(removeFromCart(item.product.id))
        })

    }

    return (
        <>
            {totalPrice > 0
                ? <>
                    <PayPalButtons
                        amount={Math.round(dollarPrice * 100) / 100}
                        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onClick={onClick}
                        onSuccess={async (details, data) => {
                            // alert("Transaction completed by " + details.payer.name.given_name);
                            // console.log(details)
                            //enviar details
                            const ok = await CreateOrder("PAYPAL", dirId, totalPrice, idRest, userId, cart, details)
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
                            } else {
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
                        }}
                        options={{
                            clientId: paypalClientId,
                            disableFunding: 'card',
                        }}
                        style={{
                            height:40,
                            color: 'blue',
                        }}
                        // onButtonReady={()=> console.log("tamo cargados")}
                    />
                </>
                : <></>}
        </>
    )
        ;
}

export default PayPalButton
