import React from 'react'
import {listarRestaurantesAbiertos, orderById, URL_Services} from "../../Const";
import {default as axios} from "axios";

export const GetOrderById = async (orderId) => {
    const url = URL_Services() + orderById + orderId
    const axios = require('axios').default

    const { data } = await axios.get(url);

    return data.cuerpo;
}
