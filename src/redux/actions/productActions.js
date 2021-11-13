import * as actionTypes from '../Shopping/productConstant'
import axios from 'axios'
import * as urls from "../../Const";
import {getPromos} from "../../components/Services/getPromos";
import {productsByRestaurant} from "../../Const";

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

        const { data } = await axios.get(urls.URL_Services() + urls.menuListar);

        let cuerpo = data.cuerpo

        const promos = await getPromos()

        if (promos !== null && promos !== undefined && promos !== false){
            promos.forEach(promo => {
                cuerpo = [promo,
                    ...cuerpo,
                ]
            })
        }

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
        const {data} = await axios.get(urls.URL_Services() + urls.menuListar)

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

export const getProductsByRestaurant = (idRestaurant) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

        const { data } = await axios.get(urls.URL_Services() + urls.productsByRestaurant + idRestaurant);

        let cuerpo = data.cuerpo

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
