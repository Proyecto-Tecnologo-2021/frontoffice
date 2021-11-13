import React from 'react'
import {default as axios} from "axios";
import {urlCotizaciones} from "../../Const";

export const getDollarVal = async () => {
    const axios = require('axios').default
    let data = {}

    let today = new Date()
    const fecha = today.toISOString().split('T')[0]

    const url = urlCotizaciones + fecha

    try {
        return data = await axios.get(url);
    } catch (e) {
        console.error(e)
        return false
    }


}
