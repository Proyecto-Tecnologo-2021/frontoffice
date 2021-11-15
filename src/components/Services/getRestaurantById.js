import {URL_Services, listarRestaurantesPorId} from "../../Const";
import {default as axios} from "axios";

export const getRestaurantById = async (idRestaurante) => {
    const url = URL_Services() + listarRestaurantesPorId + idRestaurante
    const axios = require('axios').default

    const { data } = await axios.get(url);

    return data.cuerpo
}
