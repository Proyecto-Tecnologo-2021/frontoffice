import React from 'react'
import {newCalification, URL_Services} from "../../Const";
import {default as axios} from "axios";

export const NewCalification = async (calification) => {
    console.log(calification)
    const url = URL_Services() + newCalification
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
