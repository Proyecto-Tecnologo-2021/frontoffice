import React, {useEffect, useState} from 'react'
import Product from "./Product";
import {Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {CoffeeLoading} from 'react-loadingg';

//actions
import {getProductsByRestaurant as listProducts} from '../../redux/actions/productActions'
import {useParams} from "react-router-dom";
import {getRestaurantById} from "../Services/getRestaurantById";
import Restaurant from "../Restaurant/Restaurant";
import {sortDesc} from "../Services/Sorts";

const ProductsListByRestaurant = () => {
    const [restaurant, setRestaurant] = useState(undefined)
    const [loadingRestaurant, setLoadingRestaurant] = useState(true)

    let idRestaurant = useParams()

    const dispatch = useDispatch()

    const getProducts = useSelector(state => state.getProducts)

    let {products, loading, error} = getProducts

    products = sortDesc(products, "descuento")

    useEffect(() => {
        dispatch(listProducts(idRestaurant.id))
        getRestaurantById(idRestaurant.id).then((val) => {
            // const a = val
            // a.sort((a, b) => (a.tipo > b.tipo) ? 1 : -1)
            // console.log(val)
            setRestaurant(val)
            setLoadingRestaurant(false)
        })

    }, [dispatch])



    return (
        <>
            <Container fluid>
                {/*<div className="d-flex flex-wrap justify-content-evenly" style={{gap: '20px'}}>*/}
                <>
                    {loading
                        ? <CoffeeLoading/>
                        : error
                            ? <h2>{error}</h2>
                            :
                            <>
                                <div className="pb-4 ms-4">
                                    {loadingRestaurant && restaurant === undefined ? <></> :
                                        <Restaurant restaurant={restaurant} showMenu={false}/>}
                                </div>
                                <div className="d-flex flex-wrap justify-content-evenly" style={{gap: '10px'}}>
                                    {products && products.map((product) => {
                                        return (
                                            <Product
                                                key={product.id} //ANALIZAR SI VAN A HABER MÁS DE UN PRODUCTO CON EL MISMO ID
                                                product={product}
                                            />
                                        );
                                    })}
                                </div>
                            </>
                    }
                </>
            </Container>
        </>
    )
}

export default ProductsListByRestaurant;
