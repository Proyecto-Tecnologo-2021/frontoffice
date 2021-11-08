import {Direccion_Listar, URL_Services} from "../../Const";

export const getUserAddresses = async (idUsuario) => {
    const url = URL_Services() + Direccion_Listar + idUsuario
    const axios = require('axios').default

    const sendMessageRequest = async () => {
        try {
            const response = await axios.get(
                url,
            )
            return response.data.cuerpo
        } catch (err) {
            // Handle Error Here
            console.error(err)
            return false
        }
    }

    const finalResponse = await sendMessageRequest()

    return finalResponse
}
