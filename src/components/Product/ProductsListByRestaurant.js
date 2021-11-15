import React, {useEffect, useState} from 'react'
import Product from "./Product";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {CoffeeLoading} from 'react-loadingg';

//actions
import {getProductsByRestaurant as listProducts} from '../../redux/actions/productActions'
import {useParams} from "react-router-dom";
import {getRestaurantById} from "../Services/getRestaurantById";
import Restaurant from "../Restaurant/Restaurant";

const ProductsListByRestaurant = () => {
    const [restaurant, setRestaurant] = useState({})

    let idRestaurant = useParams()

    const dispatch = useDispatch()

    const getProducts = useSelector(state => state.getProducts)

    const {products, loading, error} = getProducts

    useEffect(() => {
        dispatch(listProducts(idRestaurant.id))
        getRestaurantById(idRestaurant.id).then((val) => {
            setRestaurant(val)
        })
    }, [dispatch])

    return (
        <>
            <Container fluid>
                <div className="d-flex flex-wrap justify-content-evenly" style={{gap: '20px'}}>
                    {loading
                        ? <CoffeeLoading/>
                        : error
                            ? <h2>{error}</h2>
                            : products && products.map((product) => {
                            return (
                                //CONSUMIR SERVICIO DE OBTENER RESTAURANTE Y CARGAR EL COMPONENTE "RESTAURANT" CON ESOS DATOS
                                <>
                                    {/*<Restaurant restaurant={restaurant}/>*/}
                                    <Product
                                        key={product.id} //ANALIZAR SI VAN A HABER MÁS DE UN PRODUCTO CON EL MISMO ID
                                        product={product}
                                    />
                                </>
                            );
                        })}
                </div>
            </Container>
        </>
    )
}

export default ProductsListByRestaurant;
