import React from 'react'
import {pedidoCrear, URL_Services} from "../../Const";
import {default as axios} from "axios";

export const CreateOrder = async (tipo, dirId, totalPrice, idRest, userId, cart, details, quotation) => {

    const {cartItems} = cart;

    const url = URL_Services() + pedidoCrear

    const axios = require('axios').default

    const sendMessageRequest = async () => {
        try {
            let response

            response = await axios.post(
                url,
                bodyOrder,
            )

            return response.data.ok

        } catch (err) {
            // Handle Error Here
            console.error(err)
            return false
        }
    }

    const getMenus = () => {
        let menu = []

        cartItems.forEach(item => {
            menu = [...menu,
                {
                    "id": item.product.id,
                    "id_restaurante": item.product.id_restaurante,
                    "tipo": item.product.tipo,
                },
            ]
        })

        return menu
    }

    const bodyOrder = {
        "idcli": userId,
        "iddir": dirId,
        "menus": getMenus(),
        "pago": true,
        "tipo": tipo,
        "total": totalPrice,
        "idrest": idRest,
        "fecha": null,
        "id_paypal": details.id,
        "cotizacion": quotation,
    }

    const finalResponse = await sendMessageRequest()

    return finalResponse

}

export default CreateOrder;
