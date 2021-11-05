import React, {useEffect, useRef, useState} from 'react'
import {dollarVal, paypalClientId} from "../../Const";
import {useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {PayPalButton as PayPalButtons} from "react-paypal-button-v2";

const PayPalButton = () => {
    const [totalPrice, setTotalPrice] = useState(0.0)
    const [userId, setUserId] = useState('')
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [dollarPrice, setDollarPrice] = useState(0.0)

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const firstTime = useRef(true);

    useEffect(() => {

        let items = 0
        let price = 0

        cartItems.forEach(item => {
            items += item.qty
            price += item.qty * item.product.precioTotal
        })

        console.log("dentro del useEffect", price)

        setTotalPrice(price)
        setDollarPrice(price / dollarVal)

        if (firstTime.current) { //Ejecuta solo la primera vez

            firstTime.current = false;

            if (cookies.__FOsession !== undefined) {
                setUserId(cookies.__FOsession.idUsuario)
            }

        }

    }, [cartItems, totalPrice, setTotalPrice])

    const [initialState, setInitialState] = useState({
        amount: "2.00",
        orderID: "",
        onApproveMessage: "",
        onErrorMessage: ""
    })

    const createOrder = (data, actions) => {
        console.log("Creating order for amount", dollarPrice);
        let num = Math.round(dollarPrice * 100) / 100
        console.log("Rounded", num);
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: num
                    }
                }
            ]
        }).then((orderID) => {
            // setInitialState({ orderID: orderID });
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
        console.log(initialState);
    }

    const onClick = () => {
        console.log("When clicked, amount was", totalPrice);
    }

    return (
        <>
            {totalPrice > 0
                ? <>
                    <PayPalButtons
                        amount={Math.round(dollarPrice * 100) / 100}
                        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onClick={onClick}
                        onSuccess={(details, data) => {
                            alert("Transaction completed by " + details.payer.name.given_name);
                            // OPTIONAL: Call your server to save the transaction
                            // return fetch("/paypal-transaction-complete", {
                            //     method: "post",
                            //     body: JSON.stringify({
                            //         orderID: data.orderID
                            //     })
                            // });
                        }}
                        options={{
                            clientId: paypalClientId,
                            disableFunding: 'card',
                        }}
                        style={{
                            height:40,
                            color: 'blue',
                        }}
                    />
                </>
                : <></>}
        </>
    )
        ;
}

export default PayPalButton
