import React from 'react'
import {URL_Services, updCalification} from "../../Const";
import {default as axios} from "axios";

export const UpdCalification = async (calification) => {
    console.log(calification)
    const url = URL_Services() + updCalification
    const axios = require('axios').default
    console.log(url)

    try {
        const {data} = await axios.put(
            url,
            calification
        );

        console.log(data)

        return data

    } catch (e) {
        console.error(e)
        return false
    }

}
