import React, {useState} from 'react'
import {BraintreePayPalButtons, PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {paypalClientId} from "../../Const";

const PayPalButton = ({amount}) => {
    const [initialState, setInitialState] = useState({
        amount: "2.00",
        orderID: "",
        onApproveMessage: "",
        onErrorMessage: ""
    })

    const createOrder = (data, actions, amountp) => {
        console.log("Creating order for amount", amountp);
        const num = Math.round(amountp * 100) / 100
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
        console.log("When clicked, amount was", amount);
    }

    return (
        <PayPalScriptProvider
            deferLoading={false}
            options={{
                "client-id": paypalClientId,
            }}
        >
            <PayPalButtons
                style={{
                    layout: "horizontal"
                }}
                createOrder={(data, actions) => createOrder(data, actions, amount)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onError={(err) => onError(err)}
                onClick={onClick}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButton
