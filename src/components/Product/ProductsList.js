import React, {useEffect} from 'react'
import Product from "./Product";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {CoffeeLoading} from 'react-loadingg';

//actions
import {getProducts as listProducts} from '../../redux/actions/productActions'

const ProductsList = () => {

    const dispatch = useDispatch()

    const getProducts = useSelector(state => state.getProducts)

    // console.log(getProducts)

    const {products, loading, error} = getProducts

    useEffect(() => {
        dispatch(listProducts())
        // console.log(products)
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

// const mapStateToProps = state =>{
//     return{
//         products: state.shop.products,
//     }
// }
//
// export default connect(mapStateToProps)(ProductsList);

export default ProductsList;
