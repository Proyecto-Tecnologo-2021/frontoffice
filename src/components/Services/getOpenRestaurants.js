import React from 'react'
import {listarRestaurantesAbiertos, URL_Services} from "../../Const";
import {default as axios} from "axios";

export const GetOpenRestaurants = async () => {
    const url = URL_Services() + listarRestaurantesAbiertos
    const axios = require('axios').default

    const { data } = await axios.get(url);

    return data.cuerpo;
}
