import {URL_Services, promoListar} from "../../Const";
import {default as axios} from "axios";
import * as urls from "../../Const";

export const getPromos = async () => {

    const url = URL_Services() + promoListar
    const axios = require('axios').default

    const { data } = await axios.get(url);

    const cuerpo = data.cuerpo

    let promo = []

    if(data !== null && data !== undefined && data !== false) {

        cuerpo.forEach(item => {
            promo = [...promo,
                {
                    "id": item.id,
                    "id_restaurante": item.id_restaurante,
                    "nom_restaurante": item.restaurante.nombre,
                    "descuento": item.descuento,
                    "nombre": item.nombre,
                    "descripcion": item.descripcion,
                    "precioSimple": (100 * item.precio)/(100-item.descuento),
                    "precioTotal": item.precio,
                    "extras": [ ],
                    "productos": [ ],
                    "id_imagen": item.id_imagen,
                    "imagen": {
                        "id": item.imagen.id,
                        "identificador": item.imagen.identificador,
                        "imagen": item.imagen.imagen
                    },
                    "tipo": "PROMO",
                    "cal_restaurante": 0
                },
            ]
        })
    }

    return promo

}
