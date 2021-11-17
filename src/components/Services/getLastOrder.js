import {Pedido_Last, URL_Services} from "../../Const";
import {default as axios} from "axios";

export const getLastOrder = async (id) => {
    const url = URL_Services() + Pedido_Last + id
    const axios = require('axios').default

    const sendMessageRequest = async () => {
        try {
            const response = await axios.get(
                url,
            )
            return response.data
        } catch (err) {
            console.error(err)
            return null
        }
    }
    const finalResponse = await sendMessageRequest()
    if (finalResponse !== null) {
        return finalResponse.cuerpo
    } else {
        return false
    }
}
