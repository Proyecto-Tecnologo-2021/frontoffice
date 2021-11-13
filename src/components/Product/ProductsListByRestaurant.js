import React, {useEffect} from 'react'
import Product from "./Product";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {CoffeeLoading} from 'react-loadingg';

//actions
import {getProductsByRestaurant as listProducts} from '../../redux/actions/productActions'
import {useParams} from "react-router-dom";

const ProductsListByRestaurant = () => {

    let idRestaurant = useParams()

    const dispatch = useDispatch()

    const getProducts = useSelector(state => state.getProducts)

    const {products, loading, error} = getProducts

    useEffect(() => {
        dispatch(listProducts(idRestaurant.id))
    }, [dispatch])

    return (
        <>
            <Container fluid>
                <div className="d-flex flex-wrap justify-content-evenly" style={{gap: '20px'}}>
                    {loading
                        ? <CoffeeLoading />
                        : error
                            ? <h2>{error}</h2>
                            : products && products.map((product) => {
                            return (
                                <Product
                                    key={product.id} //ANALIZAR SI VAN A HABER MÁS DE UN PRODUCTO CON EL MISMO ID
                                    product={product}
                                />
                            );
                        })}
                </div>
            </Container>
        </>
    )
}

export default ProductsListByRestaurant;
