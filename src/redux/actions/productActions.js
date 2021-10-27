import * as actionTypes from '../Shopping/productConstant'
import axios from 'axios'
import * as urls from "../../Const";

// export const getProducts = () => async (dispatch) => {
//
//     // return async function (dispatch) {
//         try {
//             console.log("PA1")
//             dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
//             console.log(urls.URL_Services + urls.menuListar)
//             const {data} = await axios.get(urls.URL_Services + urls.menuListar)
//             console.log(data.cuerpo)
//
//             dispatch({
//                 type: actionTypes.GET_PRODUCTS_SUCCESS,
//                 payload: data.cuerpo
//             })
//
//         } catch (error) {
//             dispatch({
//                 type: actionTypes.GET_PRODUCTS_FAIL,
//                 payload: error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//             })
//         }
//     // }
//
// };
export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

        const { data } = await axios.get(urls.URL_Services + urls.menuListar);

        const cuerpo = data.cuerpo

        dispatch({
            type: actionTypes.GET_PRODUCTS_SUCCESS,
            payload: cuerpo,
        });

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(urls.URL_Services + urls.menuListar)

        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS_RESET
    })
};
