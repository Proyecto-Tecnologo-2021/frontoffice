import React from 'react'
import {default as axios} from "axios";
import {allOrders, listarRestaurantesAbiertos, URL_Services} from "../../Const";

export const getOrdersFromClientById = async (userId) => {
    const axios = require('axios').default

    const url = URL_Services() + allOrders + userId

    const { data } = await axios.get(url);

    return data.cuerpo;

}
